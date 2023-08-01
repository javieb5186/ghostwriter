const tabs = document.querySelectorAll('.tablinks');
const url = document.location.href;
const nameIndex = url.lastIndexOf('/');
const testName = url.slice(nameIndex + 1, url.length);

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
    alert('Internal Error');
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
