import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily};
    transition: all 0.25s linear;
    text-shadow: ${({ theme }) => theme.textShadow};
  }
  .canvas {
      align-items: center;
      display: grid;
      gap: 1rem;
      grid-auto-flow: row;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      width: 100vw;
      z-index: 1;
      padding: 1rem;
      transition: padding-top .125s;
  }
  .dynamicBackground {
    heigh: 100%;
    width: 100%;
    z-index: -999;
    position: fixed;
    filter: grayscale(30%);
  }
  .header {
    position: relative;
    display: block;
    align-items: center;
    justify-content: center;
    padding-bottom: 0%;
    top: 0;
    left:0;
    width: 100%;
    text-align: center;
  }
  .bottom-info {
    color: ${({ theme }) => theme.title};
    margin: 4px;
  }
  small {
    display: block;
  }
  button {
    display: block;
  }
  h1 {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.title};
    opacity: 0.9;
    margin-top: 10px;
    margin-bottom: 0px;
  }
  h3{
    margin-right: 10px;
    color: white;
  }
  h4{
    margin-right: 10px;
    opacity: 1;
  }
  .stats {
    display: block;
    max-width: 1000px;
    margin-top: 50px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    color: ${({ theme }) => theme.stats};
    bottom: 10%;
  }
  .keyboard-stats {
    display: flex;
    max-width: 1000px;
    margin-top: 50px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    color: ${({ theme }) => theme.stats};
    bottom: 10%;
    justify-content: center;
    text-align: center;
  }
  .sub-header {
    color: ${({ theme }) => theme.subheadercolor};
    opacity: 1;
    border-right: 2px solid;
    animation: blinkingCursor 2s infinite;
    @keyframes blinkingCursor{
      0%		{ border-right-color: ${({ theme }) => theme.stats};}
      25%		{ border-right-color: transparent;}
      50%		{ border-right-color: ${({ theme }) => theme.stats};}
      75%		{border-right-color: transparent;}
      100%	{border-right-color: ${({ theme }) => theme.stats};}
    }
  }
  .type-box {
    display: block;
    max-width: 1000px;
    height: 140px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-top: 55px;
    position: relative;
    top: 10%;
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3) { 
      top:200px;
      width: 60%;
    }
  }
  .type-box-c, .type-box-cpp, .type-box-java, .type-box-py{
    display: block;
    max-width: 1000px;
    height: 140px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-top: 75px;
    position: relative;
    top: 10%;
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3) { 
      top:200px;
      width: 60%;
    }
  }
  .words{
    color: ${({ theme }) => theme.textTypeBox};
    font-size: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-content: center;
    user-select: none;
  }
  .word{
    margin: 5px 5px;
    display: flex;
    padding-right: 2px;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
    scroll-margin: 4px;
    letter-spacing: 0.1px;
  }
  .c-word, .cpp-word{
    margin: 5px 5px;
    display: flex;
    padding-right: 2px;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
    scroll-margin: 4px;
    letter-spacing: 0.1px;
  }
  .active-word{
    animation: blinkingBackground 2s infinite;
    border-top: 1px solid transparent;
    border-bottom: 1px solid;
    @keyframes blinkingBackground{
      0%		{ border-bottom-color: ${({ theme }) => theme.stats};}
      25%		{ border-bottom-color: ${({ theme }) => theme.textTypeBox};}
      50%		{ border-bottom-color: ${({ theme }) => theme.stats};}
      75%		{border-bottom-color: ${({ theme }) => theme.textTypeBox};}
      100%	{border-bottom-color: ${({ theme }) => theme.stats};}
    };
    scroll-margin: 4px;
  }
  .active-word-no-pulse{
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    scroll-margin: 4px;
  }
  .error-word{
    border-bottom: 1px solid red;
    scroll-margin: 4px;
  }
  .char{
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }
  .correct-char{
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    color: ${({ theme }) => theme.text};
  }
  .error-char{
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    color: red;
  }
  .caret-char-left{
    border-left: 1px solid ${({ theme }) => theme.stats};
    border-right: 1px solid transparent;
    transition: .125s;
    transition-behavior: normal;
    transition-duration: 0.125s;
    transition-timing-function: ease;
    transition-delay: 0s;
    transition-property: all;
    animation: 
      @keyframes caretFlashSmooth {
        0% ,
        100% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }
  }
  .caret-char-left-start{
    border-left: 1px solid;
    border-right: 1px solid transparent;
    animation: blinkingCaretLeft 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingCaretLeft{
      0%		{ border-left-color: ${({ theme }) => theme.stats};}
      25%		{ border-left-color: ${({ theme }) => theme.textTypeBox};}
      50%		{ border-left-color: ${({ theme }) => theme.stats};}
      75%		{ border-left-color: ${({ theme }) => theme.textTypeBox};}
      100%	{ border-left-color: ${({ theme }) => theme.stats};}
    }
  }
  .caret-char-right{
    border-right: 2px solid ${({ theme }) => theme.stats};
    border-left: 1x solid transparent;
  }
  .caret-char-right-correct{
    color: ${({ theme }) => theme.text};
    border-right: 1px solid ${({ theme }) => theme.stats};
    border-left: 1px solid transparent;
  }
  .smooth-char-right-correct{
    color: ${({ theme }) => theme.text};
  }
  .caret-char-right-error{
    color: red;
    border-right: 1px solid ${({ theme }) => theme.stats};
    border-left: 1px solid transparent;
  }
  .caret-extra-char-right-error{
    color: red;
    border-right: 1px solid ${({ theme }) => theme.stats};
    border-left: 1px solid transparent;
  }

  .hidden-input{
    opacity:0;
    filter:alpha(opacity=0);
  }
  .select {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.background};
    border: none;
    min-width: 5%;
  }
  .restart-button{
    margin-left: auto;
    margin-right: auto;
    width: 8em
  }
  .restart-button button:hover{
    transform:scale(1.18);
    transition:0.3s;
  }
  .alert{
    opacity: 0.3;
    background-image: ${({ theme }) => theme.gradient};
  }
  .correct-char-stats{
    color: ${({ theme }) => theme.text};
  }
  .incorrect-char-stats{
    color: red;
  }
  .missing-char-stats{
    color: ${({ theme }) => theme.textTypeBox};
  }
  .speedbar{
    opacity: 0.3;
    color:  ${({ theme }) => theme.stats};
  }
  .active-button{
    color: ${({ theme }) => theme.stats};
  }
  .inactive-button{
    color: ${({ theme }) => theme.textTypeBox};
  }
  
  .menu-separater{
    color: ${({ theme }) => theme.textTypeBox};
    background-color: none;
    font-size: 16px;
  }
  
  .dialog{
    background: ${({ theme }) => theme.background};
  }
  .key-type{
    background: ${({ theme }) => theme.textTypeBox};
    color: ${({ theme }) => theme.stats};
    border-radius: 4px;
  }
  .key-note{
    color: ${({ theme }) => theme.stats};
    background: transparent;
  }
  .novelty-container{
    width: 80%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    display: block;
  }
  .textarea{
    color: ${({ theme }) => theme.textTypeBox};
    font-size: 28px;
    background: transparent;
    border: none;
    caret-color: ${({ theme }) => theme.stats};
    font-family: ${({ theme }) => theme.fontFamily};
    overflow: auto;
    resize: none;
    width: 100vw;
    height: 70vh;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    outline: none;
    border-radius: 4px;
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3) { 
      top:200px;
      width: 60%;
    }
  }
  .active-game-mode-button{
    color: ${({ theme }) => theme.stats};
    font-size: 16px;
  }
  .inactive-game-mode-button{
    color: ${({ theme }) => theme.textTypeBox};
    font-size: 16px;
  }
  .error-sentence-char{
    color: red;
  }
  .error-sentence-space-char{
    border-bottom: 1px solid red;
  }
  .wordcard-error-char-space-char{
    border-bottom: 1px solid red;
    white-space:pre;
    padding-right: 4px;
  }
  .wordcard-error-char{
    color: red;
    padding-right: 4px;
  }
  .wordcard-char{
    color: ${({ theme }) => theme.textTypeBox};
    padding-right: 4px;
  }
  .correct-wordcard-char{
    color: ${({ theme }) => theme.text};
    padding-right: 4px;
  }
  .wordcard-word-display-field{
    font-size: 64px;
    margin: 40px;
  }
  .wordcard-meaning-display-field{
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  .next-sentence-display{
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.textTypeBox};
    display: block;
    margin-top: 10px;
    font-size: 16px;
  }
  .type-box-sentence {
    display: block;
    max-width: 1000px;
    height: 240px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    position: relative
    top: 10%;
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3) { 
      top:200px;
      width: 60%;
    }
  }

  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }

  .row {
    list-style: none;
    display: flex;
  }
  .row-1{
    padding-left: 0em;
  }
  .row-2{
    padding-left: 0.25em;
  }
  .row-3{
    padding-left: 0.5em;
  }
  .row-4{
    padding-left: 0em;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 0.25em;
    margin-block-end: 0.25em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }
  .SPACEKEY { 
    height: 3em;
    width: 21em;
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fontFamily};
    border-radius: 0.4em;
    line-height: 3em;
    letter-spacing: 1px;
    margin: 0.4em;
    transition: 0.3s;
    text-align: center;
    font-size: 1em;
    background-color: ${({ theme }) => theme.background};
    border: 2px solid ${({ theme }) => theme.textTypeBox};
    opacity: 0.8;
  }
  .UNITKEY { 
    height: 3em;
    width: 3em;
    color: rgba(0,0,0,0.7);
    border-radius: 0.4em;
    line-height: 3em;
    letter-spacing: 1px;
    margin: 0.4em;
    transition: 0.3s;
    text-align: center;
    font-size: 1em;
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.background};
    border: 2px solid ${({ theme }) => theme.textTypeBox};
    opacity: 1;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
  }
  

  @keyframes vibrate-1 {
    0% {
      -webkit-transform: translate(0);
              transform: translate(0);
    }
    20% {
      -webkit-transform: translate(-2px, 2px);
              transform: translate(-2px, 2px);
    }
    40% {
      -webkit-transform: translate(-2px, -2px);
              transform: translate(-2px, -2px);
    }
    60% {
      -webkit-transform: translate(2px, 2px);
              transform: translate(2px, 2px);
    }
    80% {
      -webkit-transform: translate(2px, -2px);
              transform: translate(2px, -2px);
    }
    100% {
      -webkit-transform: translate(0);
              transform: translate(0);
    }
  }
  .CorrectKeyDowns{
    color: inherit;
  }
  .IncorrectKeyDowns{
    color: red;
  }
  .select-chapter-title{
    font-size: 16px;
  }
  .hidden{
    display: none;
  }
  .time-text{
    color: #FFFFFF;
    font-family: 'Roboto Mono';
    font-weight: 700;
    font-size: 1.5em;
  }
  .time-num{
    color: ${({ theme }) =>theme.stats};
    font-family: 'Roboto Mono';
    font-size: 1.5em;
    font-weight: 600;
  }  
  .IconButton-set{
    background-color: rgb(31, 35, 44);
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    display: flex;
    height: 39px;
    width: 700px;
    margin: 0px auto;
    border-radius: 10px;
  }
  .smooth-caret {
    position: fixed;
    display: block;
    transform-origin: top, left;
    top: 282px;
    left: 273px;
    width: 1px; /* Adjust as needed */
    height: 1em; /* Adjust as needed */
    background: #FFFFFF; /* Adjust color as needed */
    pointer-events: none;
    transition: .125s;
    transition-behavior: normal;
    transition-duration: 0.125s;
    transition-timing-function: ease;
    transition-delay: 0s;
    transition-property: all;
    animation: 
      @keyframes caretFlashSmooth {
        0% ,
        100% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }
  }

  
  
`;
