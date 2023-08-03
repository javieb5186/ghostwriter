const tabs = document.querySelectorAll('.tablinks');
const url = document.location.href;
const nameIndex = url.lastIndexOf('/');
const testName = url.slice(nameIndex + 1, url.length);

const deleteBtn = document.getElementById('delete-btn');
const errorMessage = document.getElementById('errorMessage');

tabs.forEach((tab) => {
  const tabName = tab.children[0].innerText.replace(' ', '');
  if (tabName === testName) {
    tab.classList.add('is-active');
  }
});

async function updateMainPage(event) {
  const categoryName = event.currentTarget.innerText.replace(' ', '');
  const response = await fetch(`/main-news/${categoryName}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/main-news/${categoryName}`);
  } else {
    // alert('Internal Error');
    errorMessage.classList.remove('is-hidden');
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', updateMainPage);
});

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('id');
    localStorage.setItem('previousUrl', document.location.href);
    document.location.replace(`/article/${id}`);
  });
});

deleteBtn.addEventListener('click', () => {
  errorMessage.classList.add('is-hidden');
});
