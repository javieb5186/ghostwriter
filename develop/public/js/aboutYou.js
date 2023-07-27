const profileIcon = document.getElementById('profile-icon');

async function createAccount(event) {
  event.preventDefault();

  const profileIconSrc = profileIcon.src;
  const email = localStorage.getItem('e');
  const n = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  const validName = /^\w{3,25}$/.test(n);
  let samePassword;

  if (password === confirmPassword) {
    samePassword = true;
  } else {
    samePassword = false;
  }

  if (validName && samePassword) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        n,
        email,
        password,
        profileIconSrc,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Account Created');
    } else {
      alert('Internal Error');
    }
  } else {
    alert('Invalid input');
  }
}

function changeProfileIcon(event) {
  if (event.target.src) {
    profileIcon.src = event.target.src;
  }
}

if (localStorage.getItem('e') === null) {
  document.location.replace('/signup');
} else {
  document.getElementById('submit').addEventListener('click', createAccount);
  document.getElementById('icons').addEventListener('click', changeProfileIcon);
}
