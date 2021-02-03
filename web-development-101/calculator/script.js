//Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.

// Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
//Do not worry about wiring up the JS just yet.
//There should also be a display for the calculator, go ahead and fill it with some dummy numbers so you can get it looking right.
//Add a “clear” button.
//Create the functions that populate the display when you click the number buttons… you should be //storing the ‘display value’ in a variable somewhere for use in the next step.

let num1 = null;
let num2 = null;
let op1 = null;
let op2 = null;
let disp = "80085";



const calcWrapper = document.getElementById('calc');
const displayNum = document.getElementById('result');
displayNum.textContent = disp;

calcWrapper.addEventListener('click', (event) => {
    const isButton = event.target.type === 'button';
    if (!isButton) {
        return;
    }
    if (event.target.className == 'number' || event.target.className == 'number-0') {
        if (num1 == null && num2 == null) {
            if (event.target.value != ".") {
                num1 = parseFloat(event.target.value);
                console.log(num1);
                displayNum.textContent = num1;
            } else { // first input is decimal point (.)
                num1 = "0" + event.target.value;
                console.log(num1);
                displayNum.textContent = num1;
            }
        } else if (num1 != null && num2 == null && op1 == null) {
            // adding to first num, num2 and op1 are null
            if (num1.toString().indexOf(".") === -1 && event.target.value == ".") {
                num1 = num1.toString() + ".";

                console.log(num1);
                //num1 = parseFloat(num1);
                displayNum.textContent = num1;
            } else if (num1.toString().indexOf(".") !== -1 && event.target.value == ".") {
                alert('Only 1 decimal point per number please')
            } else {
                num1 = num1.toString() + event.target.value;
                console.log(num1);
                //num1 = parseFloat(num1);
                displayNum.textContent = num1;
                //num1 = parseFloat(num1);
            }
        } else if (num2 == null) // num2 is not populated
        {
            if (event.target.value !== ".") {
                num2 = parseFloat(event.target.value);
                console.log(num2);
                displayNum.textContent = num2;
            } else { // first input is decimal point (.)
                num2 = "0" + event.target.value;
                console.log(num2);
                displayNum.textContent = num2;
            }
        } else if (num1 != null && num2 != null && op1 != null && op2 == null) { // adding to num2
            if (num2.toString().indexOf(".") === -1 && event.target.value == ".") {
                num2 = num2.toString() + ".";
                console.log(num2);
                //num1 = parseFloat(num1);
                displayNum.textContent = num2;
            } else if (num1.toString().indexOf(".") !== -1 && event.target.value == ".") {
                alert('Only 1 decimal point per number please')
            } else {
                num2 = num2.toString() + event.target.value;
                console.log(num2);
                //num2 = parseFloat(num2);
                displayNum.textContent = num2;
            }
        }
    }
    /*   else if (event.target.className == 'operator' && event.target.value !== "=" && op2 === "="){
         op2 = event.target.value;
         num1 = operate(num1, op2, num2)
         console.log('hokay');
         op1 = op2;
         num2 = null;
     } */
    else if (event.target.className == 'operator' && event.target.value !== "=" && op1 !== null && op2 === "=" && num1 !== null && num2 !== null) {
        op2 = event.target.value;
        //num1 = operate(num1, op1, num2)
        console.log('right herrr');
        op1 = op2;
        num2 = null;
        displayNum.textContent = num1;
    } else if (event.target.className == 'operator' && event.target.value !== "=" && op1 !== null && num1 !== null && num2 !== null) {
        op2 = event.target.value;
        num1 = operate(num1, op1, num2)
        console.log('okay');
        op1 = op2;
        num2 = null;
        displayNum.textContent = num1;
    } else if (event.target.className == 'operator' && event.target.value !== "=" && op1 === null) {
        op1 = event.target.value;
        console.log(num1, op1, num2)

        console.log('here');
        //console.log("operator = ", op1);
        if (num2 != null) {
            num2 = null;
        }

    } else if (event.target.value == "=" && (num1 !== null && num2 !== null)) {
        console.log(num1, op1, num2)
        num1 = operate(num1, op1, num2);
        console.log(num1);
        displayNum.textContent = num1;
        op2 = event.target.value;
    } else {
        console.log("u dun messed up somehow");
    }
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
    displayNum.textContent = "";
    console.log('clear');
})

function dis(x) {
    console.log(x);
    let disp = document.getElementById('result')
    disp.textContent = x;
}