import logo from "../../assets/logo-dark.svg";
import { Icon } from "@iconify/react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ProjectSpecs } from "../../pages/projectConfig";

const Header = () => {
  const [projectStatus, setProjectStatus] = useState("initial");
  const handleOpenModalClick = () => {
    setProjectStatus("creating-project");
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
            disabled={projectStatus === "creating-project"}
          >
            {projectStatus === "initial"
              ? "Create Project"
              : "Creating project"}
          </button>
        </div>
        <div className={styles.header__right}>
          <Link to='/login'>
            <Icon icon='whh:avatar' color='#ea5933' width='48' />
          </Link>
        </div>
      </div>
      {projectStatus === "creating-project" && <ProjectSpecs />}
    </>
  );
};

export default Header;
