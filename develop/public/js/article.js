const backBtn = document.getElementById('back-btn');

backBtn.addEventListener('click', () => {
  const url = localStorage.getItem('previousUrl');
  localStorage.removeItem('previousUrl');
  document.location.replace(url);
});
