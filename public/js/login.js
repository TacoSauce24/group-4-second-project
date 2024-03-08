// public/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login2');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Fetch data from the login form
      const email = document.getElementById('email-login').value;
      const password = document.getElementById('password-login').value;
  
      // Send a login request to the server
      try {
        const response = await fetch('/login', {
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
    });
  });
  