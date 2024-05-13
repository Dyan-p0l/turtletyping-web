import React, { useEffect, useState, useMemo } from "react";
import {
  wordsGenerator,
  CwordsGenerator,
  CppwordsGenerator,
  JavawordsGenerator,
  PyWordsGenerator
} from "../../../scripts/wordsGenerator";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from "../../utils/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import useLocalPersistState from "../../../hooks/useLocalPersistState";
import CapsLockSnackbar from "../CapsLockSnackbar";
import Stats from "./Stats";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DEFAULT_COUNT_DOWN,
  COUNT_DOWN_90,
  COUNT_DOWN_60,
  COUNT_DOWN_30,
  COUNT_DOWN_15,
  DEFAULT_WORDS_COUNT,
  ENGLISH_MODE,
  C_MODE,
  CPP_MODE,
  JAVA_MODE,
  PYTHON_MODE,
  RESTART_BUTTON_TOOLTIP_TITLE,
  REDO_BUTTON_TOOLTIP_TITLE,
  PACING_CARET,
  PACING_PULSE,
  smoothCaret,
} from "../../../constants/Constants";


const TypeBox = ({
  textInputRef,
  handleInputFocus,
}) => {

  // local persist timer
  const [countDownConstant, setCountDownConstant] = useLocalPersistState(
    DEFAULT_COUNT_DOWN,
    "timer-constant"
  );



  // local persist pacing style
  const [pacingStyle, setPacingStyle] = useLocalPersistState(
    PACING_PULSE,
    "pacing-style"
  );

  const [language, setLanguage] = useLocalPersistState(
    ENGLISH_MODE,
    "language"
  );

  
  
  


  // Caps Lock
  const [capsLocked, setCapsLocked] = useState(false);

  // tab-enter restart dialog
  const [openRestart, setOpenRestart] = useState(false);

  const EnterkeyPressReset = (e) => {
    // press enter/or tab to reset;
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault();
      setOpenRestart(false);
      reset(countDownConstant, language, false);
    } // press space to redo
    else if (e.keyCode === 32) {
      e.preventDefault();
      setOpenRestart(false);
      reset(countDownConstant, language, true);
    } else {
      e.preventDefault();
      setOpenRestart(false);
    }
  };
  const handleTabKeyOpen = () => {
    setOpenRestart(true);
  };

  // set up words state
  const [wordsDict, setWordsDict] = useState(() => {
    if (language === ENGLISH_MODE) {
      return wordsGenerator(DEFAULT_WORDS_COUNT, ENGLISH_MODE);
    }
    if (language === C_MODE) {
      return CwordsGenerator(DEFAULT_WORDS_COUNT, C_MODE);
    }
    if (language === CPP_MODE) {
      return CppwordsGenerator(DEFAULT_WORDS_COUNT, CPP_MODE);
    }
    if (language === JAVA_MODE) {
      return JavawordsGenerator(DEFAULT_WORDS_COUNT, JAVA_MODE);
    }
    if (language === PYTHON_MODE) {
      return PyWordsGenerator(DEFAULT_WORDS_COUNT, PYTHON_MODE);
    }
  });

  const words = useMemo(() => {
    return wordsDict.map((e) => e.val);
  }, [wordsDict]);

  

  const wordSpanRefs = useMemo(
    () =>
      Array(words.length)
        .fill(0)
        .map((i) => React.createRef()),
    [words]
  );

  // set up timer state
  const [countDown, setCountDown] = useState(countDownConstant);
  const [intervalId, setIntervalId] = useState(null);

  // set up game loop status state
  const [status, setStatus] = useState("waiting");

  // set up hidden input input val state
  const [currInput, setCurrInput] = useState("");
  // set up world advancing index
  const [currWordIndex, setCurrWordIndex] = useState(0);
  // set up char advancing index
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [prevInput, setPrevInput] = useState("");

  // set up words examine history
  const [wordsCorrect, setWordsCorrect] = useState(new Set());
  const [wordsInCorrect, setWordsInCorrect] = useState(new Set());
  const [inputWordsHistory, setInputWordsHistory] = useState({});

  // setup stats
  const [rawKeyStrokes, setRawKeyStrokes] = useState(0);
  const [wpmKeyStrokes, setWpmKeyStrokes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [statsCharCount, setStatsCharCount] = useState([]);

  // set up char examine hisotry
  const [history, setHistory] = useState({});
  const keyString = currWordIndex + "." + currCharIndex;
  const [currChar, setCurrChar] = useState("");

  useEffect(() => {
    if (currWordIndex === DEFAULT_WORDS_COUNT - 1) {
      if (language === ENGLISH_MODE) {
        const generatedEng = wordsGenerator(
          DEFAULT_WORDS_COUNT,
          ENGLISH_MODE,
        );
        setWordsDict((currentArray) => [...currentArray, ...generatedEng]);
      }
      if(language === C_MODE){
        const generatedC = CwordsGenerator(
          DEFAULT_WORDS_COUNT, 
          C_MODE
        );
        setWordsDict((currentArray) => [...currentArray, ...generatedC]);
      }
      if(language === CPP_MODE){
        const generatedCpp = CppwordsGenerator(
          DEFAULT_WORDS_COUNT, 
          CPP_MODE
        );
        setWordsDict((currentArray) => [...currentArray, ...generatedCpp]);
      }
      if(language === JAVA_MODE){
        const generatedJava = JavawordsGenerator(
          DEFAULT_WORDS_COUNT, 
          JAVA_MODE
        );
        setWordsDict((currentArray) => [...currentArray, ...generatedJava]);
      }
      if(language === PYTHON_MODE){
        const generatedPy = PyWordsGenerator(
          DEFAULT_WORDS_COUNT,
          PYTHON_MODE
        );
        setWordsDict((currentArray) => [...currentArray, ...generatedPy]);
      }
    }
    if (
      currWordIndex !== 0 &&
      wordSpanRefs[currWordIndex].current.offsetLeft <
      wordSpanRefs[currWordIndex - 1].current.offsetLeft
    ) {
      wordSpanRefs[currWordIndex - 1].current.scrollIntoView();
    } else {
      return;
    }
  }, [currWordIndex, wordSpanRefs, language]);

  const reset = (newCountDown, language, isRedo) => {
    setStatus("waiting");
    if (!isRedo) {
      if (language === ENGLISH_MODE) {
        setWordsDict(wordsGenerator(DEFAULT_WORDS_COUNT, language));
      }
      if (language === C_MODE) {
        setWordsDict(CwordsGenerator(DEFAULT_WORDS_COUNT, language));
      }
      if (language === CPP_MODE) {
        setWordsDict(CppwordsGenerator(DEFAULT_WORDS_COUNT, language));
      }
      if (language === JAVA_MODE) {
        setWordsDict(JavawordsGenerator(DEFAULT_WORDS_COUNT, language));
      }
      if (language === PYTHON_MODE) {
        setWordsDict(PyWordsGenerator(DEFAULT_WORDS_COUNT, language));
      }
    }
    setCountDownConstant(newCountDown);
    setCountDown(newCountDown);

    setLanguage(language);
    clearInterval(intervalId);
    setWpm(0);
    setRawKeyStrokes(0);
    setWpmKeyStrokes(0);
    setCurrInput("");
    setPrevInput("");
    setIntervalId(null);
    setCurrWordIndex(0);
    setCurrCharIndex(-1);
    setCurrChar("");
    setHistory({});
    setInputWordsHistory({});
    setWordsCorrect(new Set());
    setWordsInCorrect(new Set());
    textInputRef.current.focus();
    // console.log("fully reset waiting for next inputs");
    wordSpanRefs[0].current.scrollIntoView();
  };

  const start = () => {
    if (status === "finished") {
      setCurrInput("");
      setPrevInput("");
      setCurrWordIndex(0);
      setCurrCharIndex(-1);
      setCurrChar("");
      setHistory({});
      setInputWordsHistory({});
      setWordsCorrect(new Set());
      setWordsInCorrect(new Set());
      setStatus("waiting");
      textInputRef.current.focus();
    }

    if (status !== "started") {
      setStatus("started");
      let intervalId = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(intervalId);
            // current total extra inputs char count
            const currCharExtraCount = Object.values(history)
              .filter((e) => typeof e === "number")
              .reduce((a, b) => a + b, 0);

            // current correct inputs char count
            const currCharCorrectCount = Object.values(history).filter(
              (e) => e === true
            ).length;

            // current correct inputs char count
            const currCharIncorrectCount = Object.values(history).filter(
              (e) => e === false
            ).length;

            // current missing inputs char count
            const currCharMissingCount = Object.values(history).filter(
              (e) => e === undefined
            ).length;

            // current total advanced char counts
            const currCharAdvancedCount =
              currCharCorrectCount +
              currCharMissingCount +
              currCharIncorrectCount;

            // When total inputs char count is 0,
            // that is to say, both currCharCorrectCount and currCharAdvancedCount are 0,
            // accuracy turns out to be 0 but NaN.
            const accuracy =
              currCharCorrectCount === 0
                ? 0
                : (currCharCorrectCount / currCharAdvancedCount) * 100;

            setStatsCharCount([
              accuracy,
              currCharCorrectCount,
              currCharIncorrectCount,
              currCharMissingCount,
              currCharAdvancedCount,
              currCharExtraCount,
            ]);

            checkPrev();
            setStatus("finished");

            return countDownConstant;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
      setIntervalId(intervalId);
    }
  };

  const UpdateInput = (e) => {
    if (status === "finished") {
      return;
    }
    setCurrInput(e.target.value);
    inputWordsHistory[currWordIndex] = e.target.value.trim();
    setInputWordsHistory(inputWordsHistory);
  };

  const handleKeyUp = (e) => {
    setCapsLocked(e.getModifierState("CapsLock"));
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    const keyCode = e.keyCode;
    setCapsLocked(e.getModifierState("CapsLock"));

    // keydown count for KPM calculations to all types of operations
    if (status === "started") {
      setRawKeyStrokes(rawKeyStrokes + 1);
      if (keyCode >= 65 && keyCode <= 90) {
        setWpmKeyStrokes(wpmKeyStrokes + 1);
      }
    }

    // disable Caps Lock key
    if (keyCode === 20) {
      e.preventDefault();
      return;
    }

    // disable shift alt ctrl
    if (keyCode >= 16 && keyCode <= 18) {
      e.preventDefault();
      return;
    }

    // disable tab key
    if (keyCode === 9) {
      e.preventDefault();
      handleTabKeyOpen();
      return;
    }

    if (status === "finished") {
      setCurrInput("");
      setPrevInput("");
      return;
    }

    // update stats when typing unless there is no effective wpm
    if (wpmKeyStrokes !== 0) {
      const currWpm =
        (wpmKeyStrokes / 5 / (countDownConstant - countDown)) * 60.0;
      setWpm(currWpm);
    }

    // start the game by typing any thing
    if (status !== "started" && status !== "finished") {
      start();
    }

    // space bar
    if (keyCode === 32) {
      const prevCorrectness = checkPrev();
      // advance to next regardless prev correct/not
      if (prevCorrectness === true || prevCorrectness === false) {
        // reset currInput
        setCurrInput("");
        // advance to next
        setCurrWordIndex(currWordIndex + 1);
        setCurrCharIndex(-1);
        return;
      } else {
        // but don't allow entire word skip
        // console.log("entire word skip not allowed");
        return;
      }

      // backspace
    } else if (keyCode === 8) {
      // delete the mapping match records
      delete history[keyString];

      // avoid over delete
      if (currCharIndex < 0) {
        // only allow delete prev word, rewind to previous
        if (wordsInCorrect.has(currWordIndex - 1)) {
          // console.log("detected prev incorrect, rewinding to previous");
          const prevInputWord = inputWordsHistory[currWordIndex - 1];
          // console.log(prevInputWord + " ")
          setCurrInput(prevInputWord + " ");
          setCurrCharIndex(prevInputWord.length - 1);
          setCurrWordIndex(currWordIndex - 1);
          setPrevInput(prevInputWord);
        }
        return;
      }
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
      return;
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
      return;
      // if (keyCode >= 65 && keyCode <= 90) {
      //   setCurrCharIndex(currCharIndex + 1);
      //   setCurrChar(key);
      // } else {
      //   return;
      // }
    }
  };

  const getExtraCharClassName = (i, idx, extra) => {
    if (
      pacingStyle === PACING_CARET &&
      currWordIndex === i &&
      idx === extra.length - 1
    ) {
      return "caret-extra-char-right-error";
    }
    return "error-char";
  };

  const getExtraCharsDisplay = (word, i) => {
    let input = inputWordsHistory[i];
    if (!input) {
      input = currInput.trim();
    }
    if (i > currWordIndex) {
      return null;
    }
    if (input.length <= word.length) {
      return null;
    } else {
      const extra = input.slice(word.length, input.length).split("");
      history[i] = extra.length;
      return extra.map((c, idx) => (
        <span key={idx} className={getExtraCharClassName(i, idx, extra)}>
          {c}
        </span>
      ));
    }
  };

  const checkPrev = () => {
    const wordToCompare = words[currWordIndex];
    const currInputWithoutSpaces = currInput.trim();
    const isCorrect = wordToCompare === currInputWithoutSpaces;
    if (!currInputWithoutSpaces || currInputWithoutSpaces.length === 0) {
      return null;
    }
    if (isCorrect) {
      // console.log("detected match");
      wordsCorrect.add(currWordIndex);
      wordsInCorrect.delete(currWordIndex);
      let inputWordsHistoryUpdate = { ...inputWordsHistory };
      inputWordsHistoryUpdate[currWordIndex] = currInputWithoutSpaces;
      setInputWordsHistory(inputWordsHistoryUpdate);
      // reset prevInput to empty (will not go back)
      setPrevInput("");

      // here count the space as effective wpm.
      setWpmKeyStrokes(wpmKeyStrokes + 1);
      return true;
    } else {
      // console.log("detected unmatch");
      wordsInCorrect.add(currWordIndex);
      wordsCorrect.delete(currWordIndex);
      let inputWordsHistoryUpdate = { ...inputWordsHistory };
      inputWordsHistoryUpdate[currWordIndex] = currInputWithoutSpaces;
      setInputWordsHistory(inputWordsHistoryUpdate);
      // append currInput to prevInput
      setPrevInput(prevInput + " " + currInputWithoutSpaces);
      return false;
    }
  };

  const getWordClassName = (wordIdx) => {
    if (wordsInCorrect.has(wordIdx)) {
      if (currWordIndex === wordIdx) {
        if (pacingStyle === PACING_PULSE) {
          return "word error-word active-word";
        } else {
          return "word error-word active-word-no-pulse";
        }
      }
      return "word error-word";
    } else {
      if (currWordIndex === wordIdx) {
        if (pacingStyle === PACING_PULSE) {
          return "word active-word";
        } else {
          return "word active-word-no-pulse";
        }
      }
      return "word";
    }
  };

  
 

 
  


  const getCharClassName = (wordIdx, charIdx, char, word) => {
    const keyString = wordIdx + "." + charIdx;
    if (
      pacingStyle === PACING_CARET &&
      wordIdx === currWordIndex &&
      charIdx === currCharIndex + 1 &&
      status !== "finished"
    ) {
      return "caret-char-left";
    }
    if (
      pacingStyle === smoothCaret &&
      wordIdx === currWordIndex &&
      charIdx === currCharIndex + 1 &&
      status !== "finished"
    ) {
      return "smooth-current-char";
    }

    if (history[keyString] === true) {
      if (
        pacingStyle === PACING_CARET &&
        wordIdx === currWordIndex &&
        word.length - 1 === currCharIndex &&
        charIdx === currCharIndex &&
        status !== "finished"
      ) {
        return "caret-char-right-correct";
      }
      if (
        pacingStyle === smoothCaret &&
        wordIdx === currWordIndex &&
        word.length - 1 === currCharIndex &&
        charIdx === currCharIndex &&
        status !== "finished"
      ) {
        return "smooth-char-right-correct";
      }

      return "correct-char";
    }
    if (history[keyString] === false) {
      if (
        pacingStyle === PACING_CARET &&
        wordIdx === currWordIndex &&
        word.length - 1 === currCharIndex &&
        charIdx === currCharIndex &&
        status !== "finished"
      ) {
        return "caret-char-right-error";
      }
      if (
        pacingStyle === PACING_CARET &&
        wordIdx === currWordIndex &&
        word.length - 1 === currCharIndex &&
        charIdx === currCharIndex &&
        status !== "finished"
      ) {
        return "smooth-char-right-error";
      }
      return "error-char";
    }
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        history[keyString] = true;
        return "correct-char";
      } else {
        history[keyString] = false;
        return "error-char";
      }
    } else {
      if (wordIdx < currWordIndex) {
        // missing chars
        history[keyString] = undefined;
      }

      return "char";
    }
  };

  

  const nextLetter = document.querySelector('.smooth-current-char');
  const nextWord = document.querySelector('.word active-word-no-pulse');
  const smoothcaret = document.querySelector('.smooth-caret'); 
  const lastLetter = document.querySelector('.smooth-char-right-correct');

  

  

  const getPacingStyleButtonClassName = (buttonPacingStyle) => {
    if (pacingStyle === buttonPacingStyle) {
      return "active-button";
    }
    return "inactive-button";
  };

  const getTimerButtonClassName = (buttonTimerCountDown) => {
    if (countDownConstant === buttonTimerCountDown) {
      return "active-button";
    }
    return "inactive-button";
  };

  const getLanguageButtonClassName = (buttonLanguage) => {
    if (language === buttonLanguage) {
      return "active-button";
    }
    return "inactive-button";
  };

  return (
    <div onClick={handleInputFocus}>
      <div className="IconButton-set" style={{position: 'fixed', top: '170px', left: '0', right: '0', margin: '0 auto'}}>
      <IconButton style={{ marginLeft: '15px', fontFamily:"Lexend Deca", fontWeight:"600"}} onClick={() => {reset(countDownConstant, ENGLISH_MODE, false);}}><span className={getLanguageButtonClassName(ENGLISH_MODE)}>Default</span></IconButton>
      <IconButton style={{fontFamily:"Lexend Deca", fontWeight:"600"}} onClick={() => { reset(countDownConstant, C_MODE, false);}}><span className={getLanguageButtonClassName(C_MODE)}>C</span></IconButton>
      <IconButton style={{fontFamily:"Lexend Deca", fontWeight:"600"}} onClick={() => { reset(countDownConstant, CPP_MODE, false);}}><span className={getLanguageButtonClassName(CPP_MODE)}>C++</span></IconButton>
      <IconButton style={{fontFamily:"Lexend Deca", fontWeight:"600"}} onClick={() => { reset(countDownConstant, JAVA_MODE, false);}}><span className={getLanguageButtonClassName(JAVA_MODE)}>Java</span></IconButton>
      <IconButton style={{ marginRight: '15px', fontFamily:"Lexend Deca", fontWeight:"600"}} onClick={() => { reset(countDownConstant, PYTHON_MODE, false);}}><span className={getLanguageButtonClassName(PYTHON_MODE)}>Python</span></IconButton>
    </div>

      <CapsLockSnackbar open={capsLocked}></CapsLockSnackbar>
      {language === ENGLISH_MODE && (
        <div className="type-box">
          <div className="words">
            {pacingStyle === smoothCaret && (
              <div className="smooth-caret" style={{  }}>
              </div>
            )}
            {words.map((word, i) => (
              <span
                key={i}
                ref={wordSpanRefs[i]}
                className={getWordClassName(i)}
              >
                {word.split("").map((char, idx) => (
                  <span
                    key={"word" + idx}
                    className={getCharClassName(i, idx, char, word)}
                  >
                    {char}
                  </span>
                ))}
                {getExtraCharsDisplay(word, i)}
              </span>
            ))}
          </div>
        </div>
      )}
      {language === C_MODE && (
        <div className="type-box-c">
          <div className="words">
            {words.map((word, i) => (
              <span
                key={i}
                ref={wordSpanRefs[i]}
                className={getWordClassName(i)}
              >
                {word.split("").map((char, idx) => (
                  <span
                    key={"word" + idx}
                    className={getCharClassName(i, idx, char, word)}
                  >
                    {char}
                  </span>
                ))}
                {getExtraCharsDisplay(word, i)}
              </span>
            ))}
            
          </div>
        </div>
      )}
      {language === CPP_MODE && (
        <div className="type-box-cpp">
        <div className="words">
          {words.map((word, i) => (
            <span
              key={i}
              ref={wordSpanRefs[i]}
              className={getWordClassName(i)}
            >
              {word.split("").map((char, idx) => (
                <span
                  key={"word" + idx}
                  className={getCharClassName(i, idx, char, word)}
                >
                  {char}
                </span>
              ))}
              {getExtraCharsDisplay(word, i)}
            </span>
          ))}
        </div>
        </div>
      )}
      {language === JAVA_MODE && (
        <div className="type-box-java">
        <div className="words">
          {words.map((word, i) => (
            <span
              key={i}
              ref={wordSpanRefs[i]}
              className={getWordClassName(i)}
            >
              {word.split("").map((char, idx) => (
                <span
                  key={"word" + idx}
                  className={getCharClassName(i, idx, char, word)}
                >
                  {char}
                </span>
              ))}
              {getExtraCharsDisplay(word, i)}
            </span>
          ))}
        </div>
        </div>
      )}
      {language === PYTHON_MODE && (
        <div className="type-box-py">
        <div className="words">
          {words.map((word, i) => (
            <span
              key={i}
              ref={wordSpanRefs[i]}
              className={getWordClassName(i)}
            >
              {word.split("").map((char, idx) => (
                <span
                  key={"word" + idx}
                  className={getCharClassName(i, idx, char, word)}
                >
                  {char}
                </span>
              ))}
              {getExtraCharsDisplay(word, i)}
            </span>
          ))}
        </div>
        </div>
      )}
      <div className="stats">
        <Stats
          status={status}
          wpm={wpm}
          countDown={countDown}
          countDownConstant={countDownConstant}
          statsCharCount={statsCharCount}
          rawKeyStrokes={rawKeyStrokes}
        ></Stats>
        <div className="restart-button" key="restart-button">
          <Grid container justifyContent="center" alignItems="center">
            <Box display="flex" flexDirection="row">
              <IconButton
                aria-label="redo"
                color="secondary"
                size="medium"
                onClick={() => {
                  reset(countDownConstant, language, true);
                }}
              >
                <Tooltip title={REDO_BUTTON_TOOLTIP_TITLE}>
                  <RestartAltIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                aria-label="restart"
                color="secondary"
                size="medium"
                onClick={() => {
                  reset(countDownConstant, language, false);
                }}
              >
                <Tooltip title={RESTART_BUTTON_TOOLTIP_TITLE}>
                  <ChevronRightIcon />
                </Tooltip>
              </IconButton>
                <>
                  <IconButton
                    onClick={() => {
                      reset(COUNT_DOWN_90, language, true);
                    }}
                  >
                    <span className={getTimerButtonClassName(COUNT_DOWN_90)}>
                      {COUNT_DOWN_90}
                    </span>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      reset(COUNT_DOWN_60, language, true);
                    }}
                  >
                    <span className={getTimerButtonClassName(COUNT_DOWN_60)}>
                      {COUNT_DOWN_60}
                    </span>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      reset(COUNT_DOWN_30, language, true);
                    }}
                  >
                    <span className={getTimerButtonClassName(COUNT_DOWN_30)}>
                      {COUNT_DOWN_30}
                    </span>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      reset(COUNT_DOWN_15, language, true);
                    }}
                  >
                    <span className={getTimerButtonClassName(COUNT_DOWN_15)}>
                      {COUNT_DOWN_15}
                    </span>
                  </IconButton>
                </>
              
            </Box>

              <Box display="flex" flexDirection="row">
                <IconButton
                  onClick={() => {
                    setPacingStyle(PACING_PULSE);
                  }}
                >
                    <span
                      className={getPacingStyleButtonClassName(PACING_PULSE)}
                    >
                      {PACING_PULSE}
                    </span>
                </IconButton>
                <IconButton
                  onClick={() => {
                    setPacingStyle(PACING_CARET);
                  }}
                >
                    <span
                      className={getPacingStyleButtonClassName(PACING_CARET)}
                    >
                      {PACING_CARET}
                    </span>
                </IconButton>
                <IconButton onClick={() => {
                  setPacingStyle(smoothCaret);
                }} style = {{display: ''}}>
                    <span
                      className={getPacingStyleButtonClassName(smoothCaret)}
                    >
                      {smoothCaret}
                    </span>

                </IconButton>
              </Box>
            
          </Grid>
        </div>
      </div>
      <input
        key="hidden-input"
        ref={textInputRef}
        type="text"
        className="hidden-input"
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => handleKeyUp(e)}
        value={currInput}
        onChange={(e) => UpdateInput(e)}
      />
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        open={openRestart}
        onKeyDown={EnterkeyPressReset}
      >
        <DialogTitle>
          <div>
            <span className="key-note"> press </span>
            <span className="key-type">Space</span>{" "}
            <span className="key-note">to type the same set of words</span>
          </div>
          <div>
            <span className="key-note"> press </span>
            <span className="key-type">Tab</span>{" "}
            <span className="key-note">/</span>{" "}
            <span className="key-type">Enter</span>{" "}
            <span className="key-note">for next set of words</span>
          </div>
          <span className="key-note"> press </span>
          <span className="key-type">any key </span>{" "}
          <span className="key-note">to exit</span>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default TypeBox;
