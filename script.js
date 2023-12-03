const result = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let first = 0;
let second = 0;
let writeFirst = true; 

const functions = { 
    // TODO: Table for special functions 
}

function showResult(calculated) { 
    result.textContent = calculated;
}

function writeOperand(number, value) { 
    return (number * 10) + value;
}

function inputOperand(value) { 
    if (writeFirst) { 
        first = writeOperand(first, value); 
        showResult(first);
    } else { 
        second = writeOperand(second, value); 
        showResult(second); 
    }
}

function inputOperation(input) { 

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