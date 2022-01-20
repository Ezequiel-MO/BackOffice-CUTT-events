import ProjectSelector from "../../../ui/Select/ProjectSelector";
import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import useScheduleProjectForm from "../useScheduleProjectForm";
import styles from "../configStyles.module.css";
import SelectTransfers from "../../../components/selectTransfers/SelectTransfers";

export const MorningEvents = () => {
  const {
    handleSubmit,
    eventOptions,
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
            name='morning-event'
            icon='vaadin:morning'
            options={eventOptions}
            placeholder='ex : Event Options'
            storeSelectedValues={storeSelectedValues}
          />
          <div className={styles.save__button}>
            <SaveButton text={"Add Morning Event to project"} type='submit' />
          </div>
        </form>
        {showSubMenu && (
          <SelectTransfers
            transferOptions={transferOptions}
            handleTransferSubmit={handleTransferSubmit}
            eventOfTheDay='morningEvents'
          />
        )}
      </div>
    </div>
  );
};

export default MorningEvents;
