import '../styles/base.scss'

window.onFormLoaded = (function () {
  const element = document.getElementById('iframe-container');
  let counter = 0;
  return function () {
    if (counter > 0) {
      element.style.height = "50vh";
    }
    window.scrollTo(0, 0);
    counter++;
  };
})();
