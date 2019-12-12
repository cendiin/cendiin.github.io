function setup(){
    window.operatorUsed = false
    window.decimalUsed = false
    }

function sqrt(){
    let value = document.getElementById("text-field").value
    value = Math.sqrt(value)
    console.log(value)
    if (Object.is(value, NaN)){
        //checks if value is a number and does nothing if it is
    } else {
        document.getElementById("text-field").value = value
    }
}

function equals() {
    const operations = [
    {'^': (a, b) => Math.pow(a, b)}, // a map of operators
    {'*': (a, b) => (a * b)}, 
    {'/': (a, b) => (a / b)},
    {'+': (a, b) => (a + b)},
    {'-': (a, b) => (a - b)}
    ]
    const value = document.getElementById("text-field").value
    let lastString = value[value.length - 1]
    //reg exp splits string into array of numbers and operator strings to output to string parser
    // | seperates individual operators, \ escapes to use the operator as a string, the final '+' looks for continous characters
    let split = value.split(/(\/|\*|\+|\-|\^)+/)
    let calculation = []
    let calculationStack = []
    let newCalc = 0
    currentOperation = null

    split.forEach(function(i){ // parses string into numbers and operator strings array [3,"/",3]    
        if (i == '*' || i == '/' || i == '-' || i == '+' || i == '^'){
            calculation.push(i)
            } else {
                let multTen = parseFloat(i) * 10// multiplies by 10 to fix floating points
                calculation.push(multTen);
            }
    })
    console.log(calculation)
    if (calculation.length <= 1 || lastString == '^' || lastString == '*' || lastString == '/' || lastString == '+' || lastString == '-'){
        //document.getElementById("text-field").value = value
    }   else {
        let prevOperatorPos = 0
        operations.forEach(function(i){
            calculation.forEach(function(j,operatorPos){
                if (Object.keys(i) == j) {
                    if (j == '*' || j == '/'){
                        prevOperatorPos = operatorPos
                    }
                    //map function to variable
                        currentOperation = Object.values(i)[0]
                    if (calculationStack.length < 1){
                        calculationStack[0] = currentOperation(calculation[operatorPos-1], calculation[operatorPos+1])
                        console.log('previousPos+nextPos')
                    }   else if ((calculationStack.length >= 1) && (operatorPos < prevOperatorPos)){
                        calculationStack[0] = currentOperation(calculation[operatorPos-1], calculationStack[0])
                        console.log('prevpos+stack')                        
                    }  else if ((calculationStack.length >= 1) && (operatorPos > prevOperatorPos)){
                        calculationStack[0] = currentOperation(calculationStack[0], calculation[operatorPos+1])
                        console.log('stack+nextPos') 
                }
            }
        })
    })
    if (value.includes('.')){
        document.getElementById("text-field").value = calculationStack[0] / 10 // divides by ten to fix floating points
        decimalUsed = true   
    }   else {
            document.getElementById("text-field").value = calculationStack[0] / 10 // divides by ten to fix floating points
    }      
    }
}

function deleteOne() {
    let value = document.getElementById("text-field").value
    let lastString = value[value.length - 1]
    if (lastString == '^' || lastString == '-' || lastString == '+' || lastString == '*' || lastString == '/'){
        operatorUsed = false
        if (decimalUsed == false){ //after deleting an operator checks the decimalUsed flag and keeps the state so that another decimal
            decimalUsed = false    //can or cannot be used again
        } else if (decimal == true) {
            decimalUsed = true
        }
    }
    if (lastString == '.'){
        decimalUsed = false
    }
    if (document.getElementById("text-field").value.length == 1 || document.getElementById("text-field").value == '0'){
        document.getElementById("text-field").value = '0';
    } else {
        document.getElementById("text-field").value = document.getElementById("text-field").value.substring(0, document.getElementById("text-field").value.length - 1)
    }
}

function clearScreen() {
    operatorUsed = false
    decimalUsed = false
    document.getElementById("text-field").value = '0';
}

function buttons(str){
    let operatorStr = str.includes('^') || str.includes('-') || str.includes('+') || str.includes('/') || str.includes('*') 
    let value = document.getElementById("text-field").value
    let lastString = value[value.length - 1]

    // //used to flag if an operator was used to limit multiple decimals on the same number
    if (str == '*' || str == '/' || str == '+' || str == '-' || str == '^'){
        operatorUsed = true
        decimalUsed = false
    }
    if ((lastString == ('^') || lastString == ('-') || lastString == ('+') || lastString == ('*') || lastString == ('/')) && (operatorStr)) {
        //doesnt allow multiple operators in a row when last string matches
    }   else if (lastString == '.' && str == '.'){
            //doesnt allow multiple decimals in a row when last string matches
        }
        else if ((str == '.' && decimalUsed == false) || (str == '.' && decimalUsed == false && operatorUsed == true )){
            //doesnt allow multiple decimals in the same number
            document.getElementById("text-field").value += str;
            decimalUsed = true
        }
        else if (document.getElementById("text-field").value == '0'){
            //replaces default 0 with integers
            document.getElementById("text-field").value = '';
            document.getElementById("text-field").value += str;
        }
        else if (str !== '.') {
             //allows numbers only
            document.getElementById("text-field").value += str;
        }
}

