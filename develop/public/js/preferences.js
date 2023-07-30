async function selectPrefs(event) {
  event.preventDefault();

  const cardCheckMark = event.currentTarget.children[0].children[0];
  console.log(cardCheckMark.getAttribute('src'));

  if (cardCheckMark.getAttribute('src') === '') {
    cardCheckMark.setAttribute('src', '/images/icon-check.png');
  } else {
    cardCheckMark.setAttribute('src', '');
  }
  console.log();
}

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
      prefsArr.push(element.children[1].children[0].children[0].innerText.trim());
    }
  });
  if (prefsArr[prefsArr.length - 1] === 'all') {
    prefsArr.splice(0, prefsArr.length - 1);
  }
  console.log(prefsArr);

  // Start fetch
}

document.getElementById('submit').addEventListener('click', updateUserPrefs);
