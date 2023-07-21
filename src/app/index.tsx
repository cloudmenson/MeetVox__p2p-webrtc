import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeWrap } from "src/context";
import { HomePage, NotFound404, Room } from "src/pages";
import { GlobalStyles } from "src/styles/globalStyles";

const App = () => {
  return (
    <ThemeWrap>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="*" element={<NotFound404 />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </Router>
    </ThemeWrap>
  );
};

export { App };
