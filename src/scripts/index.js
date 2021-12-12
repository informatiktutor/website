import '../styles/index.scss'

(function () {

const spoilers = document.querySelectorAll('.spoiler');
for (const spoiler of spoilers) {
  const button = spoiler.querySelector('button.toggle-collapse');
  button.addEventListener('click', function (e) {
    spoiler.classList.toggle('is-collapsed');
  });
}

})()
