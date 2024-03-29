const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      alert('successfully logged out');
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('button.logout').addEventListener('click', logout);