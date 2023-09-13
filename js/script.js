console.log("test");
const name = document.querySelector('#name').focus();
const jobRole = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
otherJobRole.type ="hidden"
console.log("jobRole :",jobRole.value);
jobRole.addEventListener('change', (e)=>{
    if (e.target.value === "other") {
        console.log("e",e.target.value);
        otherJobRole.type ="text"
    } else {
        console.log("NO",e.target.value);
        otherJobRole.type ="hidden"
    }
    console.log("e",e.target.value);
})