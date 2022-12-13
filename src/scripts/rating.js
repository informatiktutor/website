import '../styles/rating.scss'

function onFormLoaded() {
  const element = document.getElementById('iframe-container');
  let counter = 0;
  return function () {
    if (counter > 0) {
      element.style.height = "50vh";
    }
    window.scrollTo(0, 0);
    counter++;
  };
};

(function () {
  const embedConsent = document.querySelector('#iframe-consent');
  const continueButton = embedConsent.querySelector('button.button');
  const embedContainer = document.querySelector('#iframe-container');
  const iframe = embedContainer.querySelector('iframe');

  let toggled = false;
  continueButton.addEventListener('click', (e) => {
    if (toggled) {
      return;
    }
    toggled = true;
    continueButton.disabled = true;
    continueButton.innerText = "Wird geladen...";
    iframe.addEventListener('load', (e) => {
      embedConsent.classList.add('is-hidden');
      embedContainer.classList.remove('is-hidden');
      onFormLoaded();
    });
    iframe.setAttribute('src', iframe.getAttribute('data-src'));
    iframe.removeAttribute('data-src');
  });
})()
