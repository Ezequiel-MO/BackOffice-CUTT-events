import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import useScheduleProjectForm from "../useScheduleProjectForm";
import styles from "../configStyles.module.css";
import SelectTransfers from "../../../components/selectTransfers/SelectTransfers";

export const TransfersIn = () => {
  const { handleSubmit, transferOptions, showSubMenu, handleTransferSubmit } =
    useScheduleProjectForm();
  return (
    <div>
      <div className={styles.config__container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.save__button}>
            <SaveButton text={"Add Transfers In "} type='submit' />
          </div>
        </form>
        {showSubMenu && (
          <>
            <SelectTransfers
              transferOptions={transferOptions}
              handleTransferSubmit={handleTransferSubmit}
              eventOfTheDay='transfers-in'
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TransfersIn;
