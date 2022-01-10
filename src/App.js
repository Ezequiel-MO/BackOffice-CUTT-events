import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./helper/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
