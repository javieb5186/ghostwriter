async function signIn(event) {
  event.preventDefault();

  // Get the state of elements
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // If everything looks good, send the data to try to log in. Otherwise display error
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Everything went okay');
    } else {
      alert('Something unexpected happened');
    }
  } else {
    alert('Invalid input');
  }
}

document.getElementById('submit').addEventListener('click', signIn);
