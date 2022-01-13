import { Icon } from "@iconify/react";
import styles from "./DashboardButtonStyles.module.css";
import { useNavigate } from "react-router-dom";

const DashboardButton = ({ icon, title, setStatus, slug, cat }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (cat === "dashboard-main") {
      if (title === "Create/Maintain Vendor") {
        setStatus((prevState) => ({
          ...prevState,
          createVendor: !prevState.createVendor,
          seeListOfProjects: false,
        }));
      } else if (title === "See List of Projects") {
        setStatus((prevState) => ({
          ...prevState,
          seeListOfProjects: !prevState.seeListOfProjects,
          createVendor: false,
        }));
      }
    } else if (cat === "dashboard-vendor") {
      if (slug) {
        navigate(slug);
      }
    }
  };
  return (
    <button onClick={handleClick} className={styles.dashboard__button}>
      <Icon icon={icon} width='40' />
      {title}
    </button>
  );
};

export default DashboardButton;
