import SelectTransfers from "../../../components/selectTransfers/SelectTransfers";
import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import ProjectSelector from "../../../ui/Select/ProjectSelector";
import styles from "../configStyles.module.css";
import useScheduleProjectForm from "../useScheduleProjectForm";

export const AfternoonEvents = () => {
  const {
    handleSubmit,
    eventOptions,
    storeSelectedValues,
    handleTransferSubmit,
    transferOptions,
    showSubMenu,
  } = useScheduleProjectForm();
  return (
    <div>
      <div className={styles.config__container}>
        <form onSubmit={handleSubmit}>
          <ProjectSelector
            name='afternoon-event'
            icon='ph:clock-afternoon-duotone'
            options={eventOptions}
            placeholder='ex : Afternoon Event Options'
            storeSelectedValues={storeSelectedValues}
          />
          <div className={styles.save__button}>
            <SaveButton text={"Add Afternoon Event to project"} type='submit' />
          </div>
        </form>
        {showSubMenu && (
          <SelectTransfers
            transferOptions={transferOptions}
            handleTransferSubmit={handleTransferSubmit}
            eventOfTheDay='afternoonEvents'
          />
        )}
      </div>
    </div>
  );
};

export default AfternoonEvents;
