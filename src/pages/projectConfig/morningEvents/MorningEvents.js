import ProjectSelector from "../../../ui/Select/ProjectSelector";
import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import useScheduleProjectForm from "../useScheduleProjectForm";
import styles from "../configStyles.module.css";
import SelectTransfers from "../../../components/selectTransfers/SelectTransfers";

export const MorningEvents = () => {
  const {
    handleSubmit,
    projectByCode,
    eventOptions,
    transferOptions,
    storeSelectedValues,
    transferVendorsInACity,
    showSubMenu,
    handleTransferSubmit,
  } = useScheduleProjectForm();
  return (
    <div>
      {projectByCode && <p>Date: {projectByCode.arrivalDay}</p>}
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
            city={projectByCode.groupLocation}
            companies={transferVendorsInACity}
            transferOptions={transferOptions}
            handleTransferSubmit={handleTransferSubmit}
            eventOfTheDay='morning-event'
          />
        )}
      </div>
    </div>
  );
};

export default MorningEvents;
