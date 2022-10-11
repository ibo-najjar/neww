import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React from "react";

const RadioInputs = (props) => {
  const { name, label, value, onChange, items, state } = props;

  return (
    <FormControl>
      <RadioGroup row name={name} onChange={onChange} value={value}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#000",
                  },
                }}
              />
            }
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInputs;
