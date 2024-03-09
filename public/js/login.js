// public/login.js
document.addEventListener('DOMContentLoaded', () => {

  const loginFormHandler = async (event) => {
    event.preventDefault();

    // Fetch data from the login form
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    // Send a login request to the server
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle the server response (e.g., redirect on success, display an error message on failure)
      if (response.ok) {
        window.location.href = '/'; // Redirect to the user's homepage
      } else {
        // Handle login failure
        const errorData = await response.json();
        console.error(errorData.error);
        // Display an error message to the user
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  }

  const signupFormHandler = async (event) => {
    event.preventDefault();

    // Fetch data from the signup form
    const name = document.querySelector('#name-signup').value;
    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;

    // Send a signup request to the server
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      // Handle the server response (e.g., redirect on success, display an error message on failure)
      if (response.ok) {
        window.location.href = '/'; // Redirect to the user's homepage
        alert("you have been signed up!");
      } else {
        // Handle signup failure
        const errorData = await response.json();
        console.error(errorData.error);
        alert("an error has occurred during signup, please try again");
        // Display an error message to the user
      }

    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  }

  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
});
  