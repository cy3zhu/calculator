function add(a, b){
    return Number(a) + Number(b)
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    return a/b
}

function operate(a,b, operator){
    test('calculating: ')
    if(operator === '') {
        return 'Operator empty'
    }else{
        return operator(a,b)
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
    console.log(`input1 = ${input1} | input2 = ${input2} | operator = ${operator.name ? operator.name : ''} | lastPress = ${lastPress} isFirstInput = ${isFirstInput}`)
}

function toggleInput(){
    isFirstInput = !isFirstInput
    console.log(`isFirstInput changed to = ${isFirstInput}`)
}

function appendInput(value){
    if(isFirstInput){
        input1 += value
    }else{
        input2 += value
    }
}

function replaceInput(value){
    if(isFirstInput){
        input1 = value
    }else{
        input2 = value
    }
}

function currentInputZero(){
    return isFirstInput ? input1 === '0' : input2 === '0'
}

function updateDisplay(value, method = 'append'){
    if(method === 'replace'){
        return display.textContent = String(value)
    }else if(method === 'append'){
        return display.textContent += value;
    }
    console.log('updateDisplay failed')
}

//Event Listeners
const calculator = document.querySelector('.calc-container')
calculator.addEventListener('click', (event) => {
    if(event.target.classList[0] === 'display') return;
    
    if(event.target.classList[0] === 'number'){
        return numberPress(event.target.textContent)
    }
    switch(event.target.id){
        case 'clear':
            allClear();
            break;
        case 'add':
            operatorPress(event.target.id)
        break;
        case 'subtract':
            operatorPress(event.target.id)
        break;
        case 'divide':
            operatorPress(event.target.id)
        break;
        case 'multiply':
            operatorPress(event.target.id)
        break;
        case 'equals':
            equalPress()
        break;
        default:
            console.log('error: unidentified button')
            break;
    }
})

//Event Handlers

function allClear(){
    updateDisplay(0, 'replace');
    input1 = '0';
    input2 = '0';
    operator = '';
    isFirstInput = true;
}

function numberPress(buttonText){
    test(`NUMBER PRESSED: ${buttonText}`);
    let buttonNumber = buttonText
    if(currentInputZero() || lastPress === 'operator'){
        updateDisplay(buttonNumber, 'replace');
        replaceInput(buttonNumber);
    }else{
        updateDisplay(buttonNumber, 'append')
        appendInput(buttonNumber)
    }
    lastPress = 'number'
    test(`After number pressed:`);
}

function operatorPress(operatorID){
    test(`OPERATOR PRESSED: ${operatorID}`);
    if(!isFirstInput && lastPress === 'number'){
        let result = operate(input1,input2,operator);
        input1 = result;
        updateDisplay(result, 'replace');
    }
    isFirstInput = false;
    operator = window[operatorID]
    lastPress = 'operator'
    test(`AFTER OPERATOR PRESSED:`);
}

function equalPress(){
    test(`EQUALS PRESSED`);
    if(lastPress === 'operator'){
        input2 = input1;
    }
    let result = operate(input1,input2,operator);
    input1 = result
    updateDisplay(result, 'replace');
    isFirstInput = true;
    lastPress = 'equals'
    test(`AFTER EQUALS PRESSED:`);
}