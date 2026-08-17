import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Playground from "./pages/Playground";

export function App() {
  return (<BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
