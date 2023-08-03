const deleteBtn2 = document.getElementById('delete-btn-2');
const errorMessageLogout = document.getElementById('errorMessage-logout');

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    // alert(response.statusText);
    errorMessageLogout.classList.remove('is-hidden');
  }
};

document.querySelector('#logout').addEventListener('click', logout);

deleteBtn2.addEventListener('click', () => {
  errorMessageLogout.classList.add('is-hidden');
});
