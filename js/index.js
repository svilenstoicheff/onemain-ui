const errorMessages = {
    loanAccountNumber: 'Loan Account Number is required', 
    routingNumber: 'Routing Number is required',
    bankAccountNumber: 'Bank Account Number is required', 
    confirmBankAccountNumber: 'Confirm Bank Account Number is required',
    numbersDontMatch: 'Bank Account numbers don\'t match', 
    cardNumber: 'Card Number is required', 
    nameOnCard: 'Name on card is required', 
    expirationDate: 'Expiration Date is required', 
    cvvNumber: 'CVV Number is required', 
    cvvNumber3: 'CVV number has 3 digits',
    numbersOnly: 'This field should contain numbers only', 
    routingNumber9: 'The routing number cannot be longer than 9 digits',
    numbersDontMatch: 'The bank account numbers don\'t match'
}

function attachEvents () {
    document.querySelector('#paymentDebit').addEventListener('click', e => {
        removeErrors();
        document.querySelector('#loanPayment').name = 'debit';
        document.querySelectorAll('.checking').forEach(el => {
            el.classList.add('hidden');
        });
        document.querySelectorAll('.debit').forEach(el => {
            el.classList.remove('hidden');
        });
    });

    document.querySelector('#paymentChecking').addEventListener('click', e => {
        removeErrors();
        document.querySelector('#loanPayment').name = 'checking';
        document.querySelectorAll('.checking').forEach(el => {
            el.classList.remove('hidden');
        });
        document.querySelectorAll('.debit').forEach(el => {
            el.classList.add('hidden');
        });
    });

    document.querySelector('label.expirationDate').addEventListener('click', e => {
        console.log(e.target);
        e.target.classList.remove('hidden');
    });

    document.querySelector('#loanPayment').addEventListener('submit', e => {
        validateForm(e);
    });
}

function removeErrors() {
    document.querySelectorAll('.error').forEach(el => el.remove());
}

function validateChecking (e) {
    removeErrors();
    let formReady = false;
    const inputs = ['loanAccountNumber', 'routingNumber', 'bankAccountNumber', 'confirmBankAccountNumber'];
    inputs.forEach(el => {
        formReady = false;
        let input = document.querySelector('input[name='+ el +'');
        let error = document.createElement('div');
        error.classList.add('error');
        let inputValue = input.value.trim().replace(/ /g,'');
        
        if( inputValue === '') {
            error.innerText = errorMessages[el];
            input.parentElement.after(error);
        } else if (!Number.isInteger(Number(inputValue))) {
            error.innerText = errorMessages['numbersOnly'];
            input.parentElement.after(error);
        } else if(el === 'routingNumber' && inputValue.length > 9) {
            error.innerText = errorMessages['routingNumber9'];
            input.parentElement.after(error);
        } else if (el === 'confirmBankAccountNumber' && 
            inputValue !== document.querySelector('[name=bankAccountNumber]').value) {
            error.innerText = errorMessages['numbersDontMatch'];
            input.parentElement.after(error);
        } else {
            formReady = true;
        }
    });
    return formReady;
}

function validateDebit (e) {
    removeErrors();
    let formReady = false;
    const inputs = ['loanAccountNumber', 'cardNumber', 'nameOnCard', 'expirationDate', 'cvvNumber'];
    inputs.forEach(el => {
        formReady = false;
        let input = document.querySelector('input[name='+ el +'');
        let error = document.createElement('div');
        error.classList.add('error');
        let inputValue = input.value.trim().replace(/ /g,'');
        input.classList.remove('hidden');
        if(inputValue === '') {
            error.innerText = errorMessages[el];

            if(el === 'cvvNumber' || el === 'expirationDate') {
                input.parentElement.after(error);
            } else {
                input.parentElement.after(error);
            }


        } else if (el !== 'nameOnCard' && !Number.isInteger(Number(inputValue))) {
            error.innerText = errorMessages['numbersOnly'];
            input.parentElement.after(error);
        } else if(el === 'cvvNumber' && inputValue.length < 3) {
            error.innerText = errorMessages['cvvNumber3'];
            input.parentElement.after(error);
        } else {
            formReady = true;
        }
    });
    return formReady;
}

function validateForm(e) {
    e.preventDefault();
    const formName = e.target.name;
    let formReady = formName === 'checking'? validateChecking(e) : validateDebit(e);
    console.log('formReady', formReady);
    if(formReady) e.target.submit();
}

window.addEventListener('DOMContentLoaded', attachEvents);
//document.querySelector('body').addEventListener('load', attachEvents);
