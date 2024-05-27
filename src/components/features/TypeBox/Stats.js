import React from "react";
import { Box } from "@mui/system";

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
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', }}> 
      <div style={{display: 'flex', flexDirection: 'row', alignitems: 'center', justifycontent: 'space-between'}}>
        <h3 className="time-text">Time: </h3>
        <p className="time-num"> {countDown} s </p>
      </div>
      <Box display="flex" flexDirection="row" margin={"0px 190px"}>
        {status === "finished" ? (<h3>WPM: {Math.round(wpm)}</h3>) : null} 
        {status === "finished" && (
          <h4>Accuracy: {Math.round(statsCharCount[0])} %</h4>
        )}
        {status === "finished" && (
          <h4>
            Raw KPM: {Math.round((rawKeyStrokes / countDownConstant) * 60.0)}
          </h4>
        )}
      </Box>
    </div>
    </>
  );
};

export default Stats;
