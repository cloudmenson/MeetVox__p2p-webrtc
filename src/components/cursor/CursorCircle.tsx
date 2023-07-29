import { useState, useEffect } from "react";

import * as Styles from "./styles";

const CursorCircle: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const handleMouseMove = (e: any) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Styles.CustomCursor style={{ left: cursorPos.x, top: cursorPos.y }} />
    </>
  );
};

export { CursorCircle };
