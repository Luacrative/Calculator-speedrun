const result = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

const functions = { 
    // TODO: Table for special functions 
}

function inputOperand(value) { 

}

function inputoperation(input) { 
    
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