import React from "react";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
import { CHAR_TOOLTIP_TITLE } from "../../../constants/Constants";

const Stats = ({
  status,
  wpm,
  countDown,
  countDownConstant,
  statsCharCount,
  rawKeyStrokes,
}) => {
  return (
    <>
      <h3 className="time-text">TIME: {countDown} s </h3>
      <Box display="flex" flexDirection="row">
        {status === "finished" || countDown === 0 ? (<h3>WPM: {Math.round(wpm)}</h3>) : null}
        {status === "finished" && (
          <h4>Accuracy: {Math.round(statsCharCount[0])} %</h4>
        )}
        {status === "finished" && (
          <Tooltip
            title={
              <span style={{ whiteSpace: "pre-line" }}>
                {CHAR_TOOLTIP_TITLE}
              </span>
            }
          >
            <h4>
              
            </h4>
          </Tooltip>
        )}
        {status === "finished" && (
          <h4>
            Raw KPM: {Math.round((rawKeyStrokes / countDownConstant) * 60.0)}
          </h4>
        )}
      </Box>
    </>
  );
};

export default Stats;
