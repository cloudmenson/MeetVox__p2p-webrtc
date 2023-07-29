import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeWrap } from "src/context";
import { CursorCircle } from "src/components";
import { GlobalStyles } from "src/styles/globalStyles";
import { HomePage, NotFound404, Room } from "src/pages";

const App = () => {
  return (
    <ThemeWrap>
      <GlobalStyles />
      <CursorCircle />
      <Router>
        <Routes>
          <Route path="/room/:id" element={<Room />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </ThemeWrap>
  );
};

export { App };
