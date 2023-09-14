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
const checkboxes = document.querySelectorAll('#activities-box input[type="checkbox"]');
const activitiesCost = document.querySelector("#activities-cost");
const paymentSelection = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");


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

    for (let i = 0; i < colors.length; i++) {
        const value = e.target.value;
        const theme = colors[i].getAttribute('data-theme')
        
        if (value === theme) {
        colors[i].removeAttribute("disabled");
        colors[i].setAttribute('selected', true);
        } else {
            colors[i].setAttribute("disabled", true);
            colors[i].removeAttribute('selected');
        }
    }
   
})

activities.addEventListener('change', (e)=>{

       const value = +e.target.getAttribute('data-cost');

       if ( e.target.checked ) {
        totalCost += value
       } else {
        totalCost -= value
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

const nameValidator = () => {
return /^[a-zA-Z]+/.test(nameInput.value)
}

const emailValidator = () => {
    return /^[^@]+@[^@.]+\.[a-zA-Z]+$/i.test(emailInput.value)
    }

const activitiesValidator = () => {
    const checked = Array.from(checkboxes).some(checkbox => checkbox.checked)
    console.log("checkboxes", checked)

    return checked;
     }

const ccValidator = () => {
  
    if (paymentSelection.value == "credit-card") {
    //The "Card number" must contain a 13 - 16 digits without dashes or spaces
        const isNumValid = /\b(\d{13,16})\b/.test(cardNumberInput.value);

//  The "Zip code" field must contain a 5-digit number
const isZipValid = /\b(\d{5})\b/.test(zipInput.value);
// The "CVV" field must contain a 3-digit number
const isCVValid = /\b(\d{3})\b/.test(cvvInput.value);

        return (isNumValid && isZipValid && isCVValid)
    } else return true;

        }


form.addEventListener('submit', (e)=>{
  
    e.preventDefault()
    

    const isValidName = nameValidator()
    const isValidEmail = emailValidator()
    const isValidActivities = activitiesValidator()
    const isValidCC = ccValidator()
    //const valid = /^[a-zA-Z ]+/.test(nameValue)
    // const valid = /^[a-z]+$/.test(nameValue)
    // console.log("isValidActivities",isValidActivities)
    // console.log("isValidName",isValidName)
    // console.log("isValidEmai",isValidEmail)
    // console.log("iisValidCC", isValidCC)
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

nameInput.addEventListener("input", createListener(nameValidator))