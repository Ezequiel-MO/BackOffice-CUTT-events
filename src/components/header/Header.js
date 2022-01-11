import logo from "../../assets/logo-dark.svg";
import { Icon } from "@iconify/react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProjectStatus,
  SET_PROJECT_STATUS,
} from "../../features/ProjectStatusSlice";
import ProjectModal from "../projectModal/ProjectModal";

const Header = () => {
  const dispatch_projectStatus = useDispatch();
  const projectStatus = useSelector(selectProjectStatus);
  const handleOpenModalClick = () => {
    dispatch_projectStatus(SET_PROJECT_STATUS("searching-project"));
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <button
            onClick={handleOpenModalClick}
            disabled={projectStatus === "searching-project"}
          >
            {projectStatus === "initial"
              ? "Create Project"
              : projectStatus === "searching-project"
              ? "Searching Project"
              : "Creating Project"}
          </button>
        </div>
        <div className={styles.header__right}>
          <Link to='/login'>
            <Icon icon='whh:avatar' color='#ea5933' width='48' />
          </Link>
        </div>
      </div>
      {projectStatus === "searching-project" && <ProjectModal />}
    </>
  );
};

export default Header;
