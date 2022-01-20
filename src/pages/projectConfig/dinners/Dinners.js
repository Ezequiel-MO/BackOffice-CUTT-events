import useScheduleProjectForm from "../useScheduleProjectForm";
import styles from "../configStyles.module.css";
import ProjectSelector from "../../../ui/Select/ProjectSelector";
import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import SelectTransfers from "../../../components/selectTransfers/SelectTransfers";

export const Dinners = () => {
  const {
    handleSubmit,
    restaurantOptions,
    transferOptions,
    storeSelectedValues,
    showSubMenu,
    handleTransferSubmit,
  } = useScheduleProjectForm();
  return (
    <div>
      <div className={styles.config__container}>
        <form onSubmit={handleSubmit}>
          <ProjectSelector
            name='dinner'
            icon='cil:dinner'
            options={restaurantOptions}
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
