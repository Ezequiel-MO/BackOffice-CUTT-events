import logo from "../../assets/logo-dark.svg";
import { Icon } from "@iconify/react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProjectStatus,
  SET_PROJECT_STATUS,
} from "../../features/ProjectStatusSlice";
import ListOfProjects from "../listOfProjects/ListOfProjects";
import { Avatar, Button } from "@mui/material";
import { LOGOUT, selectUserIsLoggedIn } from "../../features/UserLoggedInSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userIsLoggedIn = useSelector(selectUserIsLoggedIn);
  const projectStatus = useSelector(selectProjectStatus);
  const handleOpenModalClick = () => {
    dispatch(SET_PROJECT_STATUS("searching-project"));
  };

  const handleImageClick = () => {
    dispatch(SET_PROJECT_STATUS("initial"));
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <Link to="/">
            <img src={logo} alt="logo" onClick={handleImageClick} />
          </Link>

          {userIsLoggedIn ? (
            <button
              className={styles.header__button}
              onClick={handleOpenModalClick}
              disabled={
                projectStatus === "searching-project" ||
                projectStatus === "creating-project"
              }
            >
              {projectStatus === "initial"
                ? "Create Project"
                : projectStatus === "searching-project"
                ? "Searching Project"
                : projectStatus === "creating-project"
                ? "Creating Project"
                : `${projectStatus}`}
            </button>
          ) : null}
        </div>
        <div className={styles.header__right}>
          {userIsLoggedIn ? (
            <Button
              onClick={() => dispatch(LOGOUT())}
              variant="outlined"
              color="primary"
            >
              Log Out
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outlined" color="primary">
                Log In
              </Button>
            </Link>
          )}
          {userIsLoggedIn ? (
            <Avatar
              src={`/img/users/${userIsLoggedIn.photo}`}
              alt={`photo of ${userIsLoggedIn.name}`}
            />
          ) : (
            <Icon icon="whh:avatar" color="#ea5933" width="48" />
          )}
        </div>
      </div>
      {projectStatus === "searching-project" && <ListOfProjects />}
    </>
  );
};

export default Header;
