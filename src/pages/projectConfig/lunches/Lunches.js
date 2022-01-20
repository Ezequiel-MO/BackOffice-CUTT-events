import SelectTransfers from "../../../components/selectTransfers/SelectTransfers";
import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import ProjectSelector from "../../../ui/Select/ProjectSelector";
import styles from "../configStyles.module.css";
import useScheduleProjectForm from "../useScheduleProjectForm";
import { useLocation } from "react-router-dom";

export const Lunches = () => {
  const { state } = useLocation();
  console.log("Lunches", state);
  const {
    restaurantOptions,
    storeSelectedValues,
    showSubMenu,
    handleSubmit,
    transferOptions,
    handleTransferSubmit,
  } = useScheduleProjectForm();
  return (
    <div className={styles.config__container}>
      <form onSubmit={handleSubmit}>
        <ProjectSelector
          name='lunch'
          icon='carbon:restaurant'
          options={restaurantOptions}
          placeholder='ex : Lunch Options'
          storeSelectedValues={storeSelectedValues}
        />
        <div className={styles.save__button}>
          <SaveButton text={"Add Lunch to project"} type='submit' />
        </div>
      </form>
      {showSubMenu && (
        <SelectTransfers
          transferOptions={transferOptions}
          handleTransferSubmit={handleTransferSubmit}
          eventOfTheDay='lunch'
        />
      )}
    </div>
  );
};

export default Lunches;
