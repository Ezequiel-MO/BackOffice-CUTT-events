import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./helper/routes";
import { ThemeProvider } from "@mui/material";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./components/header/Header";
import { theme } from "./themes/MuiTheme";
/* import { baseAPI } from "./helper/axios";
import { useEffect } from "react";
import axios from "axios"; */

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

  /*   useEffect(() => {
    baseAPI
      .patch(
        "/restaurants/618b830322ef8723f012c40c",
        {
          city: "San Francisco",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => console.log(res));
  }, []); */

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
