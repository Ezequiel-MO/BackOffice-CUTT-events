import { useState } from "react";
import DashboardButton from "../../ui/buttons/dashboardButton/DashboardButton";
import ListOfProjects from "../../components/listOfProjects/ListOfProjects";
import styles from "./DashboardStyles.module.css";

const Dashboard = () => {
  const [{ createVendor, seeListOfProjects }, setStatus] = useState({
    createVendor: false,
    seeListOfProjects: false,
  });
  const dashboardData = [
    {
      icon: "bx:bx-hotel",
      title: "Hotel DB",
      slug: "/hotels-master-form",
    },
    {
      icon: "bx:bx-bus",
      title: "Transportation DB",
      slug: "/transfers-master-form",
    },
    {
      icon: "carbon:events",
      title: "Events DB",
      slug: "/events-master-form",
    },
    {
      icon: "bx:bx-restaurant",
      title: "Restaurants DB",
      slug: "/restaurants-master-form",
    },
  ];
  return (
    <div className={styles.dashboard__container}>
      <DashboardButton
        icon='akar-icons:key'
        cat='dashboard-main'
        title='Create/Maintain Vendor'
        setStatus={setStatus}
      />
      {createVendor && (
        <div className={styles.dashboard__vendors}>
          {dashboardData.map((item) => (
            <DashboardButton
              key={item.icon}
              cat='dashboard-vendor'
              icon={item.icon}
              title={item.title}
              slug={item.slug}
            />
          ))}
        </div>
      )}
      <DashboardButton
        icon='ph:projector-screen-chart-light'
        cat='dashboard-main'
        title='See List of Projects'
        setStatus={setStatus}
      />
      {seeListOfProjects && <ListOfProjects page />}
    </div>
  );
};

export default Dashboard;
