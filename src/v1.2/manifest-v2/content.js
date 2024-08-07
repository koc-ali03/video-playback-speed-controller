const API = typeof browser !== 'undefined' ? browser : chrome;

// Sets the initial speed and step value when the page is loaded
let currentSpeed = 1;
let currentStep = 0.25;

// Function that changes video speed
function changeVideoSpeed(speed) {
  const videos = document.querySelectorAll('video');
  videos.forEach(function (video) {
    video.playbackRate = speed;
  });
}

// Function that increases the video speed through changeVideoSpeed()
function increaseVideoSpeed() {
  currentSpeed = parseFloat((currentSpeed + currentStep).toFixed(2));
  changeVideoSpeed(currentSpeed);
}

// Function that descreases the video speed through changeVideoSpeed()
function decreaseVideoSpeed() {
  currentSpeed = parseFloat(Math.max(0, currentSpeed - currentStep).toFixed(2));
  changeVideoSpeed(currentSpeed);
}

// A function that listens for messages from popup.js and responds
function messageListener(request, sender, sendResponse) {
  switch (request.action) {

    case 'changeSpeed':
      currentSpeed = request.speed;
      changeVideoSpeed(currentSpeed);
      break;

    case 'getSpeedValue':
      sendResponse({ speedValue: currentSpeed });
      break;

    case 'getStepValue':
      sendResponse({ stepValue: currentStep });
      break;

    case 'increaseVideoSpeed':
      increaseVideoSpeed();
      sendResponse({ speedValue: currentSpeed });
      break;

    case 'decreaseVideoSpeed':
      decreaseVideoSpeed();
      sendResponse({ speedValue: currentSpeed });
      break;

    case 'setStepValue':
      currentStep = Math.max(0, parseFloat(request.step));
      break;
  }
}

// A function that checks if the speed value is changed through keyboard shortcut while the popup is closed
// The shortcut speed change check within popup focus is done in popup.js
function keydownListener(event) {
  if (event.key === '+') {
    increaseVideoSpeed();
  }
  else if (event.key === '-') {
    decreaseVideoSpeed();
  }
}

// Attaches the functions to their corresponding listeners
API.runtime.onMessage.addListener(messageListener);
document.addEventListener('keydown', keydownListener);

// Removes the event listeners when the page content is unloading
window.addEventListener('beforeunload', function removeListeners() {
  document.removeEventListener('keydown', keydownListener);
  API.runtime.onMessage.removeListener(messageListener);
});