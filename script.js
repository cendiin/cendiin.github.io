function setup(){
    window.operatorUsed = true
    }

function sqrt(){
    value = document.getElementById("text-field").value
    document.getElementById("text-field").value = Math.sqrt(value)
    
}

function equals() {
    const operations = [
    {'^': (a, b) => Math.pow(a, b)},
    {'*': (a, b) => a * b}, 
    {'/': (a, b) => a / b},
    {'+': (a, b) => a + b}, 
    {'-': (a, b) => a - b}
    ]
    const value = document.getElementById("text-field").value
    //reg exp splits string into array of numbers and operator strings to output to string parser
    // | seperates individual operators, \ escapes to use the operator as a string, the final '+' looks for continous characters
    let split = value.split(/(\/|\*|\+|\-|\^)+/)
    let calculation = []
    let calculationStack = []
    let newCalc = 0
    currentOperation = null

    // parses string into numbers and operator strings array [3,"/",3]
    split.forEach(function(i){     
        if (i == '*' || i == '/' || i == '-' || i == '+' || i == '^'){
            calculation.push(i)
            } else {
                calculation.push(parseFloat(i));
            }
    })

    console.log(calculation)

    operations.forEach(function(i){
        calculation.forEach(function(j){
             if (Object.keys(i) == j) {
                //map function to variable
                currentOperation = Object.values(i)[0]
                if (calculationStack.length < 1){
                    calculationStack[0] = currentOperation(calculation[calculation.indexOf(j)-1], calculation[calculation.indexOf(j)+1])
                }
                else if (calculationStack.length >= 1){
                    calculationStack[0] = currentOperation(calculationStack[0], calculation[calculation.indexOf(j)+1])
                }
                else {
                    calculationStack[0] = currentOperation(calculation[calculation.indexOf(j)-1], calculationStack[0])
                }
              }
        })
    })
    console.log(calculation)
    if (calculation == NaN){
        document.getElementById("text-field").value = 0
    }
    else {
        document.getElementById("text-field").value = calculationStack[0]
    }
}

function deleteOne() {
    if (document.getElementById("text-field").value.length == 1 || document.getElementById("text-field").value == '0'){
        document.getElementById("text-field").value = '0';
    }
    else {
        document.getElementById("text-field").value = document.getElementById("text-field").value.substring(0, document.getElementById("text-field").value.length - 1)
    }
}

function clearScreen() {
    document.getElementById("text-field").value = '0';
}

function buttons(str){
    let operatorStr = str.includes('^') || str.includes('-') || str.includes('+') || str.includes('/') || str.includes('*') 
    let value = document.getElementById("text-field").value
    let lastString = value[value.length - 1]

    //used to flag if an operator was used to limit multiple decimals on the same number
    if (str == '*' || str == '/' || str == '+' || str == '-' || str == '^'){
        operatorUsed = true
    }
    //doesnt allow multiple operators in a row
    if ((lastString == ('^') || lastString == ('-') || lastString == ('+') || lastString == ('*') || lastString == ('/')) && (operatorStr)) {
    }
    //doesnt allow multiple decimals in a row
    else if (lastString == '.' && str == '.'){
    }
    //doesnt allow multiple decimals in the same number
    else if (str == '.' && operatorUsed == false){
    }
    //if an operator is used lets a decimal be added to the string and sets the flag false to block another decimal
    else if (str == '.' && operatorUsed == true) {
        document.getElementById("text-field").value += str;
        operatorUsed = false
    }
    //replaces 0 with integers
    else if (document.getElementById("text-field").value == '0'){
        document.getElementById("text-field").value = '';
        document.getElementById("text-field").value += str;
    }
    else {
        document.getElementById("text-field").value += str;
    }
}

