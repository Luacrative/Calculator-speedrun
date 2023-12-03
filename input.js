let holdingShift = false;

const operandInputs = {
    "0": 0, 
    "1": 1, 
    "2": 2, 
    "3": 3, 
    "4": 4, 
    "5": 5, 
    "6": 6, 
    "7": 7, 
    "8": 8, 
    "9": 9
}

const operatorInputs = { 
    ".": ["float", false],
    "-": ["subtract", false],
    "+": ["add", true],
    "8": ["multiply", true],
    "/": ["divide", false],
    "5": ["mod", true],
    "c": ["ac", false],
    "Enter": ["equals", false],
    "=": ["equals", false]
}

document.body.addEventListener("keydown", (input) => { 
    if (input.key in operandInputs) 
        inputOperand(operandInputs[input.key]);
    else if (input.key === "Shift")
        holdingShift = true;
    else if (input.key in operatorInputs) { 
        if (operatorInputs[input.key][1] && !holdingShift) return;

        inputOperation(operatorInputs[input.key][0]);
    }
});

document.body.addEventListener("keyup", (input) => {
    if (input.key != "Shift") return;

    holdingShift = false;
})