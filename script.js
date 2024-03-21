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
      displayRandomKitten();
    }
  }, 100);
}

function displayRandomKitten() {
  const kittenImages = [
    'https://th.bing.com/th/id/OIP.gwmMot1o-z5maenRor2kqQHaE8?rs=1&pid=ImgDetMain',
    'https://ld-wp.template-help.com/wordpress_62483/wp-content/uploads/2017/02/image30-400x459.jpg',
    'https://th.bing.com/th/id/OIP.AW8VfeeCp9v_xzlVdciPpAHaEo?rs=1&pid=ImgDetMain',
    'https://3.bp.blogspot.com/-k3zfP_GuUnY/VW4OZIHKgNI/AAAAAAAAEQk/LskSOW5D2W4/s1600/cute-kittens-12929201-1600-1200.jpg',
    'https://media.tenor.com/lCKwsD2OW1kAAAAi/happy-cat-happy-happy-cat.gif',
    'https://th.bing.com/th/id/R.1393dac138361f9e182131254ca3719f?rik=e54GwObHLjPLKA&riu=http%3a%2f%2f1.bp.blogspot.com%2f-kRnZimNNJsA%2fUBlEl68mn0I%2fAAAAAAAARns%2fyCBKphe6nG4%2fs1600%2ffunny-cat-pictures-009-001.jpg&ehk=sQrf%2fI%2biNfvz%2f2bEvEeWEKJVW33eW7APCvwilqEZ3UI%3d&risl=&pid=ImgRaw&r=0',
    'https://www.hdwallpaper.nu/wp-content/uploads/2015/02/maxresdefault.jpg',
    'https://2.bp.blogspot.com/-dSdK7Tpw-AE/U4mYLuFw3-I/AAAAAAAAuWQ/05udTQsPUQ4/s1600/funny-cat-images1-www.go4pix.info.jpg',
    'https://worldcatcomedy.com/wp-content/uploads/2018/09/maxresdefault-46.jpg',
    'https://gifdb.com/images/high/sad-white-cat-memes-crying-tears-huhuhu-pbhoq9jxfvgd2bbi.gif',
    'https://c.tenor.com/7t63GFnoIPUAAAAd/tenor.gif',
    'https://media.tenor.com/0fjDdOOwkXMAAAAd/cat-shocked.gif',
    'https://c.tenor.com/f7sCJzIXNGcAAAAd/tenor.gif',
    'https://c.tenor.com/czX4SKtwCVUAAAAd/tenor.gif',
    'https://i.cbc.ca/1.5359228.1577206958!/fileImage/httpImage/smudge-the-viral-cat.jpg',
    'https://i.kym-cdn.com/entries/icons/original/000/026/638/cat.jpg',
    'https://uploads.dailydot.com/2023/12/crying-cat-meme.jpg?q=65&auto=format&w=1600&ar=2:1&fit=crop',
    'https://imgflip.com/s/meme/Smiling-Cat.jpg',
    'https://media.tenor.com/_1hMqyFC4LEAAAAM/pop-cat.gif',
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