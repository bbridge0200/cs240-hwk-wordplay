/*
cs 240 10/4
Beatrice Bridge
Runs wordplaygame
  */
this.dictMap = new Map(); //(word=> word.length) pairs for words smaller than 6 letters)
this.sixLetterDict = []; //array of all 6 letter words
this.rootWord = "";
this.workingWordSubset = new Map(); //stores (word => string to be printed to user)

makeDictionary();
pickRootWord();

findAllSubsets();
rootWordScramble = scramble(rootWord);

let currCorrGuess = 0; //number of words guessed correctly
let workingWordSize = workingWordSubset.size;

do {
  console.log(rootWordScramble); //pring
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
    //set "- - - " version to the word once guessed correctly
    alert("ALready guessed word!");
  } else {
    alert("congrats you guessed a word!"); //reaching this means that you guessed a word in the working subsets
    currCorrGuess++;
    workingWordSubset.set(input, input); //alter for printing
  }

  console.clear();
} while (currCorrGuess < workingWordSize); //havent guesed all words

if (currCorrGuess === workingWordSize) {
  console.log("Congrats! You guessed all the words");
} else {
  console.log(`You guessed ${currCorrGuess} of ${workingWordSize} words`);
}
workingWordSubset.forEach(function (key, value) {
  console.log(value);
});
/* 
This function scans the dictionary array 
linked in index.html and makes a 
map out of words 3-6 letters with their length
 */
function makeDictionary() {
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    const length = word.length;
    if (length <= 6) {
      dictMap.set(word, word.length);
    }
    if (length === 6) {
      sixLetterDict.push(word); //keeps track of possible root words
    }
  }
}
/* 
This function picks a random root word
from words length 6
 */
function pickRootWord() {
  let rand = Math.floor(Math.random() * sixLetterDict.length);
  rootWord = sixLetterDict[rand];
}
/* 
this calls makeCombos in order to build the set of all 
valid words from the subsets of the root word
 */
function findAllSubsets() {
  for (let i = 0; i < rootWord.length; i++) {
    let letterAtI = rootWord.substr(i, 1);
    let leftoverLetters = rootWord.replace(letterAtI, "");

    makeCombos(letterAtI, leftoverLetters, []); //passes in each letter and the rest of the letters
  }
}
/* 
Recursively makes letter combos while checking validity
@param: takes current combo, leftover letters, and a subset of items
 */
function makeCombos(currentCombo, leftoverLetters, subSet) {
  if (leftoverLetters.length < 1) {
    //done if their are no more words to add
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
/* 
 makes the string representation of the number of letters for 
 the user to guess
 @param word
  */
function stringifyWords(word) {
  let str1 = "";
  for (let i = 0; i < word.length; i++) {
    str1 = str1.concat("- ");
  }
  return str1;
}
/* 
scrambles root word
@param word
 */
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
