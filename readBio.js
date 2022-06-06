const fs = require('fs');
process.stdin.setEncoding('utf8');
const bioData = {};

const addHobbies = bioData => {
  console.log('Please enter your hobbies');
  process.stdin.on('data', chunk => {
    bioData.hobbies = +chunk.split(',');
    fs.writeFileSync('bioData.json', JSON.stringify(bioData), 'utf8');
  });
};

const addAge = bioData => {
  console.log('Please enter your age');
  process.stdin.on('data', chunk => {
    bioData.age = +chunk.trim();
    process.stdin.removeAllListeners('data');
    addHobbies(bioData);
  });
};

const addName = (bioData) => {
  console.log('Please enter your name');
  process.stdin.on('data', chunk => {
    bioData.name = chunk.trim();
    process.stdin.removeAllListeners('data');
    addAge(bioData);
  });
};

addName(bioData);
