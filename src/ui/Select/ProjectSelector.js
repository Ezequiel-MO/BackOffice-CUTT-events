import { Icon } from "@iconify/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useProjectSelector from "./useProjectSelector";

const ProjectSelector = ({
  icon,
  name,
  placeholder,
  options,
  storeSelectedValues,
  value,
}) => {
  const { valueLabels } = useProjectSelector(options);
  return (
    <div>
      <label>
        <Icon icon={icon} width='28' color='#ea5933' />
      </label>
      <Select
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
