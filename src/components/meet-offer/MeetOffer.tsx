import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import { socket } from "src/socket";
import { ACTIONS } from "src/socket/actions";
import { Button, ParticlesBackground } from "src/components";

import * as Styles from "./styles";
// import * as Image from "src/assets";

const MeetOffer = () => {
  const navigate = useNavigate();
  const [rooms, updateRooms] = useState<string[]>([]);
  const rootNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] }: { rooms: string[] }) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });

    return () => {
      socket.off(ACTIONS.SHARE_ROOMS);
    };
  }, []);

  return (
    <Styles.Container ref={rootNode}>
      <Styles.AboutMeetVox>
        <Styles.Title>
          New video meeting product. Now available to everyone
        </Styles.Title>

        <Styles.Content>
          This product was originally created as a secure service video
          conferencing for business. Now we have made it free and inclusive.
        </Styles.Content>
      </Styles.AboutMeetVox>

      <Styles.CreateRoom>
        <Styles.RoomsTitle>Rooms</Styles.RoomsTitle>

        <Styles.RoomsList>
          {rooms.map((roomID) => (
            <Styles.Room key={roomID}>
              <Styles.RoomId>{roomID}</Styles.RoomId>

              <Button
                text="Join"
                // rightIcon={Image.Calendar}
                onClick={() => {
                  navigate(`/room/${roomID}`);
                }}
              />
            </Styles.Room>
          ))}
        </Styles.RoomsList>

        <Button
          // rightIcon={<Image.Calendar />}
          text="Create new room"
          onClick={() => {
            navigate(`/room/${v4()}`);
          }}
        />
      </Styles.CreateRoom>

      <Styles.ParticlesPosition>
        <ParticlesBackground />
      </Styles.ParticlesPosition>
    </Styles.Container>
  );
};

export { MeetOffer };
