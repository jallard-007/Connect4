import {GameLoop} from "./Main.js";
import {ClearBoard} from "./GameBoard.js";
import {choiceColumn0, choiceColumn1, choiceColumn2, choiceColumn3, 
    choiceColumn4, choiceColumn5, choiceColumn6, resetButton, colorSelector, cssRoot, difficultySelector} from "./pageElements.js";

export function ResetButtonEventListener(){
    resetButton.addEventListener('click', () => {
        ClearBoard();
    });
}

export function AddColumnChoiceEventListener(){
    choiceColumn0.addEventListener('click', () => {
        GameLoop(0);
    });
    choiceColumn1.addEventListener('click', () => {
        GameLoop(1);
    });
    choiceColumn2.addEventListener('click', () => {
        GameLoop(2);
    });
    choiceColumn3.addEventListener('click', () => {
        GameLoop(3);
    });
    choiceColumn4.addEventListener('click', () => {
        GameLoop(4);
    });
    choiceColumn5.addEventListener('click', () => {
        GameLoop(5);    
    });
    choiceColumn6.addEventListener('click', () => {
        GameLoop(6);    
    });
}

export function AddChangeColorEventListener(){
    colorSelector.addEventListener('change', () => {
        cssRoot.style.setProperty('--playerColor', colorSelector.value);
    });
}

export let difficulty = 0;
export function AddDifficultyEventListener(){
    difficultySelector.addEventListener('change', () => {
        console.log(difficultySelector.value);
        switch (difficultySelector.value){
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
                break;
        }

    });
}
