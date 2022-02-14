import useScheduleProjectForm from "../useScheduleProjectForm";
import styles from "../configStyles.module.css";
import ProjectSelector from "../../../ui/Select/ProjectSelector";
import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import SelectTransfers from "../../../components/selectTransfers/SelectTransfers";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Dinners = () => {
  const navigate = useNavigate();
  const {
    alertStatus,
    handleSubmit,
    restaurantOptionsByCity,
    transferOptions,
    storeSelectedValues,
    showSubMenu,
    handleTransferSubmit,
  } = useScheduleProjectForm();
  return (
    <div>
      {alertStatus === "today-events" && (
        <Alert
          severity='info'
          onClose={() => {
            navigate("/morning-events");
          }}
        >
          You have added all the events for today. Proceed to the next day.
        </Alert>
      )}
      <div className={styles.config__container}>
        <form onSubmit={handleSubmit}>
          <ProjectSelector
            name='dinner'
            icon='cil:dinner'
            options={restaurantOptionsByCity}
            placeholder='ex : Dinner Options'
            storeSelectedValues={storeSelectedValues}
          />
          <div className={styles.save__button}>
            <SaveButton text={"Add Dinner to project"} type='submit' />
          </div>
        </form>
        {showSubMenu && (
          <SelectTransfers
            transferOptions={transferOptions}
            handleTransferSubmit={handleTransferSubmit}
            eventOfTheDay='dinner'
          />
        )}
      </div>
    </div>
  );
};

export default Dinners;
