import { useRef, useEffect, useCallback } from "react";
import freeice from "freeice";

import { socket } from "src/socket";
import { ACTIONS } from "src/socket/actions";

import { useStateWithCallback } from "./useStateWithCallback";

export const LOCAL_VIDEO = "LOCAL_VIDEO";

export function useWebRTC(roomID: string) {
  const localMediaStream = useRef<MediaStream | null>(null);
  const [clients, updateClients] = useStateWithCallback<string[]>([]);
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const peerMediaElements = useRef<Record<string, HTMLVideoElement | null>>({
    [LOCAL_VIDEO]: null,
  });

  const addNewClient = useCallback(
    (newClient: string, callback?: (list: string[]) => void) => {
      if (!clients.includes(newClient)) {
        updateClients((list) => [...list, newClient], callback);
      }
    },
    [clients, updateClients]
  );

  useEffect(() => {
    async function handleNewPeer({
      peerID,
      createOffer,
    }: {
      peerID: string;
      createOffer: boolean;
    }) {
      if (peerID in peerConnections.current) {
        return console.warn(`Already connected to ${peerID}`);
      }

      peerConnections.current[peerID] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      peerConnections.current[peerID].onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit(ACTIONS.RELAY_ICE, {
            peerID,
            iceCandidate: e.candidate,
          });
        }
      };

      let tracksNumber = 0;

      peerConnections.current[peerID].ontrack = ({
        streams: [remoteStream],
      }) => {
        tracksNumber++;

        if (tracksNumber === 2) {
          addNewClient(peerID, () => {
            const mediaElement = peerMediaElements.current[peerID];
            if (mediaElement && mediaElement.srcObject !== remoteStream) {
              mediaElement.srcObject = remoteStream;
            }
          });
        }
      };

      if (localMediaStream.current) {
        const mediaTracks = localMediaStream.current.getTracks();
        for (const track of mediaTracks) {
          peerConnections.current[peerID].addTrack(
            track,
            localMediaStream.current
          );
        }
      }

      if (createOffer) {
        const offer = await peerConnections.current[peerID].createOffer();
        await peerConnections.current[peerID].setLocalDescription(offer);
        socket.emit(ACTIONS.RELAY_SDP, { peerID, sessionDescription: offer });
      }
    }

    socket.on(ACTIONS.ADD_PEER, handleNewPeer);
  }, []);

  useEffect(() => {
    async function setRemoteMedia({
      peerID,
      sessionDescription: remoteDescription,
    }: {
      peerID: string;
      sessionDescription: RTCSessionDescriptionInit;
    }) {
      await peerConnections.current[peerID].setRemoteDescription(
        new RTCSessionDescription(remoteDescription)
      );

      if (remoteDescription.type === "offer") {
        const answer = await peerConnections.current[peerID].createAnswer();

        await peerConnections.current[peerID].setLocalDescription(answer);

        socket.emit(ACTIONS.RELAY_SDP, { peerID, sessionDescription: answer });
      }
    }

    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
  }, []);

  useEffect(() => {
    socket.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }) => {
      peerConnections.current[peerID].addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      );
    });
  }, []);

  useEffect(() => {
    const handleRemovePeer = ({ peerID }: { peerID: string }) => {
      if (peerConnections.current[peerID]) {
        peerConnections.current[peerID].close();
      }

      delete (peerConnections.current as Record<string, RTCPeerConnection>)[
        peerID
      ];
      delete (
        peerMediaElements.current as Record<string, HTMLVideoElement | null>
      )[peerID];

      updateClients((list) => list.filter((client) => client !== peerID));
    };

    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
  }, []);

  useEffect(() => {
    async function startCapture() {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: 1280,
            height: 720,
          },
        });

        if (localMediaStream.current) {
          addNewClient(LOCAL_VIDEO, () => {
            const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

            if (localVideoElement) {
              localVideoElement.volume = 0;
              localVideoElement.srcObject = localMediaStream.current;
            }
          });
        }
      } catch (error) {
        console.error("Error getting userMedia", error);
      }
    }

    startCapture()
      .then(() => socket.emit(ACTIONS.JOIN, { room: roomID }))
      .catch((e) => console.error("Error getting userMedia", e));

    return () => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach((track) => track.stop());
      }
      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomID]);

  const provideMediaRef = useCallback(
    (id: string, node: HTMLVideoElement | null) => {
      if (!peerMediaElements.current[id]) {
        peerMediaElements.current[id] = node;
      }
    },
    []
  );

  return {
    clients,
    provideMediaRef,
  };
}
