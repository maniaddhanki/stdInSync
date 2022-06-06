const fs = require('fs');
process.stdin.setEncoding('utf8');

const addHobbies = bioData => {
  console.log('Please enter your hobbies');
  process.stdin.on('data', chunk => {
    bioData.hobbies = chunk.trim().split(',');
    process.stdin.removeAllListeners('data');
    if (chunk.trim.length > 0) {
      fs.writeFileSync('bioData.json', JSON.stringify(bioData), 'utf8');
      return;
    }
    console.log('Invalid input');
    addHobbies(bioData);
  });
  process.stdin.on('close', () => console.log('Thank You'));
};

const addDob = bioData => {
  console.log('Please enter your date of birth');
  process.stdin.on('data', chunk => {
    bioData.dob = chunk.trim();
    process.stdin.removeAllListeners('data');
    addHobbies(bioData);
  });
};

const isAlphabet = char => {
  const isUpperCase = 'A' <= char && char <= 'Z';
  const isLowerCase = 'a' <= char && char <= 'z';
  return isUpperCase || isLowerCase;
};

const isValidName = personName => {
  const isOfMinimumLength = personName.length >= 5;
  const chars = personName.split('');
  const areAlphabets = chars.every(isAlphabet);
  return isOfMinimumLength && areAlphabets;
};

const addName = () => {
  console.log('Please enter your name');
  const bioData = {};
  process.stdin.on('data', chunk => {
    bioData.name = chunk.trim();
    process.stdin.removeAllListeners('data');
    if (isValidName(bioData.name)) {
      addDob(bioData);
      return;
    }
    console.log('Invalid entry');
    addName();
  });
};

addName();
