async function createAccount(event) {
  event.preventDefault();

  const n = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const p = document.getElementById('preferences').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  //  https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B)*%24%2F.
  const validName = /^\w{3,25}$/.test(n);
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  const samePassword = password.includes(confirmPassword);

  if (validName && validEmail && validEmail && samePassword) {
    const prefObj = {
      preferences: p,
    };
    const pref = JSON.stringify(prefObj);
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        n,
        email,
        password,
        pref,
      }),
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

document.getElementById('submit').addEventListener('click', createAccount);
