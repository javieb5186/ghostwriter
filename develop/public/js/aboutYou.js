const profileIcon = document.getElementById('profile-icon');

async function createAccount(event) {
  event.preventDefault();

  // Get the state of elements
  const profileIconSrc = profileIcon.src;
  const email = localStorage.getItem('e');
  const n = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();

  const deleteBtn = document.getElementById('delete-btn');
  const deleteBtn2 = document.getElementById('delete-btn-2');
  const errorMessage = document.getElementById('errorMessage');
  const errorMessageInternal = document.getElementById('errorMessage-us');

  // delete buttons for error message
  deleteBtn.addEventListener('click', () => {
    errorMessage.classList.add('is-hidden');
  });
  deleteBtn2.addEventListener('click', () => {
    errorMessageInternal.classList.add('is-hidden');
  });

  // Test the name
  const validName = /^\w{3,25}$/.test(n);

  // Doubles checks the password they have entered
  let samePassword;
  if (password === confirmPassword) {
    samePassword = true;
  } else {
    samePassword = false;
  }

  // If everything looks good, send the data to create the user.
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
      document.location.replace('/preferences');
    } else {
      // alert('Internal Error');
      errorMessageInternal.classList.remove('is-hidden');
    }
  } else {
    // alert('Invalid input');
    errorMessage.classList.remove('is-hidden');
  }
}

// Changes profile icon to any profile icon selected
function changeProfileIcon(event) {
  if (event.target.src) {
    profileIcon.src = event.target.src;
  }
}

// If email not saved, direct back to signup. Otherwise continue on.
if (localStorage.getItem('e') === null) {
  document.location.replace('/signup');
} else {
  document.getElementById('submit').addEventListener('click', createAccount);
  document.getElementById('icons').addEventListener('click', changeProfileIcon);
}
