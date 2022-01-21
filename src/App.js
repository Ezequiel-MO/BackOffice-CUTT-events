import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./helper/routes";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./components/header/Header";
/* import { baseAPI } from "./helper/axios";
import { useEffect } from "react"; */

function App() {
  /* clean /projects API */
  /* useEffect(() => {
    baseAPI
      .get("/projects")
      .then((res) =>
        res.data.projects.map((project) =>
          baseAPI.delete(`/project/${project._id}`)
        )
      );
  }, []); */

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path='/' exact element={<Dashboard />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
