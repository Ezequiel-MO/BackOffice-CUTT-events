import AddService from "./AddService";
import TransferCo from "./TransferCo";
import ListOfServices from "./ListOfServices";
import useTransfersMasterForm from "./useTransfersMasterForm";

export const TransfersMasterForm = () => {
  const {
    handleSubmit,
    companyValues,
    setCompanyValues,
    handleAddService,
    status,
    setStatus,
    setSubmitReady,
    submitReady,
    services,
    handleLeave,
  } = useTransfersMasterForm();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TransferCo
          companyValues={companyValues}
          setCompanyValues={setCompanyValues}
        />
        <AddService
          onAddService={handleAddService}
          status={status}
          setStatus={setStatus}
          companyValues={companyValues}
          setCompanyValues={setCompanyValues}
          setSubmitReady={setSubmitReady}
        />
        <ListOfServices
          services={services}
          companyValues={companyValues}
          setCompanyValues={setCompanyValues}
          status={status}
        />
        <button type='button' disabled={!submitReady} onClick={handleLeave}>
          If you have added all services for this Transfer vendor, click here to
          leave this form
        </button>
      </form>
    </div>
  );
};

export default TransfersMasterForm;
