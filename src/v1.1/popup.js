const speedInput = document.getElementById('speedInput');
const stepInput = document.getElementById('stepInput');
const changeSpeedBtn = document.getElementById('changeSpeedBtn');

document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }

  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: "getSpeedValue" }, (response) => {
      speedInput.value = response.speedValue;
    });
    browser.tabs.sendMessage(tabs[0].id, { action: "getStepValue" }, (response) => {
      stepInput.value = response.stepValue;
      speedInput.step = response.stepValue;
    });
  });

  changeSpeedBtn.addEventListener('click', function () {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const speed = parseFloat(speedInput.value);
      browser.tabs.sendMessage(tabs[0].id, { action: 'changeSpeed', speed: speed });
    });
  });

  stepInput.addEventListener('input', function() {
    speedInput.step = stepInput.value;
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const step = parseFloat(stepInput.value);
      browser.tabs.sendMessage(tabs[0].id, { action: 'setStepValue', step: step });
    });
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key === '+') {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { action: "increaseVideoSpeed" }, (response) => {
        speedInput.value = response.speedValue;
      });
    });
  }
  else if (event.key === '-') {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { action: "decreaseVideoSpeed" }, (response) => {
        speedInput.value = response.speedValue;
      });
    });
  }
});