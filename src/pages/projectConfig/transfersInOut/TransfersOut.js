import SaveButton from "../../../ui/buttons/saveButton/SaveButton";
import useScheduleProjectForm from "../useScheduleProjectForm";
import styles from "../configStyles.module.css";
import SelectTransfers from "../../../components/selectTransfers/SelectTransfers";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const TransfersOut = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    transferOptions,
    showSubMenu,
    handleTransferSubmit,
    alertStatus,
  } = useScheduleProjectForm();
  return (
    <div>
      {alertStatus === "schedule-added" && (
        <Alert
          severity='success'
          onClose={() => {
            navigate("/");
          }}
        >
          Your schedule has been added to the project!
        </Alert>
      )}
      <div className={styles.config__container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.save__button}>
            <SaveButton text={"Add Transfers Out"} type='submit' />
          </div>
        </form>
        {showSubMenu && (
          <>
            <SelectTransfers
              transferOptions={transferOptions}
              handleTransferSubmit={handleTransferSubmit}
              eventOfTheDay='transfers-out'
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TransfersOut;
