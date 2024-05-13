import {
  COMMON_WORDS,
} from "../constants/WordsMostCommon";
import {
  ENGLISH_MODE,
  DEFAULT_WORDS_COUNT,
  C_MODE,
  CPP_MODE,
  JAVA_MODE,
  PYTHON_MODE
} from "../constants/Constants";
import { randomIntFromRange } from "./randomUtils";
import {
  C_SYNTAX,
  CPP_SYNTAX,
  JAVA_SYNTAX,
  PYTHON_SYNTAX
} from "../constants/SyntaxMostCommon";

const wordsGenerator = (
  wordsCount,
  languageMode
) => {
  if (languageMode === ENGLISH_MODE) {
    const EnglishWordList = [];
    for (let i = 0; i < DEFAULT_WORDS_COUNT; i++) {
      const rand = randomIntFromRange(0, 550);
      let wordCandidate = COMMON_WORDS[rand].val;
      EnglishWordList.push({ key: wordCandidate, val: wordCandidate });
    }
    return EnglishWordList;
  }
  return ["something", "went", "wrong"];
};

const CwordsGenerator = (
  wordsCount,
  languageMode
) => {  
  if (languageMode === C_MODE){
    const CwordsList = [];
    for(let i = 0; i < DEFAULT_WORDS_COUNT; i++){
      const rand = randomIntFromRange(0, 53);
      let CwordCandidate = C_SYNTAX[rand].val;
      CwordsList.push({ key: CwordCandidate, val: CwordCandidate })
    }
    return CwordsList;
  }
  return ["something", "went", "wrong"];
};

const CppwordsGenerator = (
  wordsCount,
  languageMode
) => {
  if (languageMode === CPP_MODE){
    const CppWordsList = [];
    for(let i = 0; i < DEFAULT_WORDS_COUNT; i++){
      const rand = randomIntFromRange(0, 53);
      let CppwordCandidate = CPP_SYNTAX[rand].val;
      CppWordsList.push({key: CppwordCandidate, val: CppwordCandidate});
    }
    return CppWordsList;
  }
  return ["something", "went", "wrong"];
}

const JavawordsGenerator = (
  wordsCount,
  languageMode
) => {
  if (languageMode === JAVA_MODE){
    const JavaWordsList = [];
    for(let i = 0; i < DEFAULT_WORDS_COUNT; i++){
      const rand = randomIntFromRange(0, 53);
      let JavawordCandidate = JAVA_SYNTAX[rand].val;
      JavaWordsList.push({key: JavawordCandidate, val: JavawordCandidate});
    }
    return JavaWordsList;
  }
  return ["something", "went", "wrong"];
}

const PyWordsGenerator = (
  wordsCount,
  languageMode
) => {
  if (languageMode === PYTHON_MODE){
    const PyWordsList = [];
    for(let i = 0; i < DEFAULT_WORDS_COUNT; i++){
      const rand = randomIntFromRange(0, 53);
      let PywordCandidate = PYTHON_SYNTAX[rand].val;
      PyWordsList.push({key: PywordCandidate, val: PywordCandidate});
    }
    return PyWordsList;
  }
  return ["something", "went", "wrong"];
}

export { wordsGenerator, CwordsGenerator, CppwordsGenerator, JavawordsGenerator, PyWordsGenerator };
