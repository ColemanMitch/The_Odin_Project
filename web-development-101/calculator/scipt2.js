let num1 = null;
let num2 = null;
let op1 = null;
let op2 = null;
let disp = "0";
let negDisplay = false;
/*

TO DO:

figure out negative sign
rounding the display number
percentage sign

*/

const calcWrapper = document.getElementById('calc');
const displayNum = document.getElementById('result');
displayNum.textContent = disp;


calcWrapper.addEventListener('click', (event) => {
    const isButton = event.target.type === 'button';
    if (!isButton) {
        return;
    }
    if (event.target.className == 'number' || event.target.className == 'number-0') {
        if (num1 !== null && num2 !== null && op1 !== null && op2 === "=") {
            num1 = null;
            num2 = null;
            op1 = null;
            op2 = null;
        }

        if (num1 === null) { // start populating num1

            if (event.target.value !== ".") { // check if first input was a decimal
                num1 = parseFloat(event.target.value);
                console.log("i hate bugz!");
                displayNum.textContent = num1;
                
            } else { // if first input is decimal point (.)
                num1 = "0" + event.target.value;
                console.log(num1);
                displayNum.textContent = num1;


            }
        } else if (num1 !== null && num2 === null && op1 === null) {
            // adding to first num, num2 and op1 are null
            if (num1.toString().indexOf(".") === -1 && event.target.value == ".") { // if there's no decimal and the input is a decimal
                num1 = num1.toString() + ".";
                displayNum.textContent = num1
                


            } else if (num1.toString().indexOf(".") !== -1 && event.target.value == ".") { // if there is a decimal and the input is a decimal
                alert('Only 1 decimal point per number please')
            } else {
                num1 = num1.toString() + event.target.value; // otherwise for numerical input
                console.log(num1);
                displayNum.textContent = num1;

            }
        } else if (num1 !== null && num2 === null) { // start populating num2  
            if (event.target.value !== ".") {
                num2 = parseFloat(event.target.value);
                displayNum.textContent = num2;
            } else { // first input is decimal point (.)
                num2 = "0" + event.target.value;
                displayNum.textContent = num2;
            }
        } else if (num1 != null && num2 != null && op1 != null) {
            if (num2.toString().indexOf(".") === -1 && event.target.value === ".") {
                num2 = num2.toString() + ".";
                console.log(num2);
                displayNum.textContent = num2;
            } else if (num1.toString().indexOf(".") !== -1 && event.target.value == ".") {
                alert('Only 1 decimal point per number please');
            } else {
                num2 = num2.toString() + event.target.value;
                console.log(num2);
                displayNum.textContent = num2;
            }
        }
        /* 
    else if (event.target.value === "+/-") {
        if (displayNum.textContent[0] === "-") {
            console.log('negative to positive');
            negDisplay = false;
            displayNum.textContent = displayNum.textContent.substring(1);
            if (num1 !== null && num2 === null) {
                num1 *= -1;
            }
            else if (num1 !== null && num2 !== null) {
                num1 *= -1;
                num2 = null;
            }
        } else {
            console.log('positive to negative');
            negDisplay = true;
            displayNum.textContent = "-" + displayNum.textContent;
            if (num1 !== null && num2 === null) { 
                num1*=-1;
            }

        }
    }
*/
    } else if (event.target.className === 'operator') {

        if (op1 === null && event.target.value === "=") { // user tries to enter equals sign before clicking on another operator
            alert("Please select an operator before clicking equals");
        } else if (op1 === null && event.target.value !== "=") { // set first non-equals sign operator to op1
            op1 = event.target.value;
            console.log(op1);
        } else if ((op1 !== '=' && op1 !== null) && op2 === '=' && event.target.value === "=") { // repeat op1 if the user continues to press equals
            //console.log('hokay so');
            //console.log(num1, op1, num2, op2);
            num1 = operate(num1, op1, num2);
            console.log(num1, op1, num2, op2);
            displayNum.textContent = num1;

            //console.log(op1);
        } else if (op1 !== null && op2 === null && event.target.value !== "=") { // first instance of 
            op2 = event.target.value;
            num1 = operate(num1, op1, num2);
            displayNum.textContent = num1;
            console.log('hokay');
            console.log(num1, op1, num2, op2);
            num2 = null;
            op1 = op2
            //op1 = op2;
            op2 = null;
            //console.log(op1);
        } else if (num1 !== null && op1 !== null && num2 !== null && op2 === "=" && event.target.value !== "=") {
            op2 = event.target.value;
            //num1 = operate(num1, op1, num2)
            console.log('right herrr');
            op1 = op2;
            op2 = null;
            num2 = null;
            displayNum.textContent = num1;
        } else if (num1 !== null && op1 !== null && num2 !== null && op2 === null && event.target.value === "=") { // perform calculation
            console.log(num1, op1, num2);
            num1 = operate(num1, op1, num2);
            displayNum.textContent = num1;
            //num2 = null;
            op2 = event.target.value;
        }
    } else if (event.target.value === "%") {
        if (num1 !== null && num2 === null) {
            num1/=100;
            displayNum.textContent = num1
        }
        else {
            num2/=100;
            displayNum.textContent = num2;
        }
    } else {
        console.log("u dun messed up somehow");

    }
    //displayNum.textContent = parseFloat(displayNum.textContent)

})


function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate(a, operator, b) {
    switch (operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "x":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        default:
            console.log('poopy');
    }
}



//clear button
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', (event) => {
    const isButton = event.target.type === 'button';
    if (!isButton) {
        return;
    }
    num1 = null;
    num2 = null;
    op1 = null;
    op2 = null;
    negDisplay = false;
    displayNum.textContent = "0";
    console.log('clear');
})