import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import { socket } from "src/socket";
import { ACTIONS } from "src/socket/actions";

const HomePage = () => {
  const rootNode = useRef();
  const navigate = useNavigate();
  const [rooms, updateRooms] = useState([]);

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  return (
    <div>
      <h1>Rooms</h1>

      <ul>
        {rooms.map((roomID) => (
          <li key={roomID}>
            {roomID}
            <button
              onClick={() => {
                navigate(`/room/${roomID}`);
              }}
            >
              Join room
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          navigate(`/room/${v4()}`);
        }}
      >
        Create new room
      </button>
    </div>
  );
};

export { HomePage };
