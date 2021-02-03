let num1 = null;
let num2 = null;
let op1 = null;
let op2 = null;
let disp = "0";
let num1Neg = false;
let num2Neg = false;

/*

TO DO:

--decimals--
--figure out negative sign--
--rounding the display number--
--percentage sign--
keyboard support

*/

const calcWrapper = document.getElementById('calc');
const displayNum = document.getElementById('result');
const clearBtn = document.getElementById('clear');
displayNum.textContent = disp;

document.body.addEventListener('keydown', function(event) {
    console.log(event.key);
    console.log(event.code);
    if ('0123456789.'.includes(event.key)) {
        console.log('digit');
    }
    else if ('+-/*'.includes(event.key)) {
        console.log('operator');
    }
    else if (event.code === 'KeyC'){
        num1 = null;
        num2 = null;
        op1 = null;
        op2 = null;
        num1Neg = false;
        num2Neg = false;
        displayNum.textContent = "0";
        clearBtn.textContent = "AC";
        console.log('clear');
    }
});


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
            num1Neg = false;
            num2Neg = false;
        }

        if (op1 === null) {
            if (num1 === null) {
                if (event.target.value !== ".") { // check if first input was a decimal
                    num1 = event.target.value;
                    num1 = num1Neg ? "-" + Math.abs(num1) : Math.abs(num1);
                    displayNum.textContent = num1;
                    console.log(num1);

                } else { // if first input is decimal point (.)
                    num1 = "0" + event.target.value;
                    num1 = num1Neg ? "-0." : "0.";
                    console.log(num1);
                    displayNum.textContent = num1;
                }



            } else {
                if (num1.toString().indexOf(".") === -1 && event.target.value == ".") { // if there's no decimal and the input is a decimal
                    console.log('add decimal');
                    num1 = num1.toString() + ".";
                    num1 = num1Neg ? (Math.abs(num1) * -1)+"." : Math.abs(num1) + ".";
                    displayNum.textContent = num1;
                } else if (num1.toString().indexOf(".") !== -1 && event.target.value == ".") { // if there is a decimal and the input is a decimal
                    alert('Only 1 decimal point per number please')
                } else {
                    num1 = num1.toString() + (event.target.value.toString());
                    if (num1.toString()[0] === '-' && !num1Neg) // if it's no longer negative and the sign is negative
                    {
                        num1 = num1.toString.substring(1);
                    }
                    else if (num1.toString().indexOf("-") === -1 && num1Neg)
                    {
                        num1 =  '-' + num1;
                    }
                    
                    
                    console.log(num1);
                    
                    displayNum.textContent = num1;
                    console.log(num1);
                }
            }
        } else {
            if (num2 === null) {
                if (event.target.value !== ".") { // check if first input was a decimal
                    num2 = event.target.value;
                    num2 = num2Neg ? "-" + Math.abs(num2) : Math.abs(num2);
                    displayNum.textContent = num2;
                    console.log(num2);

                } else { // if first input is decimal point (.)
                    num2 = "0" + event.target.value;
                    num2 = num2Neg ? "-0." : "0.";
                    console.log(num2);
                    displayNum.textContent = num2;
                }
                //num2 = num2Neg ? Math.abs(num2) * -1 : Math.abs(num2);
                //displayNum.textContent = num2;
                //console.log(num2);
            } else {
                /* console.log('bug here?')
                num2 = num2.toString() + (event.target.value);
                num2 = num2Neg ? Math.abs(num2) * -1 : Math.abs(num2);
                displayNum.textContent = num2;
                console.log(num2); */

                if (num2.toString().indexOf(".") === -1 && event.target.value === ".") {
                    num2 = num2.toString() + ".";
                    console.log(num2);
                    num2 = num2Neg ? (Math.abs(num2) * -1)+"." : Math.abs(num2) + ".";
                    displayNum.textContent = num2;
                } else if (num1.toString().indexOf(".") !== -1 && event.target.value == ".") {
                    alert('Only 1 decimal point per number please');
                } else {
                    num2 = num2.toString() + event.target.value;
                    if (num2.toString()[0] === '-' && !num2Neg) // if it's no longer negative and the sign is negative
                    {
                        num2 = num2.toString.substring(1);
                    }
                    else if (num2.toString().indexOf("-") === -1 && num2Neg)
                    {
                        num2 =  '-' + num2;
                    }


                    console.log(num2);
                    displayNum.textContent = num2;
                }

            }

        }


    } else if (event.target.className == 'operator') {
        if (num1 === null) {
            return;
        } else {

            if (op2 === "=" || num2 === null) {
                op1 = event.target.value;
                num2 = null;
                op2 = null;
                console.log(num1, op1, num2, op2);
            } else if (num1 !== null && op1 === null) {
                op1 = event.target.value;
                console.log(num1, op1, num2, op2);
            } else if (op1 !== null && op2 === null) {
                op2 = event.target.value;
                console.log('here?');
                console.log(num1, op1, num2, op2);
                num1 = operate(num1, op1, num2);
                displayNum.textContent = num1;
                op1 = op2;
                op2 = null;
                num2 = null;
                console.log(num1);
                console.log(num1, op1, num2, op2);


            }
        }
    } else if (event.target.className == 'equals') {
        if (op1 === null) {
            alert('yo, enter an operator first before hitting equals');
        }
        if (num1 !== null && op1 !== null && num2 != null) {
            num1 = operate(num1, op1, num2);
            displayNum.textContent = displayNumber(num1);
            op2 = "=";
            console.log(num1, op1, num2, op2);
            num1Neg = num1 > 0 ? false: true;
        }
    } else if (event.target.value === "%") {
        console.log('take a percentage');
        if (num1 !== null && num2 === null) {
            num1/=100;
            num1 = num1Neg ? (Math.abs(num1) * -1) : Math.abs(num1);
            displayNum.textContent = displayNumber(num1);
        }
        else if (num1 !== null && num2 !== null && op2 === null) {
            num2/=100;
            num2 = num2Neg ? (Math.abs(num2) * -1) : Math.abs(num2);
            displayNum.textContent = displayNumber(num2);
        }
        else {
            num1/=100;
            num1 = num1Neg ? (Math.abs(num1) * -1) : Math.abs(num1);
            ddisplayNum.textContent = displayNumber(num1);
        }

    } else if (event.target.value === "+/-") {
        console.log('change the sign');
        if (num1 === null) { //first input: if num1 is null
            num1Neg = !num1Neg;
            displayNum.textContent = num1Neg ? "-0": "0";

            //displayNum.textContent = "-" + displayNum.textContent;
        }

        if (num1 !== null && op1 === null && num2 === null) { // num1 null null null
            num1Neg = !num1Neg;
            console.log('num1 null null null');
            if (num1Neg) {

                displayNum.textContent = "-" + displayNum.textContent;
                num1 = num1Neg ? Math.abs(num1) * -1 : Math.abs(num1);

            } else {
                displayNum.textContent = displayNum.textContent.substring(1);
                num1 = num1Neg ? Math.abs(num1) * -1 : Math.abs(num1);
            }
        } else if (num2 !== null && op2 === null) { // num1 op1 num2 null
            console.log('change the sign for the second numeral');
            num2Neg = !num2Neg;
            if (num2Neg) {

                displayNum.textContent = "-" + displayNum.textContent;
                num2 = num2Neg ? Math.abs(num2) * -1 : Math.abs(num2);

            } else {
                displayNum.textContent = displayNum.textContent.substring(1);
                num2 = num2Neg ? Math.abs(num2) * -1 : Math.abs(num2);
            }
        } else if (num1 !== null && op1 !== null && num2 === null) { // num1 null null null
            {
                num2Neg = !num2Neg
                if (num2Neg) {
                    displayNum.textContent = "-0";
                } else {
                    displayNum.textContent = "0";
                }
            }
        } else if (num1 !== null && op1 !== null && num2 !== null && op2 === "=") {
            console.log('changing sign on first numeral: num1 op1 num2 =');
            //num2Neg = false;
            num1Neg = !num1Neg;
            num1 = num1Neg ? Math.abs(num1) * -1 : Math.abs(num1);
            displayNum.textContent = displayNumber(num1);

        }

    } else {
        // console.log("u dun messed up somehow");

    }
    if (num1 !== null) {
        clearBtn.textContent = "C";
        console.log()
    }
    else {
        clearBtn.textContent = "AC";
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

function displayNumber (number) {
    if (Math.abs(number) > Math.abs(1e8)){
        console.log('large boy');
        number = number.toExponential(6);
        //number = parseFloat(number).toFixed(6);
        number = removeZeroes(number);
        console.log(number);
        return number;
    }
    else if (Math.abs(number) < Math.abs(1e-8)) {
        console.log('smöl boy');
        number = number.toExponential(6);
        //number = parseFloat(number).toFixed(6);
        number = removeZeroes(number);
        console.log(number);
        return number;
    }
    else{
        console.log(number);
        //number.toFixed(6)
        return number;
    }
}

function removeZeroes(number) {
    return number.replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1");
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
    num1Neg = false;
    num2Neg = false;
    displayNum.textContent = "0";
    console.log('clear');
})