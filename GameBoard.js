import { columnIndexToSlotArrayMap, lastMove } from './pageElements.js';
import { difficulty } from './EventListeners.js';

export function HoverOverColumn(column) {
  for (let i = columnIndexToSlotArrayMap[column].length - 1; i >= 0; i--) {
    if (!IsSlotEmpty(columnIndexToSlotArrayMap[column][i])) {
      continue;
    }
    columnIndexToSlotArrayMap[column][i].classList.add('slot4');
    return;
  }
}
export function RemoveHoverOverColumn(column) {
  columnIndexToSlotArrayMap[column];
  for (let i = columnIndexToSlotArrayMap[column].length - 1; i >= 0; i--) {
    if (!IsSlotEmpty(columnIndexToSlotArrayMap[column][i])) {
      continue;
    }
    columnIndexToSlotArrayMap[column][i].classList.remove('slot4');
  }
}

export function ClearBoard() {
  for (let column = 0; column <= 6; column++) {
    columnIndexToSlotArrayMap[column].forEach((slot) => {
      slot.classList.remove('slot1');
      slot.classList.remove('slot2');
      slot.classList.remove('slotWin');
      slot.innerText = '';
    });
  }
  if (difficulty > 2) {
    AddTokenIsSuccessful('slot2', columnIndexToSlotArrayMap[3]);
  }
}

export function AddTokenIsSuccessful(playerID, column) {
  for (let i = column.length - 1; i >= 0; i--) {
    if (!IsSlotEmpty(column[i])) {
      continue;
    }
    column[i].classList.add(playerID);
    return true;
  }
  lastMove.innerText = 'Column is Full';
  return false;
}

export function RemoveToken(column) {
  for (let i = 0; i <= column.length - 1; i++) {
    if (IsSlotEmpty(column[i])) {
      continue;
    }
    column[i].classList.remove('slot1');
    column[i].classList.remove('slot2');
    column[i].classList.remove('slot3');
    break;
  }
}

export function IsSlotEmpty(slot) {
  return !slot.classList.contains('slot1') && !slot.classList.contains('slot2') && !slot.classList.contains('slot3');
}

export function IsThereAWin(playerID, checkType) {
  for (let row = 0; row <= 5; row++) {
    for (let column = 3; column <= 6; column++) {
      if (CheckForHorizontalWin(playerID, checkType, column, row)) {
        return true;
      }
    }
  }
  for (let row = 0; row <= 2; row++) {
    for (let column = 0; column <= 6; column++) {
      if (CheckForVerticalWin(playerID, checkType, column, row)) {
        return true;
      }
    }
  }
  for (let row = 0; row <= 2; row++) {
    for (let column = 3; column <= 6; column++) {
      if (CheckForDiagonalWinLowerRighttoUpperLeft(playerID, checkType, column, row)) {
        return true;
      }
    }
  }
  for (let row = 0; row <= 2; row++) {
    for (let column = 0; column <= 3; column++) {
      if (CheckForDiagonalWinUpperRightToLowerLeft(playerID, checkType, column, row)) {
        return true;
      }
    }
  }
  return false;
}

function DisplayWin(column, row) {
  SlotClassList(column, row).add('slotWin');
}

function SlotClassList(column, row) {
  return columnIndexToSlotArrayMap[column][row].classList;
}

function CheckForHorizontalWin(playerID, checkType, column, row) {
  if (
    SlotClassList(column, row).contains(playerID) &&
    SlotClassList(column - 1, row).contains(playerID) &&
    SlotClassList(column - 2, row).contains(playerID) &&
    SlotClassList(column - 3, row).contains(playerID)
  ) {
    if (checkType == 'win') {
      DisplayWin(column, row);
      DisplayWin(column - 1, row);
      DisplayWin(column - 2, row);
      DisplayWin(column - 3, row);
    }
    return true;
  }
  return false;
}

function CheckForVerticalWin(playerID, checkType, column, row) {
  if (
    SlotClassList(column, row).contains(playerID) &&
    SlotClassList(column, row + 1).contains(playerID) &&
    SlotClassList(column, row + 2).contains(playerID) &&
    SlotClassList(column, row + 3).contains(playerID)
  ) {
    if (checkType == 'win') {
      DisplayWin(column, row);
      DisplayWin(column, row + 1);
      DisplayWin(column, row + 2);
      DisplayWin(column, row + 3);
    }
    return true;
  }
  return false;
}

function CheckForDiagonalWinLowerRighttoUpperLeft(playerID, checkType, column, row) {
  if (
    SlotClassList(column, row).contains(playerID) &&
    SlotClassList(column - 1, row + 1).contains(playerID) &&
    SlotClassList(column - 2, row + 2).contains(playerID) &&
    SlotClassList(column - 3, row + 3).contains(playerID)
  ) {
    if (checkType == 'win') {
      DisplayWin(column, row);
      DisplayWin(column - 1, row + 1);
      DisplayWin(column - 2, row + 2);
      DisplayWin(column - 3, row + 3);
    }
    return true;
  }
  return false;
}

function CheckForDiagonalWinUpperRightToLowerLeft(playerID, checkType, column, row) {
  if (
    SlotClassList(column, row).contains(playerID) &&
    SlotClassList(column + 1, row + 1).contains(playerID) &&
    SlotClassList(column + 2, row + 2).contains(playerID) &&
    SlotClassList(column + 3, row + 3).contains(playerID)
  ) {
    if (checkType == 'win') {
      DisplayWin(column, row);
      DisplayWin(column + 1, row + 1);
      DisplayWin(column + 2, row + 2);
      DisplayWin(column + 3, row + 3);
    }
    return true;
  }
  return false;
}
