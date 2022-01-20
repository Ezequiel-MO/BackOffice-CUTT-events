import accounting from "accounting";

const ListOfServices = ({
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
    <div>
      {services?.map((service) => (
        <div key={service.id}>
          <fieldset>
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
              type='submit'
              disabled={status === "submitting" || service.saved === true}
            >
              Save on DB
            </button>
          </fieldset>
        </div>
      ))}
    </div>
  );
};

export default ListOfServices;
