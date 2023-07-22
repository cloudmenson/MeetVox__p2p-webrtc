import { useRef, useEffect, useCallback } from "react";
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
    async function startCapture() {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: 600,
            height: 400,
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

    startCapture().then(() => socket.emit(ACTIONS.JOIN, { room: roomID }));
  }, [roomID, addNewClient]);

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
