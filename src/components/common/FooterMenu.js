import React from "react";
import { Grid, AppBar } from "@mui/material";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Select from "../utils/Select";
import { SOUND_MODE_TOOLTIP } from "../features/sound/sound";

const FooterMenu = ({
  themesOptions,
  theme,
  soundMode,
  toggleSoundMode,
  soundOptions,
  soundType,
  handleSoundTypeChange,
  handleThemeChange,
}) => {
  const getModeButtonClassName = (mode) => {
    if (mode) {
      return "zen-button";
    }
    return "zen-button-deactive";
  };

  return (
    <AppBar position="static" color="transparent" className="bottomBar">
      <Grid container justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="row" style={{display: 'none'}}>
          <Select
            classNamePrefix="Select"
            value={themesOptions.find((e) => e.value.label === theme.label)}
            options={themesOptions}
            isSearchable={false}
            isSelected={false}
            onChange={handleThemeChange}
            menuPlacement="top"
          ></Select>

          <IconButton onClick={toggleSoundMode}>
            <Tooltip title={SOUND_MODE_TOOLTIP}>
              <span className={getModeButtonClassName(soundMode)}>
                <VolumeUpIcon fontSize="medium"></VolumeUpIcon>
              </span>
            </Tooltip>
          </IconButton>
          {soundMode && (
            <Select
              classNamePrefix="Select"
              value={soundOptions.find((e) => e.label === soundType)}
              options={soundOptions}
              isSearchable={false}
              isSelected={false}
              onChange={handleSoundTypeChange}
              menuPlacement="top"
            ></Select>
          )}
        </Box>
      </Grid>
    </AppBar>
  );
};

export default FooterMenu;
