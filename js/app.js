// switch sign in && sign up
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => container.classList.add("sign-up-mode"));
sign_in_btn.addEventListener('click', () => container.classList.remove("sign-up-mode"));

// stop default reload when click button
function handleSubmit(event) {
    event.preventDefault();
}

// store sign up user input in variables..
const userName = document.getElementById("userName");
const mail = document.getElementById("email");
const Password = document.getElementById("inputPassword");

// store sign-in variables
const signInUser = document.getElementById("signInUser");
const signInPassword = document.getElementById("signInPassword");

// validation
const nameValidation = /^([A-Z])[a-zA-Z ]{2,25}$/;
const emailValidation = /^[a-zA-Z][a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z]{3,5}$/;
const passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// create global arr store all user accounts
const allUsers = JSON.parse(localStorage.getItem('users')) || [];

// main function for sign up
function mainFunction() {
    getUsers();
    clearForm();
}

// main function for sign in
function loginFunction() {
    login();
}

// create function to clear data 
function clearForm() {
    userName.value = "";
    mail.value = "";
    Password.value = "";
}

// create function store user input values in object and push it into arr
function getUsers() {
    const user = {
        name: userName.value,
        email: mail.value,
        password: Password.value
    };
      //check if empty 
    if (userName.value === '' && mail.value === '' && Password.value === '') {
        document.getElementById("emptyId").style.display = "block";
        hideOtherMessages("emptyName", "emptyEmail", "emptyPassword", "success", "exist", "invalidUserOrPassword");
        // if user name invalid
    } else if (userName.value !== '' && !nameValidation.test(userName.value)) {
        document.getElementById("emptyName").style.display = "block";
        hideOtherMessages("emptyId", "emptyEmail", "emptyPassword", "success", "exist", "invalidUserOrPassword");
        // if email invalid
    } else if (mail.value !== '' && !emailValidation.test(mail.value)) {
        document.getElementById("emptyEmail").style.display = "block";
        hideOtherMessages("emptyId", "emptyName", "emptyPassword", "success", "exist", "invalidUserOrPassword");
        // if password invalid
    } else if (Password.value !== '' && !passwordValidation.test(Password.value)) {
        document.getElementById("emptyPassword").style.display = "block";
        hideOtherMessages("emptyId", "emptyName", "emptyEmail", "success", "exist", "invalidUserOrPassword");
        // if user already exist
    } else if (userName.value !== '' && mail.value !== '' && Password.value !== '') {
        const emailExists = allUsers.some(user => user.email === mail.value);

        if (emailExists) {
            document.getElementById("exist").style.display = "block";
            hideOtherMessages("success", "emptyPassword", "emptyEmail", "emptyName", "emptyId", "invalidUserOrPassword");
        } else {
            document.getElementById("success").style.display = "block";
            hideOtherMessages("exist", "emptyPassword", "emptyEmail", "emptyName", "emptyId", "invalidUserOrPassword");

            allUsers.push(user);
            localStorage.setItem('users', JSON.stringify(allUsers));
        }
    }
}


// login in function
function login() {
    const matchUser = allUsers.find(user => user.email === signInUser.value && user.password === signInPassword.value);

    if (matchUser) {
        document.getElementById("invalidUserOrPassword").style.display = "none";
        window.location.href = "./home.html";
    } else {
        document.getElementById("invalidUserOrPassword").style.display = "block";
    }
}

function hideOtherMessages(...messageIds) {
    messageIds.forEach(id => document.getElementById(id).style.display = "none");
}
