const deleteBtn = document.getElementById('delete-btn');
const errorMessage = document.getElementById('errorMessage');

async function selectPrefs(event) {
  event.preventDefault();

  // Get the current card element
  const cardCheckMark = event.currentTarget.children[0].children[0];

  // If the card element is not check marked, check it. If it has checkmark, set it to no checkmark
  if (cardCheckMark.getAttribute('src') === '') {
    cardCheckMark.setAttribute('src', '/images/icon-check.png');
  } else {
    cardCheckMark.setAttribute('src', '');
  }
}

// Get all the cards and add an event listener to all of them
let cards = document.getElementsByClassName('card');
cards = Array.from(cards);
cards.forEach((element) => {
  element.addEventListener('click', selectPrefs);
});

async function updateUserPrefs() {
  const prefsArr = [];
  cards.forEach((element) => {
    const check = element.children[0].children[0];
    if (check.getAttribute('src') !== '') {
      const text = element.children[1].children[0].children[0].innerText.trim();
      const lower = text.toLowerCase();
      prefsArr.push(lower);
    }
  });

  if (prefsArr[prefsArr.length - 1] === 'all') {
    prefsArr.splice(0, prefsArr.length);
  }

  if (prefsArr.length === 0 || prefsArr[0] === 'all') {
    cards.forEach((element) => {
      const text = element.children[1].children[0].children[0].innerText.trim();
      const lower = text.toLowerCase();
      if (lower !== 'all') {
        prefsArr.push(lower);
      }
    });
  }

  const response = await fetch('/api/users/update-prefs', {
    method: 'POST',
    body: JSON.stringify({ prefsArr }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/main-news/foryou');
  } else {
    // alert('An error occured');
    errorMessage.classList.remove('is-hidden');
  }
}

document.getElementById('submit').addEventListener('click', updateUserPrefs);

deleteBtn.addEventListener('click', () => {
  errorMessage.classList.add('is-hidden');
});
