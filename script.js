const result = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let first = 0;
let second = 0;
let writeFirst = true; 
let writeOperand = false;
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

function setOperand(number, value) { 
    return (number * 10) + value;
}

function inputOperand(value) { 
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