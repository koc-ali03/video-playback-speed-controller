const speedInput = document.getElementById('speedInput');
const stepInput = document.getElementById('stepInput');
const changeSpeedBtn = document.getElementById('changeSpeedBtn');

// A function for detecting whenever the speed change button is clicked
function changeSpeedFunction() {
  API.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const speed = parseFloat(speedInput.value);
    API.tabs.sendMessage(tabs[0].id, { action: 'changeSpeed', speed: speed }); // Sends the new value over to content.js
  });
};

// A function for detecting whenever the speed input value is changed
function speedInputFunction(event) {
  if (isNaN(event.target.value) || event.target.value < speedInput.getAttribute('min')) {
    API.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      API.tabs.sendMessage(tabs[0].id, { action: 'getSpeedValue' }, function(response) {
        event.target.value = response.speedValue;
      });
    });
  }
};

// A function for detecting whenever the step input value is changed
function stepInputFunction(event) {
  if (isNaN(event.target.value) || event.target.value < speedInput.getAttribute('min')) {
    API.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      API.tabs.sendMessage(tabs[0].id, { action: 'getStepValue' }, function(response) {
        event.target.value = response.stepValue;
      });
    });
  }
  else {
    speedInput.step = stepInput.value;
    API.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const step = parseFloat(stepInput.value);
      API.tabs.sendMessage(tabs[0].id, { action: 'setStepValue', step: step }); // Sends the new value over to content.js
    });
  }
};

// When DOM content is loaded, sets initial states (color scheme and speed-step values) and adds event listeners
function createListeners() {
  // Sets the theme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  }
  else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }

  // Gets the current values from content.js and updates the popup accordignly
  API.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    API.tabs.sendMessage(tabs[0].id, { action: 'getSpeedValue' }, function(response) {
      speedInput.value = response.speedValue;
    });
    API.tabs.sendMessage(tabs[0].id, { action: 'getStepValue' }, function(response) {
      stepInput.value = response.stepValue;
      speedInput.step = response.stepValue;
    });
  });

  // Attaches the functions to their corresponding listeners
  changeSpeedBtn.addEventListener('click', changeSpeedFunction);
  speedInput.addEventListener('input', speedInputFunction);
  stepInput.addEventListener('input', stepInputFunction);
};

// A function that checks if the speed value is changed through keyboard shortcut while the popup is open
// The shortcut speed change check outside of popup focus is done in content.js
function keydownFunction(event) {
  if (event.key === '+') {
    API.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      API.tabs.sendMessage(tabs[0].id, { action: 'increaseVideoSpeed' }, function(response) {
        speedInput.value = response.speedValue;
      });
    });
  }
  else if (event.key === '-') {
    API.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      API.tabs.sendMessage(tabs[0].id, { action: 'decreaseVideoSpeed' }, function(response) {
        speedInput.value = response.speedValue;
      });
    });
  }
};

// Attaches the functions to their corresponding listeners
document.addEventListener('DOMContentLoaded', createListeners);
document.addEventListener('keydown', keydownFunction);

// Removes the event listeners when the popup content is unloading
window.addEventListener('beforeunload', function removeListeners() {
  changeSpeedBtn.removeEventListener('click', changeSpeedFunction);
  speedInput.removeEventListener('input', speedInputFunction);
  stepInput.removeEventListener('input', stepInputFunction);
  document.removeEventListener('keydown', keydownFunction);
});