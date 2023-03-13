import { GameLoop } from './Main.js';
import {
  ClearBoard,
  HoverOverColumn,
  RemoveHoverOverColumn,
} from './GameBoard.js';
import {
  choiceColumn0,
  choiceColumn1,
  choiceColumn2,
  choiceColumn3,
  choiceColumn4,
  choiceColumn5,
  choiceColumn6,
  resetButton,
  colorSelector,
  cssRoot,
  difficultySelector,
} from './pageElements.js';

export function ResetButtonEventListener() {
  resetButton.addEventListener('click', () => {
    ClearBoard();
  });
}

export function AddColumnChoiceEventListener() {
  choiceColumn0.addEventListener('mouseover', () => {
    HoverOverColumn(0);
  });
  choiceColumn1.addEventListener('mouseover', () => {
    HoverOverColumn(1);
  });
  choiceColumn2.addEventListener('mouseover', () => {
    HoverOverColumn(2);
  });
  choiceColumn3.addEventListener('mouseover', () => {
    HoverOverColumn(3);
  });
  choiceColumn4.addEventListener('mouseover', () => {
    HoverOverColumn(4);
  });
  choiceColumn5.addEventListener('mouseover', () => {
    HoverOverColumn(5);
  });
  choiceColumn6.addEventListener('mouseover', () => {
    HoverOverColumn(6);
  });
  choiceColumn0.addEventListener('mouseleave', () => {
    RemoveHoverOverColumn(0);
  });
  choiceColumn1.addEventListener('mouseleave', () => {
    RemoveHoverOverColumn(1);
  });
  choiceColumn2.addEventListener('mouseleave', () => {
    RemoveHoverOverColumn(2);
  });
  choiceColumn3.addEventListener('mouseleave', () => {
    RemoveHoverOverColumn(3);
  });
  choiceColumn4.addEventListener('mouseleave', () => {
    RemoveHoverOverColumn(4);
  });
  choiceColumn5.addEventListener('mouseleave', () => {
    RemoveHoverOverColumn(5);
  });
  choiceColumn6.addEventListener('mouseleave', () => {
    RemoveHoverOverColumn(6);
  });
  choiceColumn0.addEventListener('click', () => {
    ClickHandle(0);
  });
  choiceColumn1.addEventListener('click', () => {
    ClickHandle(1);
  });
  choiceColumn2.addEventListener('click', () => {
    ClickHandle(2);
  });
  choiceColumn3.addEventListener('click', () => {
    ClickHandle(3);
  });
  choiceColumn4.addEventListener('click', () => {
    ClickHandle(4);
  });
  choiceColumn5.addEventListener('click', () => {
    ClickHandle(5);
  });
  choiceColumn6.addEventListener('click', () => {
    ClickHandle(6);
  });
}

function ClickHandle(column) {
  RemoveHoverOverColumn(column);
  GameLoop(column);
  HoverOverColumn(column);
}

export function AddChangeColorEventListener() {
  colorSelector.addEventListener('change', () => {
    cssRoot.style.setProperty('--playerColor', colorSelector.value);
  });
}

export let difficulty = 3; // default to expert difficulty
export function AddDifficultyEventListener() {
  difficultySelector.addEventListener('change', () => {
    console.log(difficultySelector.value);
    switch (difficultySelector.value) {
      case 'easy':
        difficulty = 0;
        break;
      case 'medium':
        difficulty = 1;
        break;
      case 'hard':
        difficulty = 2;
        break;
      case 'expert':
        difficulty = 3;
        GameLoop();
        break;
    }
    ClearBoard();
  });
}
