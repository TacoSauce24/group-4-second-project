// lea
// public/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Fetch data from the login form
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Send a login request to the server
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        // Handle the server response (e.g., redirect on success, display an error message on failure)
        if (response.ok) {
          window.location.href = '/home'; // Redirect to the user's homepage
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
  