let holdingShift = false;

document.body.addEventListener("keydown", (input) => { 
    if (input.key in operandInputs) 
        inputOperand(operandInputs[input.key]);
    else if (input.key === "Shift")
        holdingShift = true;
    else if (input.key in operatorInputs) { 
        // Check if holdingShift matches the input's shift requirement
        if (operatorInputs[input.key][1] && !holdingShift) return; 

        inputOperation(operatorInputs[input.key][0]);
    }
});

document.body.addEventListener("keyup", (input) => {
    if (input.key != "Shift") return;

    holdingShift = false;
})