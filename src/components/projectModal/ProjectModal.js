import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_PROJECT_STATUS } from "../../features/ProjectStatusSlice";

const ProjectModal = () => {
  let navigate = useNavigate();
  const dispatch_projectStatus = useDispatch();
  const handleCancel = () => {
    dispatch_projectStatus(SET_PROJECT_STATUS("initial"));
  };

  const handleCreateProject = () => {
    dispatch_projectStatus(SET_PROJECT_STATUS("creating-project"));
    navigate("/project-specs");
  };

  return (
    <div className='projectModal'>
      <div className='projectModal__header'>
        <h2>Search bar</h2>
        <button onClick={handleCreateProject}>+ New Project</button>
      </div>
      <div className='projectModal__body'>Table</div>
      <div className='projectModal__footer'>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ProjectModal;
