// tabs
const tabs = document.querySelectorAll('.tablinks');
const tabContentBoxes = document.querySelectorAll('.tabcontent');
// const Handlebars = require('express-handlebars');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('is-active'));
    console.log('test click');
    tab.classList.add('is-active');

    const { target } = tab.dataset;
    tabContentBoxes.forEach((box) => {
      if (box.getAttribute('id') === target) {
        box.classList.remove('is-hidden');
      } else {
        box.classList.add('is-hidden');
      }
    });
  });
});