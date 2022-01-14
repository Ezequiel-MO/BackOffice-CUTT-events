import { useState } from "react";

const AddService = ({
  onAddService,
  status,
  setStatus,
  setSubmitReady,
  companyValues,
  setCompanyValues,
}) => {
  console.log("status", status);
  const [value, setValue] = useState(0);
  const handleClick = () => {
    onAddService(value);
    setCompanyValues({
      ...companyValues,
      vehicleCapacity: value,
    });
    setValue(0);
    setSubmitReady(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setStatus("add-service");
  };

  return (
    <fieldset>
      <legend>Vehicle Capacity:</legend>
      <select
        type='number'
        name='vehicleCapacity'
        placeholder='ie 30,50,70 pax'
        value={value}
        onChange={handleChange}
      >
        <option value='0'>Select</option>
        <option value='2'>Berlina Car</option>
        <option value='3'>Mercedes Car</option>
        <option value='5'>MiniVan</option>
        <option value='20'>Minibus</option>
        <option value='30'>30 pax</option>
        <option value='50'>50 pax</option>
        <option value='70'>70 pax</option>
      </select>

      <button
        type='button'
        onClick={handleClick}
        disabled={status === "typing"}
      >
        Add Services
      </button>
    </fieldset>
  );
};

export default AddService;
