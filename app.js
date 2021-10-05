this.dictMap = new Map(); //(word=> word.length) pairs for words smaller than 6 letters)
this.sixLetterDict = []; //array of all 6 letter words
this.rootWord = "";
this.workingWordSubset = new Map(); //stores (word => string to be printed to user)

makeDictionary();
pickRootWord();

findAllSubsets();
rootWordScramble = scramble(rootWord);

let currCorrGuess = 0;
let workingWordSize = workingWordSubset.size;

do {
  console.log(rootWordScramble);
  workingWordSubset.forEach(function (key) {
    console.log(key);
  });
  let input = prompt("Enter a guess:");

  if (input == null) {
    console.clear();
    break;
  } else if (input === "*") {
    rootWordScramble = scramble(rootWord);
  } else if (input.length < 3 || input.length > 6) {
    alert("Your word is the wrong size!");
  } else if (!dictMap.has(input)) {
    alert("not a valid english word");
  } else if (!workingWordSubset.has(input)) {
    alert("Not a word!");
  } else if (workingWordSubset.get(input) === input) {
    alert("ALready guessed word!");
  } else {
    alert("congrats you guessed a word!");
    currCorrGuess++;
    workingWordSubset.set(input, input);
  }

  console.clear();
} while (currCorrGuess < workingWordSize);

if (currCorrGuess === workingWordSize) {
  console.log("Congrats! You guessed all the words");
} else {
  console.log(`You guessed ${currCorrGuess} of ${workingWordSize} words`);
}
workingWordSubset.forEach(function (key, value) {
  console.log(value);
});

function makeDictionary() {
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    const length = word.length;
    if (length <= 6) {
      dictMap.set(word, word.length);
    }
    if (length === 6) {
      sixLetterDict.push(word);
    }
  }
} //wait until you accept alert to change strings?
function pickRootWord() {
  let rand = Math.floor(Math.random() * sixLetterDict.length);
  rootWord = sixLetterDict[rand];
}

function findAllSubsets() {
  for (let i = 0; i < rootWord.length; i++) {
    let letterAtI = rootWord.substr(i, 1);
    let leftoverLetters = rootWord.replace(letterAtI, "");

    makeCombos(letterAtI, leftoverLetters, []);
  }
}

function makeCombos(currentCombo, leftoverLetters, subSet) {
  if (leftoverLetters.length < 1) {
    return true;
  } else {
    for (let i = 0; i < leftoverLetters.length; i++) {
      let letter = leftoverLetters.substr(i, 1);
      let newCurrCombo = currentCombo + letter;
      let newLeftOvers = leftoverLetters.replace(letter, "");
      if (dictMap.has(newCurrCombo) && newCurrCombo.length > 2) {
        workingWordSubset.set(newCurrCombo, stringifyWords(newCurrCombo));
      }

      makeCombos(newCurrCombo, newLeftOvers, subSet);
    }
  }
}

function stringifyWords(word) {
  let str1 = "";
  for (let i = 0; i < word.length; i++) {
    str1 = str1.concat("- ");
  }
  return str1;
}

function scramble(word) {
  let arrString = word.split("");
  let length = word.length;
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(Math.random() * length);
    let temp = arrString[rand];
    arrString[rand] = arrString[i];
    arrString[i] = temp;
  }
  if (dictMap.has(arrString)) {
    scramble(arrString);
  }
  return arrString.join("");
}
