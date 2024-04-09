let numbers = [];
let exclusions = [];

const minInput = document.getElementById('min');
const maxInput = document.getElementById('max');
const generateButton = document.getElementById('generateButton');
const leftCatImage = document.getElementById("leftKitten");
const rightCatImage = document.getElementById("rightKitten");

// Disable the generate button whenever the min or max value changes
minInput.addEventListener('input', () => generateButton.disabled = true);
maxInput.addEventListener('input', () => generateButton.disabled = true);

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

  numbers = [];
  exclusions = [];

  for (let i = min; i <= max; i++) {
    createButton(i, exclusionButtons);
  }

  generateButton.disabled = false;
}

function excludeAll() {
  for (let i = 0; i < numbers.length; i++) {
    const number = parseInt(numbers[i]);
    const button = document.getElementById(number);
    addExclusionOnly(number, button);
  }
  numbers = [];
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

function addExclusionOnly(number, button) {
  exclusions.push(number);
  button.classList.add('excluded');
}

function addExclusion(number, button) {
  exclusions.push(number);
  button.classList.add('excluded');
  removeNumber(number);
}

function removeNumber(number) {
  if (numbers.includes(number)) {
    numbers.splice(numbers.indexOf(number), 1);
  }
}

function generateRandomNumber() {
  if (numbers.length == 0) {
    alert('There are no numbers to choose from. Please edit the range of numbers.');
    return;
  }

  const min = getNumberFromElement('min');
  const max = getNumberFromElement('max');

  if (isNaN(min) || isNaN(max)) {
    alert('Please enter a range of numbers');
    return;
  }

  if (min > max) {
    alert('The minimum number must be less than the maximum number');
    return;
  }

  generateButton.disabled = true;

  const maxIterations = 10;
  const excludeCheckbox = document.getElementById('exclude');
  let counter = 0;
  const rngElement = document.getElementById('randomNumber');
  displayRandomKitten();
  const intervalId = setInterval(() => {
    const randomElement = Math.floor(Math.random() * numbers.length);
    const randomNumber = numbers[randomElement];
    rngElement.innerHTML = randomNumber;
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

function displayRandomKitten() {
  const kittenImages = [
    'https://lukypocats.imgix.net/Img/cat0.jpg',
    'https://lukypocats.imgix.net/Img/cat1.png',
    'https://lukypocats.imgix.net/Img/cat2.jpg',
    'Img/cat3.gif',
    'https://lukypocats.imgix.net/Img/cat4.png',
    'https://lukypocats.imgix.net/Img/cat5.jpg',
    'https://lukypocats.imgix.net/Img/cat6.jpg',
    'https://lukypocats.imgix.net/Img/cat7.png',
    'https://lukypocats.imgix.net/Img/cat8.jpg',
    'Img/cat9.gif',
    'Img/cat10.gif',
    'Img/cat11.gif',
    'Img/cat12.gif',
    'Img/cat13.gif',
    'https://lukypocats.imgix.net/Img/cat14.avif',
    'https://lukypocats.imgix.net/Img/cat15.jpg',
    'https://lukypocats.imgix.net/Img/cat16.jpg',
    'https://lukypocats.imgix.net/Img/cat17.jpg',
    'Img/cat18.gif',
    //tmp pahts
    'https://lukypocats.imgix.net/Img/cat19.jpg',
    'https://lukypocats.imgix.net/Img/cat20.jpg',
    'https://lukypocats.imgix.net/Img/cat21.jpg',
    'https://lukypocats.imgix.net/Img/cat22.jpg',
    'https://lukypocats.imgix.net/Img/cat23.jpg',
    'https://lukypocats.imgix.net/Img/cat24.jpg',
    'https://lukypocats.imgix.net/Img/cat25.jpg',
    'https://lukypocats.imgix.net/Img/cat26.jpg',
    'https://lukypocats.imgix.net/Img/cat27.jpg',
    'https://lukypocats.imgix.net/Img/cat28.jpg',
    'https://lukypocats.imgix.net/Img/cat29.jpg',
    'https://lukypocats.imgix.net/Img/cat30.jpg',
    'https://lukypocats.imgix.net/Img/cat31.jpg',
    'Img/cat32.gif',
    'Img/cat33.gif',
    'Img/cat34.gif',
    'Img/cat35.gif',
    'Img/cat36.gif',
    'Img/cat37.gif',
    'Img/cat38.gif',
    'https://lukypocats.imgix.net/Img/cat39.jpg',
    'https://lukypocats.imgix.net/Img/cat40.jpg',
    'https://lukypocats.imgix.net/Img/cat41.jpg',
    'https://lukypocats.imgix.net/Img/cat42.jpg',
    'https://lukypocats.imgix.net/Img/cat43.jpg',
    'https://lukypocats.imgix.net/Img/cat44.jpg',
    'https://lukypocats.imgix.net/Img/cat45.jpg',
    'https://lukypocats.imgix.net/Img/cat46.jpg',
    'https://lukypocats.imgix.net/Img/cat47.jpg',
    'https://lukypocats.imgix.net/Img/cat48.jpg',
    'https://lukypocats.imgix.net/Img/cat49.jpg',
  ];

  const leftKitten = kittenImages[Math.floor(Math.random() * kittenImages.length)];
  const rightKitten = kittenImages[Math.floor(Math.random() * kittenImages.length)];

  leftCatImage.src = leftKitten;
  rightCatImage.src = rightKitten;
}

function getNumberFromElement(elementId) {
  return parseInt(document.getElementById(elementId).value);
}

displayRandomKitten();