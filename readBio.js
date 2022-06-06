const fs = require('fs');
process.stdin.setEncoding('utf8');

const addHobbies = bioData => {
  console.log('Please enter your hobbies');
  process.stdin.on('data', chunk => {
    bioData.hobbies = chunk.trim().split(',');
    fs.writeFileSync('bioData.json', JSON.stringify(bioData), 'utf8');
    console.log('Thank You');
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

const addName = () => {
  console.log('Please enter your name');
  const bioData = {};
  process.stdin.on('data', chunk => {
    bioData.name = chunk.trim();
    process.stdin.removeAllListeners('data');
    addAge(bioData);
  });
};

addName();
