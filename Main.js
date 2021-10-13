import {CPUMain} from "./CPU.js";
import {IsThereAWin, AddTokenIsSuccessful, IsSlotEmpty} from "./GameBoard.js";
import {lastMove, columnIndexToSlotArrayMap, resetButton, userTotalScore, compTotalScore} from "./pageElements.js";
import {AddColumnChoiceEventListener, ResetButtonEventListener, AddChangeColorEventListener, AddDifficultyEventListener, difficulty} from "./EventListeners.js";

function Main(){
    AddColumnChoiceEventListener();
    ResetButtonEventListener();
    AddChangeColorEventListener();
    AddDifficultyEventListener();
}

let compScore = 0;
let userScore = 0;

export function GameLoop(columnNum){
    if (IsBoardFull() || IsThereAWin("slot1") || IsThereAWin("slot2") || !AddTokenIsSuccessful("slot1", columnIndexToSlotArrayMap[columnNum])){
        return;
    }

    if(IsThereAWin("slot1", "win")){
        WhenThereIsAWin("slot1");
    }

    else {
        let cpuColumn = CPUMain(difficulty);
        if (!AddTokenIsSuccessful("slot2", cpuColumn.element)){
            lastMove.innerText = 'Tie';
            resetButton.innerText = 'New Game';
            return;
        }
        lastMove.innerText = `Last Move: Column ${cpuColumn.index}`;
        if(IsThereAWin("slot2", "win")){
            WhenThereIsAWin("slot2");
        }
        if (IsBoardFull()){
            lastMove.innerText = 'Tie';
            resetButton.innerText = 'New Game';
            return;
        }
    }
}

function WhenThereIsAWin(whoWon){
    resetButton.innerText = 'New Game';
    if (whoWon == "slot2"){
        lastMove.innerText = 'Computer Wins...';
        compScore ++;
        compTotalScore.innerHTML = compScore;
    }
    else {
        lastMove.innerText = 'You Win!!!';
        userScore++;
        userTotalScore.innerHTML = userScore;
    }
}

function IsBoardFull(){
    let fullColumns = 0;
    for (let columnNum = 0; columnNum <= 6; columnNum++){
        if (!IsSlotEmpty(columnIndexToSlotArrayMap[columnNum][0])){
            fullColumns++;
        }
    }
    if (fullColumns == 7){
        return true;
    }
    return false;
}

Main();
