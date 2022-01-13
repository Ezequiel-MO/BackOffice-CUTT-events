import { Icon } from "@iconify/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useProjectSelector from "./useProjectSelector";
import styles from "./selectStyles.module.css";

const ProjectSelector = ({
  icon,
  name,
  placeholder,
  options,
  storeSelectedValues,
  value,
}) => {
  const { valueLabels } = useProjectSelector(options);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #ea5933",
      width: 700,
      paddingLeft: 40,
      borderRadius: "10px",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #ea5933",
      },
    }),
    menu: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: "0",
      boxShadow: "none",
    }),
    menuList: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: "0",
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f5f5f5" : "#f5f5f5",
      color: state.isSelected ? "#000" : "#000",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        color: "#000",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
  };

  return (
    <div className={styles.select__container}>
      <label>
        <Icon icon={icon} width='28' color='#ea5933' />
      </label>
      <Select
        styles={customStyles}
        components={makeAnimated()}
        name={name}
        value={value}
        options={valueLabels}
        noOptionsMessage={() => "No options left to select :("}
        placeholder={placeholder}
        isSearchable
        isClearable
        isMulti
        onChange={storeSelectedValues}
      />
    </div>
  );
};

export default ProjectSelector;
