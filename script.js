let numbers = [];
let exclusions = [];

function createExclusionButtons() {
  const min = getNumberFromElement('min');
  const max = getNumberFromElement('max');
  const exclusionButtons = document.getElementById('exclusionButtons');
  exclusionButtons.innerHTML = '';

  if (isNaN(min) || isNaN(max)) {
    alert('Please enter a range of numbers');
    return;
  }

  if (min > max) {
    alert('The minimum number must be less than the maximum number');
    return;
  }

  for (let i = min; i <= max; i++) {
    createButton(i, exclusionButtons);
  }
}

function createButton(i, exclusionButtons) {
  const button = document.createElement('button');
  button.classList.add('numberButton');
  button.id = i;
  button.innerText = i;
  numbers.push(i);

  button.onclick = function () {
    toggleExclusion(i, this);
  };

  exclusionButtons.appendChild(button);
}

function toggleExclusion(number, button) {
  if (exclusions.includes(number)) {
    removeExclusion(number, button);
  } else {
    addExclusion(number, button);
  }
}

function removeExclusion(number, button) {
  exclusions = exclusions.filter(n => n !== number);
  button.classList.remove('excluded');
  if (!numbers.includes(number)) {
    numbers.push(number);
  }
}

function addExclusion(number, button) {
  exclusions.push(number);
  button.classList.add('excluded');
  if (numbers.includes(number)) {
    numbers.splice(numbers.indexOf(number), 1);
  }
}

function generateRandomNumber() {
  if (numbers.length == 0) {
    alert('There are no numbers to choose from. Please edit the range of numbers.');
    return;
  }

  const generateButton = document.getElementById('generateButton');
  generateButton.disabled = true;

  const maxIterations = 10;
  const excludeCheckbox = document.getElementById('exclude');
  let counter = 0;

  const intervalId = setInterval(() => {
    const randomElement = Math.floor(Math.random() * numbers.length);
    const randomNumber = numbers[randomElement];
    document.getElementById('randomNumber').innerHTML = randomNumber;
    counter++;
    if (counter >= maxIterations) {
      clearInterval(intervalId);
      if(excludeCheckbox.checked){
        addExclusion(randomNumber, document.getElementById(randomNumber));
      }
      generateButton.disabled = false;
    }
  }, 100);
}

function getNumberFromElement(elementId) {
  return parseInt(document.getElementById(elementId).value);
}