const name = document.querySelector('#name').focus();
const jobRole = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
const design = document.querySelector("#design");
const color = document.querySelector("#color");
const activities = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
const paymentSelection = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");
const colors = color.children;
let totalCost = 0;
otherJobRole.type ="hidden"
paypal.style.display = "none"
bitcoin.style.display = "none"
jobRole.addEventListener('change', (e)=>{
    if (e.target.value === "other") {
        otherJobRole.type ="text"
    } else {
        otherJobRole.type ="hidden"
    }
})


color.setAttribute("disabled", true);

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

paymentSelection.children[1].setAttribute('selected', true);
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
