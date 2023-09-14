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


    console.log("dateValue:", dateValue)
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

const validationErrors = (isValid, elementInput) => {
    if (!isValid) {
        elementInput.parentElement.classList.add('not-valid');
        elementInput.parentElement.classList.remove('valid');
        elementInput.parentElement.lastElementChild.style.display = "block";
    } else {
        elementInput.parentElement.classList.add('valid');
        elementInput.parentElement.classList.remove('not-valid');
        elementInput.parentElement.lastElementChild.style.display = "none";
    }
};

const nameValidator = () => {
    const isValid = /^[a-zA-Z]+/.test(nameInput.value);
    validationErrors(isValid, nameInput);

return isValid;
}

const emailValidator = () => {
    const isValid = /^[^@]+@[^@.]+\.[a-zA-Z]+$/i.test(emailInput.value);

    validationErrors(isValid, emailInput);

    return isValid;
    }

const activitiesValidator = () => {
    const isValid = Array.from(checkboxes).some(checkbox => checkbox.checked);

    validationErrors(isValid, activitiesBox);

    return isValid;
     }

const ccValidator = () => {
  
    if (paymentSelection.value == "credit-card") {
        //The "Card number" must contain a 13 - 16 digits without dashes or spaces
        const isNumValid = /\b(\d{13,16})\b/.test(cardNumberInput.value);

        //  The "Zip code" field must contain a 5-digit number
        const isZipValid = /\b(\d{5})\b/.test(zipInput.value);

        // The "CVV" field must contain a 3-digit number
        const isCVValid = /\b(\d{3})\b/.test(cvvInput.value);

        validationErrors(isNumValid, cardNumberInput);
        validationErrors(isZipValid, zipInput);
        validationErrors(isCVValid, cvvInput);
      

        return (isNumValid && isZipValid && isCVValid)
    } else return true;

        }


form.addEventListener('submit', (e)=>{
   // e.preventDefault();
    const isValidName = nameValidator()
    const isValidEmail = emailValidator()
    const isValidActivities = activitiesValidator()
    const isValidCC = ccValidator()

    if (!isValidName || !isValidEmail || !isValidActivities || !isValidCC) {
        e.preventDefault();
    }
})

const createListener = (validator) => {
return e => {
    const text = e.target.value;
    const valid = validator(text);
    // console.log("text",text)
    // console.log("valid",valid)
}
}

nameInput.addEventListener("keyup", createListener(nameValidator));
emailInput.addEventListener("keyup", createListener(emailValidator));


for (const checkbox of checkboxes) { 

checkbox.addEventListener('focus', () => {
checkbox.parentElement.classList.add('focus')
})

checkbox.addEventListener('blur', () => {
    checkbox.parentElement.classList.remove('focus')
})

}


    