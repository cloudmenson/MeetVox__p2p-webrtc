import { useEffect } from "react";
import { useParams } from "react-router";

import { LOCAL_VIDEO, useWebRTC } from "src/hooks/useWebRTC";

import * as Styles from "./styles";

const Room = () => {
  const { id: roomID } = useParams();
  const validRoomID = roomID || "";
  const { clients, provideMediaRef } = useWebRTC(validRoomID);

  useEffect(() => {
    if (!roomID) {
      return;
    }

    console.log([...new Set(clients)]);
  }, [roomID, clients]);

  if (!roomID) {
    return <div>Loading...</div>;
  }

  return (
    <Styles.Container>
      {[...clients].map((clientID, index) => {
        return (
          <div key={`${clientID}-${index}`}>
            <video
              autoPlay
              playsInline
              muted={clientID === LOCAL_VIDEO}
              ref={(instance) => {
                provideMediaRef(clientID, instance);
              }}
            ></video>
          </div>
        );
      })}
    </Styles.Container>
  );
};

export { Room };
