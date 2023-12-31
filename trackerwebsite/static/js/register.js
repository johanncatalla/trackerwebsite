const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid_feedback");
const emailField = document.querySelector("#emailfield");
const EmailfeedBackArea = document.querySelector(".EmailFeedBackArea");
const passwordField = document.querySelector("#passwordField")
const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const submitBtn = document.querySelector(".submit-btn")

// Verify on page load if credentials remain in input
if ((usernameField.value.length==0) && (emailField.value.length==0)) {
    submitBtn.disabled = true;
} else {
    submitBtn.removeAttribute('disabled')
}

// Form Validity Status
var usernameIsValid = false;
var emailIsvalid = false;

function verify() {
    if (usernameIsValid && emailIsvalid) {
        submitBtn.removeAttribute('disabled')
    } else {
        submitBtn.disabled = true;
    }
}

const handleToggleInput=(e)=>{
    if (showPasswordToggle.textContent=="SHOW") {
        showPasswordToggle.textContent = "HIDE";
        passwordField.setAttribute("type", "text");
    } else {
        showPasswordToggle.textContent = "SHOW";
        passwordField.setAttribute("type", "password");
    }
}

showPasswordToggle.addEventListener('click', handleToggleInput)

usernameField.addEventListener('keyup', (e) => {
    const usernameVal=e.target.value;
    usernameSuccessOutput.style.display="block";
    
    usernameField.classList.remove("is-invalid");
    feedBackArea.style.display="none";

    if (usernameVal.length>=0) {
        fetch("/authentication/validate-username", {
            body:JSON.stringify({ username: usernameVal }), 
            method: "POST",
        })
            .then(res=>res.json())
            .then((data) => {
                usernameSuccessOutput.style.display="none";
                if (data.username_error){
                    usernameField.classList.add("is-invalid");
                    feedBackArea.style.display="block";
                    feedBackArea.innerHTML=`<p>${data.username_error}<\p>`;
                    usernameIsValid = false;
                    verify();
                } else if (data.length_error) {
                    usernameField.classList.add("is-invalid");
                    feedBackArea.style.display="block";
                    feedBackArea.innerHTML=`<p>${data.length_error}<\p>`;
                    usernameIsValid = false;
                    verify();
                } else {
                    usernameIsValid = true;
                    verify();
                }
            });
    }
});

emailField.addEventListener('keyup', (e) => {
    const emailVal=e.target.value;
    
    emailField.classList.remove("is-invalid");
    EmailfeedBackArea.style.display="none";

    if (emailVal.length>=0) {
        fetch("/authentication/validate-email", {
            body:JSON.stringify({ email: emailVal }), 
            method: "POST",
        })
            .then(res=>res.json())
            .then((data) => {
                console.log("data", data);
                if (data.email_error){
                    emailField.classList.add("is-invalid");
                    EmailfeedBackArea.style.display="block";
                    EmailfeedBackArea.innerHTML=`<p>${data.email_error}<\p>`
                    emailIsvalid = false;
                    verify()
                } else if (data.length_error) {
                    emailField.classList.add("is-invalid");
                    EmailfeedBackArea.style.display="block";
                    EmailfeedBackArea.innerHTML=`<p>${data.length_error}<\p>`;
                    emailIsvalid = false;
                    verify();
                } else {
                    emailIsvalid = true;
                    verify()
                }
            });
    }
});