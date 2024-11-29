import React, { useState } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

const CustomTranslate = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  const translatePage = (lang) => {
    document.body.style.marginTop = lang ? "-40px" : "0px";

    const checkExist = setInterval(() => {
      const selectField = document.querySelector(".goog-te-combo");
      if (selectField) {
        selectField.value = lang;
        selectField.dispatchEvent(new Event("change"));
        clearInterval(checkExist);
      }
    }, 100);

    setSelectedLang(lang);
  };

  return (
    <div>
      <FormControl variant="outlined">
        <Select
          value={selectedLang}
          onChange={(e) => translatePage(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Removes the border
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none", // No border on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none", // No border when focused
            },
            "& .MuiSelect-select": {
              padding: "8px", // Adjust padding for custom appearance
            },
          }}
        >
          <MenuItem value="en">
            <img
              src="https://flagcdn.com/w320/us.png"
              alt="English"
              className="w-6 h-6 inline-block"
            />
          </MenuItem>
          <MenuItem value="ar">
            <img
              src="https://flagcdn.com/w320/sa.png"
              alt="Arabic"
              className="w-6 h-6 inline-block"
            />
          </MenuItem>
          <MenuItem value="fr">
            <img
              src="https://flagcdn.com/w320/fr.png"
              alt="French"
              className="w-6 h-6 inline-block"
            />
          </MenuItem>
          <MenuItem value="es">
            <img
              src="https://flagcdn.com/w320/es.png"
              alt="Spanish"
              className="w-6 h-6 inline-block"
            />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomTranslate;
