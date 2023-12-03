const result = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let first = 0;
let second = 0;
let float = false;
let writeFirst = true; 
let writeOperand = false;
let operation; 

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
    "Enter": ["equals", false]
}

const functions = { 
    ac: () => { 
        first = 0; 
        second = 0; 
        float = false; 
        writeFirst = true; 
        writeOperand = false;
        operation = undefined; 

        display(0); // Hoisted
    },
    
    sign: () => { 
        if (writeFirst || (!writeOperand)) { 
            first *= -1; 
            display(first); 
        } else { 
            second *= -1; 
            display(second);
        }
    },

    float: () => float = true,

    add: (first, second) => first + second, 
    subtract: (first, second) => first - second, 
    multiply: (first, second) => first * second,
    divide: (first, second) => first / second,
    mod: (first, second) => first % second,
    equals: (first) => first
}

function display(calculated) { 
    result.textContent = truncate(calculated, 12);
}

function truncate(number, base) { 
    return Math.round(number * Math.pow(10, base)) / Math.pow(10, base);
}

function isFloat(number) { 
    return (number * 10) % 10 != 0;
}

function getDigits(number) { 
    let digits = 0; 

    while (number > 0) {
        number = Math.floor(number / 10);
        digits++;
    }

    return digits; 
}

function setOperand(number, value) { 
    if (float) { 
        let base = 1; 

        while (isFloat(number)) { 
            number *= 10; 
            base++; 
        }

        if (value == 0)  
            return truncate(number / Math.pow(10, base - 1), base); 
        else 
            return truncate(((number * 10) + value) / Math.pow(10, base), base);
    }

    return (number * 10) + value;
}

function inputOperand(value) { 
    if (getDigits(first) == 9 || getDigits(second) == 9) return;

    writeOperand = true;

    if (writeFirst) { 
        first = setOperand(first, value); 
        display(first);
    } else { 
        second = setOperand(second, value); 
        display(second); 
    }
}

function inputOperation(input) { 
    const flag = writeOperand;

    writeOperand = false; 
    float = false;

    if (writeFirst) 
        writeFirst = false; 
    else { 
        if (operation && (!flag)) 
            first = functions[operation](first, first); 
        else 
            first = functions[operation](first, second);

        second = 0; 
        display(first);
    }

    operation = input;
}

buttons.forEach((button) => { 
    if (button.classList.contains("special-function")) 
        button.addEventListener("click", () => functions[button.id]());
    else if (button.classList.contains("function")) 
        button.addEventListener("click", () => inputOperation(button.id));
    else if (button.classList.contains("operand")) {
        const value = parseInt(button.value);
        button.addEventListener("click", () => inputOperand(value));
    } 
});

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

result.textContent = "0";