let holdingShift = false;

const numberInputs = {"0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9}

const functionInputs = { 
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
    if (input.key in numberInputs) 
        inputOperand(numberInputs[input.key]);
    else if (input.key === "Shift")
        holdingShift = true;
    else if (input.key in functionInputs) { 
        if (functionInputs[input.key][1] && !holdingShift) return;

        inputOperation(functionInputs[input.key][0]);
    }
});

document.body.addEventListener("keyup", (input) => {
    if (input.key === "Shift") 
        holdingShift = false;
})