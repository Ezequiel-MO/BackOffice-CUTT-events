import accounting from "accounting";

const ListOfServices = ({
  className,
  services,
  companyValues,
  setCompanyValues,
  status,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyValues({ ...companyValues, [name]: value });
  };
  return (
    <div className={className}>
      {services?.map((service) => (
        <fieldset key={service.id}>
          <legend>
            {service.saved === false
              ? `Vehicles of ${service.vehicleCapacity} pax capacity`
              : `Records saved to the DB for vehicles of ${service.vehicleCapacity} pax capacity`}
          </legend>
          {
            <div>
              {service.ids.map((item) => {
                return service.saved === false ? (
                  <div key={item.name}>
                    <label htmlFor={item.name}>{item.label}:</label>
                    <input
                      type='number'
                      name={item.name}
                      onChange={handleChange}
                      value={companyValues[`${item.name}`]}
                    />
                  </div>
                ) : (
                  <p>
                    {item.label}{" "}
                    <span>
                      {accounting.formatMoney(
                        companyValues[`${item.name}`],
                        "€"
                      )}
                    </span>
                  </p>
                );
              })}
            </div>
          }
          <button
            className='add_button'
            type='submit'
            disabled={status === "submitting" || service.saved === true}
          >
            Save on DB
          </button>
        </fieldset>
      ))}
    </div>
  );
};

export default ListOfServices;
