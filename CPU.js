import {columnIndexToSlotArrayMap} from "./pageElements.js";
import {AddTokenIsSuccessful, RemoveToken, IsThereAWin } from "./GameBoard.js";

export function CPUMain(difficulty){
    let columnOptions = [0,0,0,0,0,0,0]; // list of possible column choices for cpu
    //console.log(difficulty);
    
    for (let column = 0; column <= 6; column++){

        if (ColumnIsFull(columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -101;
        }

        // number codes:

        // 100 = win for comp
        // 99 = win for player
        // 98 = double win for comp
        // 97 = triple win for comp
        // 96 = double win for player
        // 95 = triple win for player
        // 94 = stacked win for comp
        // 93 = stacked win for player
        // 92 = double column freeze for player
        // 91 = double column freeze for comp
        // 90 = column freeze for player
        // 88 = column freeze for comp

        //allows:
        // -89 = allow column freeze for comp
        // -91 = allow column freeze for player
        // -93 = allow double column freeze for comp
        // -94 = allow double column freeze for player
        // -95 = allow stacked win for comp
        // -96 = allow stacked win for player
        // -97 = allow double win for comp
        // -98 = allow double win for player
        // -99 = win above for computer
        // -100 = win above for player

        //easy
        else if (Win("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = 100;
            break;
        }
        else if (Win("slot1", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = 99;
        }

        //medium
        else if (difficulty > 0 && WinJustAbove("slot1", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -100;
        }
        else if (difficulty == 1 && WinJustAbove("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -99;
        }

        //hard
        else if (difficulty > 1 && DoubleWin("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = 98;
        }
        else if (difficulty > 1 && DoubleWin("slot1", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = 96;
        }
        else if (difficulty == 2 && ColumnFreeze("slot1", columnIndexToSlotArrayMap[column], "double")){
            columnOptions[column] = 92;
        }
        else if (difficulty == 2 && ColumnFreeze("slot2", columnIndexToSlotArrayMap[column], "double")){
            columnOptions[column] = 91;
        }
        else if (difficulty == 2 && ColumnFreeze("slot1", columnIndexToSlotArrayMap[column], "single")){
            columnOptions[column] = 90;
        }
        else if (difficulty == 2 && ColumnFreeze("slot2", columnIndexToSlotArrayMap[column], "single")){
            columnOptions[column] = 88;
        }
        else if (difficulty == 2 && WinJustAbove("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -99;
        }

        //expert
        else if (difficulty > 2 && AllowDoubleWin("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -97;
        }
        else if (difficulty > 2 && AllowDoubleWin("slot1", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -98;
        }
        else if (difficulty > 2 && TripleWin("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = 97;
        }
        else if (difficulty > 2 && TripleWin("slot1", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = 95;
        }
        else if (difficulty > 2 && StackedWin("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = 94;
        }
        else if (difficulty > 2 && StackedWin("slot1", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = 93;
        }
        else if (difficulty > 2 && AllowStackedWin("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -95;
        }
        else if (difficulty > 2 && AllowStackedWin("slot1", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -96;
        }
        else if (difficulty > 2 && ColumnFreeze("slot1", columnIndexToSlotArrayMap[column], "double")){
            columnOptions[column] = 92;
        }
        else if (difficulty > 2 && ColumnFreeze("slot2", columnIndexToSlotArrayMap[column], "double")){
            columnOptions[column] = 91;
        }
        else if (difficulty > 2 && AllowColumnFreeze("slot2", columnIndexToSlotArrayMap[column], "double")){
            columnOptions[column] = -93;
        }
        else if (difficulty > 2 && AllowColumnFreeze("slot1", columnIndexToSlotArrayMap[column], "double")){
            columnOptions[column] = -94;
        }
        else if (difficulty > 2 && ColumnFreeze("slot1", columnIndexToSlotArrayMap[column], "single")){
            columnOptions[column] = 90;
        }
        else if (difficulty > 2 && ColumnFreeze("slot2", columnIndexToSlotArrayMap[column], "single")){
            columnOptions[column] = 88;
        }
        else if (difficulty > 2 && AllowColumnFreeze("slot2", columnIndexToSlotArrayMap[column], "single")){
            columnOptions[column] = -89;
        }
        else if (difficulty > 2 && AllowColumnFreeze("slot1", columnIndexToSlotArrayMap[column], "single")){
            columnOptions[column] = -91;
        }
        else if (difficulty > 2 && WinJustAbove("slot2", columnIndexToSlotArrayMap[column])){
            columnOptions[column] = -99;
        }
    }
    let bestColumn = FindBestColumn(columnOptions);
    if (columnOptions[bestColumn] == 0){
        columnOptions = AssignRandomValues(columnOptions);
        bestColumn = FindBestColumn(columnOptions);
    }
    console.log("slot2: " + columnOptions);
    console.log("slot2: " + bestColumn);
    return {
        element : columnIndexToSlotArrayMap[bestColumn],
        index : bestColumn + 1
    }
}

function AssignRandomValues(columnOptions){
    for (let column = 0; column <= 6; column++){
        if (columnOptions[column] == 0){
            columnOptions[column] = Math.floor((Math.random()*10));
            if (column < 5 && column > 1){
                columnOptions[column] *= 3;
            }
        }
    }
    return columnOptions;
}

function FindBestColumn(columnOptions){ 

    let bestColumnTest = 0;
    for (let column = 1; column <= 6; column++){
        if (columnOptions[column] > columnOptions[bestColumnTest]){
            bestColumnTest = column;
        }
    }
    return bestColumnTest;
}

function ColumnIsFull(column){
    if (AddTokenIsSuccessful("slot3", column)){
        RemoveToken(column);
        return false;
    }
    return true;
}

function Win(playerID, column){
    if (!AddTokenIsSuccessful(playerID, column)){
        return false;
    }
    if (IsThereAWin(playerID, "test")){
        RemoveToken(column);
        return true;
    }
    RemoveToken(column);
    return false;
}

function WinJustAbove(playerID, column){
    if (!AddTokenIsSuccessful("slot3", column)){
        return false;
    }
    if (Win(playerID, column)){
        RemoveToken(column);
        return true;
    }
    RemoveToken(column);
    return false;
}

function InitialTestForWin(playerID){
    let columns = [0,0,0,0,0,0,0];
    for (let testColumn = 0; testColumn <= 6; testColumn++){
        if (Win(playerID, testColumn)){
            columns[testColumn] = 1;
        }
    }
    return columns;
}

function InitialTestForColumnFreeze(playerID){
    let initialTest = [0,0,0,0,0,0,0];
    let initialTestColumn;
    for (let testColumn = 0; testColumn <= 2; testColumn++){
        initialTestColumn = AddTokensUntilWinJustAbove(playerID, testColumn, initialTest)
        if (initialTestColumn != -1){
            initialTest[initialTestColumn] = 1;
        }
    }
    return initialTest;
}

function DoubleWin(playerID, column){
    let initialTest = InitialTestForWin(playerID);

    if (!AddTokenIsSuccessful(playerID, column)){
        return false;
    }
    for (let testColumn = 0; testColumn <= 6; testColumn++){
        if (initialTest[testColumn] != 0 || !Win(playerID, columnIndexToSlotArrayMap[testColumn])){
            continue;
        }
        if (!AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
            continue;
        }
        for (let testColumn2 = 0; testColumn2 <= 6; testColumn2++){
            if (initialTest[testColumn2] == 0 && Win(playerID, columnIndexToSlotArrayMap[testColumn2])){
                RemoveToken(columnIndexToSlotArrayMap[testColumn]);
                RemoveToken(column);
                return true;
            }
        }
        RemoveToken(columnIndexToSlotArrayMap[testColumn]);
    }
    RemoveToken(column);
    return false;
}

function AllowDoubleWin(playerID, column){
    if (!AddTokenIsSuccessful("slot3", column)){
        return false;
    }
    if (DoubleWin(playerID, column)){
        RemoveToken(column);
        return true;
    }
    RemoveToken(column);
    return false;
}

function StackedWinFinder(playerID, column){
    for (let testColumn = 0; testColumn <= 6; testColumn++){
        if (columnIndexToSlotArrayMap[testColumn] == column){
            continue;
        }
        if (!WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
            continue;
        }
        if (!AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
            continue;
        }
        if (WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
            RemoveToken(columnIndexToSlotArrayMap[testColumn]);
            return true;
        }
        RemoveToken(columnIndexToSlotArrayMap[testColumn]);
    }
    for (let testColumn = 0; testColumn <= 6; testColumn++){
        if (columnIndexToSlotArrayMap[testColumn] == column || !AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
            continue;
        }
        if (!WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
            RemoveToken(columnIndexToSlotArrayMap[testColumn]);
            continue;
        }
        if (!AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
            RemoveToken(columnIndexToSlotArrayMap[testColumn]);
            continue;
        }
        if (WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
            RemoveToken(columnIndexToSlotArrayMap[testColumn]);
            RemoveToken(columnIndexToSlotArrayMap[testColumn]);
            return true;
        }
        RemoveToken(columnIndexToSlotArrayMap[testColumn]);
        RemoveToken(columnIndexToSlotArrayMap[testColumn]);
    }
    return false;
}

function StackedWin(playerID, column){
    if (StackedWinFinder(playerID, column)){
        return false;
    }
    if (!AddTokenIsSuccessful(playerID, column)){
        return false;
    }
    if (StackedWinFinder(playerID, column)){
        RemoveToken(column);
        return true;
    }
    RemoveToken(column);
    return false;
}

function AllowStackedWin(playerID, column){
    if (!AddTokenIsSuccessful("slot3", column)){
        return false;
    }
    if (StackedWin(playerID, column)){
        RemoveToken(column);
        return true;
    }
    RemoveToken(column);
    return false;
}

function TripleWin(playerID, column){
    let initialTest = InitialTestForWin(playerID);

    if (!AddTokenIsSuccessful(playerID, column)){
        return false;
    }
    for (let testColumn = 0; testColumn <= 6; testColumn++){
        if (initialTest[testColumn] == 1 || !Win(playerID, columnIndexToSlotArrayMap[testColumn])
        || !AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){      
            continue;
        }
        for (let testColumn2 = 0; testColumn2 <= 6; testColumn2++){
            if (DoubleWin(playerID, columnIndexToSlotArrayMap[testColumn2])){
                RemoveToken(columnIndexToSlotArrayMap[testColumn]);
                RemoveToken(column);
                return true;
            }
        }
        RemoveToken(columnIndexToSlotArrayMap[testColumn]);
    }
    RemoveToken(column);
    return false;
}

function ColumnFreeze(playerID, column, doubleOrSingle){
    let initialTest = InitialTestForColumnFreeze(playerID);
    if (WinJustAbove("slot2", column)){
        return false;
    }  
    if (!AddTokenIsSuccessful(playerID, column)){
        return false;
    }
    let trueColumn = AddTokensUntilWinJustAbove(playerID, column, initialTest);
    if (trueColumn == -1){
        RemoveToken(column);
        return false;
    }
    if (doubleOrSingle == "single"){
        RemoveToken(column);
        return true;
    }
    if (doubleOrSingle == "double"){
        initialTest[trueColumn] = 1;
        if (AddTokensUntilWinJustAbove(playerID, column, initialTest) != -1){
            RemoveToken(column);
            return true;
        }
    }
    RemoveToken(column);
    return false;
}

function AllowColumnFreeze(playerID, column, doubleOrSingle){
    if (WinJustAbove(playerID, column)){
        return false;
    }
    if (!AddTokenIsSuccessful("slot3", column)){
        return false;
    }
    if (ColumnFreeze(playerID, column, doubleOrSingle)){
        RemoveToken(column);
        return true;
    }
    RemoveToken(column);
    return false;
}

function AddTokenAndCheckForWinJustAbove(playerID, testColumn){
    if (WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
        return true;
    }
    if (!AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
        return false;
    }
    let win = AddTokenAndCheckForWinJustAbove(playerID, testColumn);
    RemoveToken(columnIndexToSlotArrayMap[testColumn]);
    if (win){
        return true;
    }
    return false;
}

function AddTokensUntilWinJustAbove(playerID, column, initialTest){
    for (let testColumn = 0; testColumn <= 6; testColumn++){
        if (columnIndexToSlotArrayMap[testColumn] == column || initialTest[testColumn] == 1){
            continue;
        }
        if (AddTokenAndCheckForWinJustAbove(playerID, testColumn)){
            return testColumn;
        }
    }
    return -1;
}
        
        
//         if (WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
//             return testColumn;
//         }
//         if (!AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
//             continue;
//         }
//         if (WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             return testColumn;
//         }
//         if (!AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             continue;
//         }
//         if (WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             return testColumn;
//         }
//         if (!AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             continue;
//         }
//         if (WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             return testColumn;
//         }
//         if (!AddTokenIsSuccessful("slot3", columnIndexToSlotArrayMap[testColumn])){
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             continue;
//         }
//         if (WinJustAbove(playerID, columnIndexToSlotArrayMap[testColumn])){
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//             return testColumn;
//         }
//         RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//         RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//         RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//         RemoveToken(columnIndexToSlotArrayMap[testColumn]);
//     }
//     return -1;
