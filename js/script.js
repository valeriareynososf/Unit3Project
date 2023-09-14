const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const cardNumberInput = document.querySelector('#cc-num');
const zipInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');
const form = document.querySelector('form');
const jobRole = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
const design = document.querySelector("#design");
const color = document.querySelector("#color");
const activities = document.querySelector("#activities");
const activitiesBox = document.querySelector("#activities-box");
const checkboxes = document.querySelectorAll('#activities-box input[type="checkbox"]');
const activitiesCost = document.querySelector("#activities-cost");
const paymentSelection = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");
const activitiesHint = document.querySelector('#activities-hint');

nameInput.focus()
const colors = color.children;
let totalCost = 0;
otherJobRole.type ="hidden"
paypal.style.display = "none"
bitcoin.style.display = "none"
color.setAttribute("disabled", true);
paymentSelection.children[1].setAttribute('selected', true);

jobRole.addEventListener('change', (e)=>{
    if (e.target.value === "other") {
        otherJobRole.type ="text"
    } else {
        otherJobRole.type ="hidden"
    }
})


design.addEventListener('change', (e)=>{
    color.removeAttribute("disabled");

    for (const color of colors) { 
        const value = e.target.value;
        const theme = color.getAttribute('data-theme')
        
        if (value === theme) {
        color.removeAttribute("disabled");
        color.setAttribute('selected', true);
        } else {
            color.setAttribute("disabled", true);
            color.removeAttribute('selected');
        }
    }
   
})

activities.addEventListener('change', (e)=>{

       const value = +e.target.getAttribute('data-cost');
       const dateValue = e.target.getAttribute('data-day-and-time');

       if ( e.target.checked ) {
        totalCost += value

        for (const checkbox of checkboxes) { 
            const checkboxDate = checkbox.getAttribute('data-day-and-time');
            if (checkbox !== e.target && dateValue === checkboxDate) {
                checkbox.setAttribute("disabled", true);
                checkbox.parentNode.classList.add('disabled')
            }
        }
       } else {
        totalCost -= value

        for (const checkbox of checkboxes) { 
            const checkboxDate = checkbox.getAttribute('data-day-and-time');
            if (checkbox !== e.target && dateValue === checkboxDate) {
                checkbox.removeAttribute("disabled");
                checkbox.parentNode.classList.remove('disabled')
            }
        }
       
       }

 activitiesCost.innerHTML = `Total: $${totalCost}`;
 activitiesValidator()
})


paymentSelection.addEventListener('change', (e)=>{

    const value = e.target.value;
    switch (value) {
        case 'paypal':
            paypal.style.display = "block";
            bitcoin.style.display = "none";
            creditCard.style.display = "none";
            break;
        case 'bitcoin':
            bitcoin.style.display = "block";
            paypal.style.display = "none";
            creditCard.style.display = "none";
            break;
        case 'credit-card':
            creditCard.style.display = "block";
            paypal.style.display = "none";
            bitcoin.style.display = "none";
            break;
      }
})

//storing orignal error messages
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

// validates name
const nameValidator = () => {
    const isValid = /^[a-zA-Z]+/.test(nameInput.value);
    validationErrors(isValid, nameInput);

return isValid;
}

// validates email
const emailValidator = () => {
    const isValid = /^[^@]+@[^@.]+\.[a-zA-Z]+$/i.test(emailInput.value);

    validationErrors(isValid, emailInput);

    return isValid;
    }

    // validates activites
const activitiesValidator = () => {
    const isValid = Array.from(checkboxes).some(checkbox => checkbox.checked);

    validationErrors(isValid, activitiesBox);

    return isValid;
     }

// validates zip code
const zipValidator = () => {
    if (paymentSelection.value !== "credit-card") return true;
   //  The "Zip code" field must contain a 5-digit number
   const isValid = /\b(\d{5})\b/.test(zipInput.value);

   validationErrors(isValid, zipInput);

   return isValid;
    }
 
// validates cvv 
const cvvValidator = () => {
    if (paymentSelection.value !== "credit-card") return true;
    // The "CVV" field must contain a 3-digit number
    const isValid = /\b(\d{3})\b/.test(cvvInput.value);
    
    validationErrors(isValid, cvvInput);
 
    return isValid;
     }
         
// validates credit card number
const ccValidator = () => {
    if (paymentSelection.value !== "credit-card") return true;

    //The "Card number" must contain a 13 - 16 digits without dashes or spaces
    const isNumValid = /\b(\d{13,16})\b/.test(cardNumberInput.value);

    validationErrors(isNumValid, cardNumberInput);
      
    return isNumValid

        }


form.addEventListener('submit', (e)=>{

    const isValidName = nameValidator()
    const isValidEmail = emailValidator()
    const isValidActivities = activitiesValidator()
    const isValidCC = ccValidator()
    const isValidZip = zipValidator()
    const isValidCVV = cvvValidator()

    if (!isValidName || !isValidEmail || !isValidActivities || !isValidCC || !isValidZip || !isValidCVV) {
        e.preventDefault();
    }
})

const createListener = (validator) => {
return e => {
    const text = e.target.value;
    validator(text);
}
}

nameInput.addEventListener("keyup", createListener(nameValidator));
emailInput.addEventListener("keyup", createListener(emailValidator));
cardNumberInput.addEventListener("keyup", createListener(ccValidator));
zipInput.addEventListener("keyup", createListener(zipValidator));
cvvInput.addEventListener("keyup", createListener(cvvValidator));


for (const checkbox of checkboxes) { 

checkbox.addEventListener('focus', () => {
checkbox.parentElement.classList.add('focus')
})

checkbox.addEventListener('blur', () => {
    checkbox.parentElement.classList.remove('focus')
})

}


    