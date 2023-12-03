const MAX_DIGITS = 10;

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