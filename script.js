const result = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let first = 0;
let second = 0;
let float = false;
let writeFirst = true; 
let writeOperand = false;
let operation; 

const functions = { 
    ac: () => { 
        first = 0; 
        second = 0; 
        float = false; 
        writeFirst = true; 
        writeOperand = false;
        operation = undefined; 

        display(0); 
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

const display = calculated => {result.textContent = truncate(calculated, MAX_DIGITS)};
const truncate = (number, base) => Math.round(number * Math.pow(10, base)) / Math.pow(10, base);
const isFloat = number => (number * 10) % 10 != 0;
const getDigits = number => { 
    let digits = 0; 

    while (number > 0) {
        number = Math.floor(number / 10);
        digits++;
    }

    return digits; 
}

const setOperand = (number, value) => { 
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

const inputOperand = value => { 
    if (getDigits(first) == MAX_DIGITS || getDigits(second) == MAX_DIGITS) return;

    writeOperand = true;

    if (writeFirst) { 
        first = setOperand(first, value); 
        display(first);
    } else { 
        second = setOperand(second, value); 
        display(second); 
    }
}

const inputOperation = input => { 
    const wroteOperand = writeOperand;

    writeOperand = false; 

    if (writeFirst) 
        writeFirst = false; 
    else { 
        if (operation && (!wroteOperand)) 
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

result.textContent = "0";