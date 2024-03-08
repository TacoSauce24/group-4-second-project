// lea
// public/signup.js
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
  
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Fetch data from the signup form
      const username = document.getElementById('signup-username').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
  
      // Send a signup request to the server
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        // Handle the server response (e.g., redirect on success, display an error message on failure)
        if (response.ok) {
          window.location.href = '/home'; // Redirect to the user's homepage
        } else {
          // Handle signup failure
          const errorData = await response.json();
          console.error(errorData.error);
          // Display an error message to the user
        }
      } catch (error) {
        console.error('An error occurred during signup:', error);
      }
    });
  });

  const signupFormHandler = async (event) => {
    event
  }