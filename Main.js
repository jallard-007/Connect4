import { CPUMain } from './CPU.js';
import { IsThereAWin, AddTokenIsSuccessful, IsSlotEmpty } from './GameBoard.js';
import {
  lastMove,
  columnIndexToSlotArrayMap,
  userTotalScore,
  compTotalScore,
} from './pageElements.js';
import {
  AddColumnChoiceEventListener,
  ResetButtonEventListener,
  AddChangeColorEventListener,
  AddDifficultyEventListener,
  difficulty,
} from './EventListeners.js';

function Main() {
  AddColumnChoiceEventListener();
  ResetButtonEventListener();
  AddChangeColorEventListener();
  AddDifficultyEventListener();
}

let compScore = 0;
let userScore = 0;

export function GameLoop(columnNum) {
  if (columnNum == null) {
    AddTokenIsSuccessful('slot2', columnIndexToSlotArrayMap[3]);
    return;
  }
  if (IsBoardFull() || IsThereAWin('slot1') || IsThereAWin('slot2')) {
    return;
  }
  if (AddTokenIsSuccessful('slot1', columnIndexToSlotArrayMap[columnNum])) {
    if (IsThereAWin('slot1', 'win')) {
      WhenThereIsAWin('slot1');
      return;
    }
  } else {
    return;
  }
  let cpuColumn = CPUMain(difficulty);
  if (!AddTokenIsSuccessful('slot2', cpuColumn.element)) {
    lastMove.innerText = 'Tie';
    return;
  }
  lastMove.innerText = `Last Move: Column ${cpuColumn.index}`;
  if (IsThereAWin('slot2', 'win')) {
    WhenThereIsAWin('slot2');
  }
  if (IsBoardFull()) {
    lastMove.innerText = 'Tie';
    return;
  }
}

function WhenThereIsAWin(whoWon) {
  if (whoWon == 'slot2') {
    lastMove.innerText = 'Computer Wins...';
    compScore++;
    compTotalScore.innerHTML = compScore;
  } else {
    lastMove.innerText = 'You Win!!!';
    userScore++;
    userTotalScore.innerHTML = userScore;
  }
}

function IsBoardFull() {
  let fullColumns = 0;
  for (let columnNum = 0; columnNum <= 6; columnNum++) {
    if (!IsSlotEmpty(columnIndexToSlotArrayMap[columnNum][0])) {
      fullColumns++;
    }
  }
  if (fullColumns == 7) {
    return true;
  }
  return false;
}

Main();
