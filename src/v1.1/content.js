let currentSpeed = 1;
let currentStep = 0.25;

function changeVideoSpeed(speed) {
  const videos = document.querySelectorAll('video');
  videos.forEach(function (video) {
    video.playbackRate = speed;
  });
}

function increaseVideoSpeed() {
  currentSpeed = parseFloat((currentSpeed + currentStep).toFixed(2));
  changeVideoSpeed(currentSpeed);
}

function decreaseVideoSpeed() {
  currentSpeed = parseFloat(Math.max(0, currentSpeed - currentStep).toFixed(2));
  changeVideoSpeed(currentSpeed);
}

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
});

document.addEventListener('keydown', function (event) {
  if (event.key === '+') {
    increaseVideoSpeed();
  } else if (event.key === '-') {
    decreaseVideoSpeed();
  }
});