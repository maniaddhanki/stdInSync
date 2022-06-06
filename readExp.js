process.stdin.setEncoding('utf8');

class DataReaders {
  constructor(name, dob, hobbies) {
    this.fields = [name, dob, hobbies];
    this.index = 0;
  }

  previous() {
    this.index--;
    this.index = this.index < 0 ? 0 : this.index;
    return this.fields[this.index];
  }

  next() {
    return this.fields[this.index++];
  }
}

const isAlphabet = char => {
  const isUpperCase = 'A' <= char && char <= 'Z';
  const isLowerCase = 'a' <= char && char <= 'z';
  return isUpperCase || isLowerCase;
};

const isValidName = personName => {
  const name = personName.trim();
  const isOfMinimumLength = name.length >= 5;
  const chars = name.split('');
  const areAlphabets = chars.every(isAlphabet);
  return isOfMinimumLength && areAlphabets;
};

const addName = (personName, bioData) => {
  bioData.name = personName.trim();
  return bioData;
};

const addDob = (dob, bioData) => {
  bioData.dob = dob.trim();
  console.log(bioData);
  return bioData;
};

const readStdIn = (dataReaders, bioData) => {
  let reader = dataReaders.next();
  console.log(reader.message);
  process.stdin.on('data', (chunk) => {
    if (reader.validator(chunk)) {
      reader.adder(chunk, bioData);
      reader = dataReaders.next();
    }
    console.log(reader.message);
  });
};

const main = () => {
  const name = {
    adder: addName,
    field: 'name',
    message: 'Please enter your name',
    validator: isValidName
  };

  const dob = {
    adder: addDob,
    field: 'dob',
    message: 'Please enter your dob',
    validator: () => true
  };

  const dataReaders = new DataReaders(name, dob);
  const bioData = {};
  readStdIn(dataReaders, bioData);
};

main();
