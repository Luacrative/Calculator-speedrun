const result = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let first = 0;
let second = 0;
let writeFirst = true; 
let operation; 

const functions = { 
    add: (first, second) => { 
        return first + second;
    },

    subtract: (first, second) => { 
        return first - second;
    },

    multiply: (first, second) => { 
        return first * second;
    }
}

function display(calculated) { 
    result.textContent = calculated;
}

function writeOperand(number, value) { 
    return (number * 10) + value;
}

function inputOperand(value) { 
    if (writeFirst) { 
        first = writeOperand(first, value); 
        display(first);
    } else { 
        second = writeOperand(second, value); 
        display(second); 
    }
}

function inputOperation(input) { 
    if (writeFirst) { 
        writeFirst = false; 
    } else { 
        if (operation) { 
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