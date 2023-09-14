# Form Validation
**Form fields have real time validation and conditional error messages**

1. Real-Time Error Messages
    Fields listen for a keyup interaction from user and helper functions are passed to validate the input values.
    ```
    nameInput.addEventListener("keyup", createListener(nameValidator));
    emailInput.addEventListener("keyup", createListener(emailValidator));
    cardNumberInput.addEventListener("keyup", createListener(ccValidator));
    zipInput.addEventListener("keyup", createListener(zipValidator));
    cvvInput.addEventListener("keyup", createListener(cvvValidator));

    ```
    The Activities Field used a change event and the activites validator function was passed to validate with every change.

    ```
    activities.addEventListener('change', (e)=>{

       . . . .
    activitiesValidator()
    })

    ```
2. Conditional Error Message
    Error messages provide additional information on type of error.
    
    The validationErrors function changes the error message based on the error. The original error messages were stored in a dataset in order to be used conditionally.

    ```
    const emailHint = document.querySelector('#email-hint')
    emailHint.setAttribute("data-error", emailHint.textContent);

    const ccNumHint = document.querySelector('#cc-hint')
    ccNumHint.setAttribute("data-error", ccNumHint.textContent);

    const zipHint = document.querySelector('#zip-hint')
    zipHint.setAttribute("data-error", zipHint.textContent);

    const cvvHint = document.querySelector('#cvv-hint')
    cvvHint.setAttribute("data-error", cvvHint.textContent);


    const validationErrors = (isValid, elementInput) => {
        const element = elementInput.parentElement.lastElementChild;

    const elementId = elementInput.id === 'email' ? 'Email' : 
                    elementInput.id === 'cc-num' ? 'Credit card number':
                    elementInput.id === 'zip' ? 'Zip Code': 'CVV';

    if (elementInput.id !== 'activities-box' && elementInput.id !== 'name' && !elementInput.value.trim()) {

        element.textContent = `${elementId} field cannot be blank`;
        element.style.display = "block";
        elementInput.parentElement.classList.add('not-valid');
    } else if (!isValid) {
        
        elementInput.parentElement.classList.add('not-valid');
        elementInput.parentElement.classList.remove('valid');
        element.dataset.error ? element.textContent = element.dataset.error : null;
        element.style.display = "block";
    } else {
        elementInput.parentElement.classList.add('valid');
        elementInput.parentElement.classList.remove('not-valid');
        element.style.display = "none";
    }
    };
    ```

