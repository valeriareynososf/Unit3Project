const name = document.querySelector('#name').focus();
const jobRole = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
const design = document.querySelector("#design");
const color = document.querySelector("#color");
const colors = color.children;
otherJobRole.type ="hidden"

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
    console.log("SELECTED",e.target)
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
