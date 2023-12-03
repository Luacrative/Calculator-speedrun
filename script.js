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

    float: () => { 
        float = true;
    },

    add: (first, second) => { 
        return first + second;
    },

    subtract: (first, second) => { 
        return first - second;
    },

    multiply: (first, second) => { 
        return first * second;
    },

    divide: (first, second) => { 
        return first / second;
    },

    mod: (first, second) => {
        return first % second;
    },

    equals: (first, second) => { 
        return first;
    }
}

function display(calculated) { 
    result.textContent = calculated;
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

        if (value == 0) { 
            return truncate(number / Math.pow(10, base - 1), base); 
        } 

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

    if (writeFirst) { 
        writeFirst = false; 
    } else { 
        if (operation && (!flag)) { 
            first = functions[operation](first, first); 
        } else { 
            first = functions[operation](first, second);
        }

        second = 0; 
        display(first);
    }

    operation = input;
}

buttons.forEach((button) => { 
  if (button.classList.contains("special-function")) { 
        button.addEventListener("click", () => functions[button.id]());
    } else if (button.classList.contains("function")) { 
        button.addEventListener("click", () => inputOperation(button.id));
    } else if (button.classList.contains("operand")) {
        const value = parseInt(button.value);
        button.addEventListener("click", () => inputOperand(value));
    } 
});

result.textContent = "0";