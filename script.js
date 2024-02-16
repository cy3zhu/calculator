function add(a, b){
    return String(Number(a) + Number(b))
}

function subtract(a, b){
    return String(Number(a) - Number(b))
}

function multiply(a, b){
    return String(Number(a) * Number(b))
}

function divide(a, b){
    return String(Number(a)/Number(b))
}

function operate(a,b, operator){
    //test(`CALCULATING ${operator.name}`)
    if(operator === '') {
        return 'Operator empty'
    }else if(operator.name === 'divide' && b == '0'){
        alert('don\'t divide by 0 dingus, clear your values')
        return operator(a,b)
    }else{
        return roundResult(operator(a,b))
    }
}

let isFirstInput = true;
let replace = true;
let input1 = '0'
let input2 = '0'
let operator = ''
let lastPress = ''
const display = document.querySelector('.display')

//Helper functions
function test(message = ''){
    console.log(`-------------${message}`)
    console.log(`input1 = ${input1} | input2 = ${input2} | operator = ${operator.name ? operator.name : ''} | lastPress = ${lastPress} isFirstInput = ${isFirstInput} types: 1: ${typeof(input1)} 2: ${typeof(input2)}`)
}

function appendInput(value){
    if(isFirstInput){
        input1 += String(value)
    }else{
        input2 += String(value)
    }
}

function replaceInput(value){
    if(isFirstInput){
        input1 = String(value)
    }else{
        input2 = String(value)
    }
}

function getCurrentInput(){
    return isFirstInput? input1 : input2
}

function checkLimitReached(string){
    return string.includes('.') ? string.length > 9 : string.length > 8
}

function updateDisplay(value, method = 'append'){
    if(method === 'replace'){
        return display.textContent = String(value)
    }else if(method === 'append'){
        return display.textContent += value;
    }
    console.log('updateDisplay failed')
}

function roundResult(number){
    number = Number(number)

    //if more than 9 digits or more than 8 decimals
    if(Math.abs(number) > 999999999 || !((Math.abs(number)*1e+8 % 1) === 0)){
        return String(number.toExponential(4))
    }else{
        return String(number)
    }
}

function validateResult(number){
    if(Math.abs(number) > 9.999e+99 || Math.abs(number) < 1.000e-99){
        alert('Error - too many digits')
        allClear()
        return false
    }else{
        return true
    }
    
}

//Event Listeners
const calculator = document.querySelector('.calc-container')
calculator.addEventListener('click', (event) => {
    if(event.target.classList[0] === 'display') return;
    
    switch(event.target.id){
        case 'zero':
        case 'one':
        case 'two':
        case 'three':
        case 'four':
        case 'five':
        case 'six':
        case 'seven':
        case 'eight':
        case 'nine':
            numberPress(event.target.textContent)
            break;
        case 'add':
        case 'subtract':
        case 'divide':
        case 'multiply':
            operatorPress(event.target.id)
            break;
        case 'equals':
            equalPress()
            break;
        case 'decimal':
            decimalPress();
            break;
        case 'percent':
            percentagePress();
            break;
        case 'sign':
            signPress()
            break;
        case 'all-clear':
            allClear();
            break;
        default:
            //console.log(`ERROR: unidentified button ${event.target}`)
            break;
    }
})

//Event Handlers
function allClear(){
    updateDisplay('0', 'replace');
    input1 = '0';
    input2 = '0';
    operator = '';
    isFirstInput = true;
    lastPress = ''
}

function numberPress(buttonText){
    //test(`NUMBER PRESSED: ${buttonText}`);
    let buttonNumber = buttonText
    if(getCurrentInput() === '0' || lastPress === 'operator' || lastPress === 'equals'){
        updateDisplay(buttonNumber, 'replace');
        replaceInput(buttonNumber);
    }else if(!checkLimitReached(getCurrentInput())){
        updateDisplay(buttonNumber, 'append')
        appendInput(buttonNumber)
    }
    lastPress = 'number'
    //test(`After number pressed:`);
}

function operatorPress(operatorID){
    //test(`OPERATOR PRESSED: ${operatorID}`);
    if(!isFirstInput && lastPress === 'number'){
        let result = operate(input1,input2,operator);
        if(!validateResult(result)) return
        input1 = result;
        updateDisplay(result, 'replace');
    }
    isFirstInput = false;
    operator = window[operatorID]
    lastPress = 'operator'
    //test(`AFTER OPERATOR PRESSED:`);
}

function equalPress(){
    //test(`EQUALS PRESSED`);
    if(lastPress === 'operator'){
        input2 = input1;
    }
    let result = operate(input1,input2,operator);
    if(validateResult(result)){
        input1 = result
        updateDisplay(result, 'replace');
        isFirstInput = true;
        lastPress = 'equals'
    }
    //test(`AFTER EQUALS PRESSED:`);
}

function decimalPress(){
    if(!getCurrentInput().includes('.')){
        appendInput('.')
        updateDisplay('.', 'append')
    }
}

function percentagePress(){
    let percentage = operate(getCurrentInput(),'100',divide)
    if(validateResult(percentage)){
        replaceInput(percentage)
        updateDisplay(percentage, 'replace')
    }
}

function signPress(){
    getCurrentInput().startsWith('-') ?  replaceInput(getCurrentInput().slice(1)) : replaceInput(`-${getCurrentInput()}`)
    updateDisplay(getCurrentInput(),'replace')
    //test('Sign Pressed')
}