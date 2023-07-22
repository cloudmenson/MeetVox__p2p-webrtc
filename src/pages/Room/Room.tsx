import { useEffect } from "react";
import { useParams } from "react-router";

import { LOCAL_VIDEO, useWebRTC } from "src/hooks/useWebRTC";

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
    <div>
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
    </div>
  );
};

export { Room };
