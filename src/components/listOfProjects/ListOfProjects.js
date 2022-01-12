import { Icon } from "@iconify/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_PROJECT_STATUS } from "../../features/ProjectStatusSlice";
import styles from "./listOfProjectsStyles.module.css";
import SortableProjectsTable from "./sortableTable/SortableProjectsTable";

const ListOfProjects = () => {
  const [project, setProject] = useState("");
  let navigate = useNavigate();
  const dispatch_projectStatus = useDispatch();
  const handleCancel = () => {
    dispatch_projectStatus(SET_PROJECT_STATUS("initial"));
  };

  const handleCreateProject = () => {
    dispatch_projectStatus(SET_PROJECT_STATUS("creating-project"));
    navigate("/project-specs");
  };

  const handleChange = (e) => {
    setProject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProject("");
  };

  return (
    <div className={/* styles.list__container */ styles.modal__container}>
      <div className={styles.list__header}>
        <form onSubmit={handleSubmit}>
          <span>
            <Icon
              icon='cil:magnifying-glass'
              color='black'
              width='24'
              inline={true}
            />
          </span>
          <input
            type='text'
            placeholder='Search project by Code, User or Client...'
            value={project}
            onChange={handleChange}
          />
          <button type='submit'>Search</button>
        </form>
        <button onClick={handleCreateProject}>+ New Project</button>
      </div>
      <SortableProjectsTable project={project} />
      <button className={styles.list__cancelButton} onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default ListOfProjects;
