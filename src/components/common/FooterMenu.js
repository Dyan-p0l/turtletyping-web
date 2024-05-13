import React from "react";
import { Grid, AppBar } from "@mui/material";
import { Box } from "@mui/system";
import Select from "../utils/Select";


const FooterMenu = ({
  themesOptions,
  theme,
  handleThemeChange,
}) => {
  return (
    <AppBar position="static" color="transparent" className="bottomBar">
      <Grid container justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="row" style={{display: ''}}>
          <Select
            classNamePrefix="Select"
            value={themesOptions.find((e) => e.value.label === theme.label)}
            options={themesOptions}
            isSearchable={false}
            isSelected={false}
            onChange={handleThemeChange}
            menuPlacement="top"
          ></Select>
        </Box>
      </Grid>
    </AppBar>
  );
};

export default FooterMenu;
