document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    const email = document.getElementById("email");

    const password = document.getElementById("password");

    const showPassword =
        document.getElementById("showPassword");

    const message =
        document.getElementById("loginMessage");

    const returnHome =
    document.getElementById("returnHome");

    /* PASSWORD SHOW / HIDE */

    showPassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            showPassword.textContent = "HIDE";

        } else {

            password.type = "password";

            showPassword.textContent = "SHOW";

        }

    });


    /* LOGIN */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        if (
            email.value.trim() === "" ||
            password.value.trim() === ""
        ) {

            message.textContent =
                "> ERROR: ALL FIELDS REQUIRED";

            return;

        }


        message.textContent =
            "> AUTHENTICATING...";


        setTimeout(() => {

            message.textContent =
                "> ACCESS REQUEST SENT ✓";

            returnHome.classList.add("show");

        }, 1200);

    });

});