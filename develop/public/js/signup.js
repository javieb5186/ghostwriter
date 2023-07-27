async function createEmail(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  //  https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B)*%24%2F.

  if (validEmail) {
    const response = await fetch(`/api/users/signup/${email}`, {
      method: 'GET',
    });
    const res = await response.json();
    const data = await res;

    if (!data.emailExists) {
      await localStorage.setItem('e', email);
      document.location.replace('/aboutyou');
    } else {
      alert('User already exits');
    }
  }
}

document.getElementById('submit').addEventListener('click', createEmail);
