import { MenuItem, Select } from "@mui/material";
import React from "react";

const SelectInput = (props) => {
  const { name, label, value, onChange, options, ...other } = props;

  return (
    <Select name={name} value={value} onChange={onChange}>
      <MenuItem value="">None</MenuItem>
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectInput;
