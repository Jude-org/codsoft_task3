const displayElement = document.getElementById("display");

function addToDisplay(value){
    displayElement.value += value;
};

function clearDisplay(){
    displayElement.value = "";

}

function deleteNum(){
    const currentDisplay = displayElement.value;
    displayElement.value = currentDisplay.slice(0, -1);
};

//calculate expressions
function equalEval() {
    const currentState = displayElement.value;
    console.log('Attempting to evaluate:', currentState);
    try {
        const replaceDivision = currentState.replace(/÷/g, '/');
        const result = new Function('return ' + replaceDivision)();
        displayElement.value = result;

    } catch (error) {
        console.error('Error : ', error);
        displayElement.value = "Invalid expression";
    }
}  

// Limit display input to only operators and numbers
displayElement.addEventListener('input', function (event) {
    const currentValue = event.target.value;
    const cleanValue = currentValue.replace(/[^0-9+\-*/.]/g, '');
    event.target.value = cleanValue;
});

// Use enter key as equal
displayElement.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        equalEval();
    }
});


function main(){
    const buttons = document.querySelectorAll('.calcButton');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.value;
            const isLastCharOperator = /[+\-*/.]$/.test(displayElement.value);

            if (isLastCharOperator && /[+\-*/.]/.test(buttonText)) {  //check if last char is an operator
                return;
            }

            if (buttonText == "DE"){
                deleteNum();
                
            } else if (buttonText === "AC"){
                clearDisplay();

            }else if (buttonText === "=") {
                equalEval();

            }else {
                addToDisplay(buttonText);
            }
        });
    });
    }

main();
