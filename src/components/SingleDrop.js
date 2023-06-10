import React, { useEffect } from "react";
import { useState } from "react";

const SingleDrop = ({
  fieldName = "",
  initalValue = "",
  placeholder = "",
  isApiPresent = true,
  queryKey = "",
  queryFn = () => {},
  queryFnPayload = {},
  selectedValue = "",
  displayLabel = "",
  rawData = [],
  onChange = () => {},
  formHookField = {},
}) => {
  const [selectedOptionValue, setSelectedOptionValue] = useState(initalValue);
  useEffect(() => {
    if (formHookField) {
      formHookField.onChange(selectedOptionValue);
    }
  }, [formHookField, onChange, selectedOptionValue]);
  return (
    <div className="dropdown-main">
      <select
        name={fieldName || queryKey}
        className="dropdown-menu"
        {...formHookField}
        value={selectedOptionValue}
        onChange={(e) => {
          setSelectedOptionValue(e.target.value);
          onChange(e.target.value);
        }}
      >
        <option value={""}>{placeholder}</option>
        {rawData.length === 0 && <option value={""}>Data not provided</option>}
        {rawData.map((result, index) => {
          const value = result[selectedValue];
          const label = result[displayLabel];
          return (
            <option key={index} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SingleDrop;
