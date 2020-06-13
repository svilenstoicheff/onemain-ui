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

function attachEvents() {
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
        e.target.classList.remove('hidden');
    });

    document.querySelector('#loanPayment').addEventListener('submit', e => {
        validateForm(e);
    });
}

function removeErrors() {
    document.querySelectorAll('div.error').forEach(el => el.remove());
    document.querySelectorAll('h4.error').forEach(el => el.classList.remove('error'));
}

function validateChecking(e) {
    removeErrors();
    let formReady = false;
    const inputs = ['loanAccountNumber', 'routingNumber', 'bankAccountNumber', 'confirmBankAccountNumber'];

    let counter = 0;
    while(counter < inputs.length) {
        formReady = false;
        let el = inputs[counter],
            input = document.querySelector('input[name=' + el + ''),
            error = document.createElement('div'),
            parent = input.parentElement,
            heading4 = parent.querySelector('h4'),
            inputValue = input.value.trim().replace(/ /g, '');

        error.classList.add('error');

        if (inputValue === '') {
            error.innerText = errorMessages[el];
            parent.after(error);
            heading4.classList.add('error');
            break;
        } else if (!Number.isInteger(Number(inputValue))) {
            error.innerText = errorMessages['numbersOnly'];
            parent.after(error);
            heading4.classList.add('error');
            break;
        } else if (el === 'routingNumber' && inputValue.length > 9) {
            error.innerText = errorMessages['routingNumber9'];
            parent.after(error);
            heading4.classList.add('error');
            break;
        } else if (el === 'confirmBankAccountNumber' &&
            inputValue !== document.querySelector('[name=bankAccountNumber]').value) {
            error.innerText = errorMessages['numbersDontMatch'];
            parent.after(error);
            heading4.classList.add('error');
            break;
        } else {
            formReady = true;
        }

        counter++;
    }

    return formReady;
}

function validateDebit(e) {
    removeErrors();

    let formReady = false;
    const inputs = ['loanAccountNumber', 'cardNumber', 'nameOnCard', 'expirationDate', 'cvvNumber'];

    let counter = 0;
    while(counter < inputs.length) {
        formReady = false;
        let el = inputs[counter],
            input = document.querySelector('input[name=' + el + ''),
            error = document.createElement('div'),
            parent = input.parentElement,
            heading4 = parent.querySelector('h4'),
            inputValue = input.value.trim().replace(/ /g, '');

        error.classList.add('error');

        input.classList.remove('hidden');
        if (inputValue === '') {
            error.innerText = errorMessages[el];
            parent.after(error);
            heading4.classList.add('error');
            break;
        } else if (el !== 'nameOnCard' && el !== 'expirationDate' && !Number.isInteger(Number(inputValue))) {
            error.innerText = errorMessages['numbersOnly'];
            parent.after(error);
            heading4.classList.add('error');
            break;
        } else if (el === 'cvvNumber' && inputValue.length < 3) {
            error.innerText = errorMessages['cvvNumber3'];
            parent.after(error);
            heading4.classList.add('error');
            break;
        } else {
            formReady = true;
        }
        counter++;
    }

    return formReady;
}

function validateForm(e) {
    e.preventDefault();
    const formName = e.target.name;
    let formReady = formName === 'checking' ? validateChecking(e) : validateDebit(e);
    if (formReady) e.target.submit();
}

window.addEventListener('DOMContentLoaded', attachEvents);
