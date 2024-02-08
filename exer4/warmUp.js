/**
 * Let's do some coding warm up to get you started with JS!
 *
 */

/**
 * Task 1: Create a function that takes an integer as input and returns the
 * letter grade (as a string) corresponding to it. Return "INVALID" if the
 * integer is outside the range [0, 100].
 *
 * Letter grade:
 * A = 90 -> 100
 * B = 80 -> 89
 * C = 70 -> 79
 * D = 60 -> 69
 * F = anything < 60
 */
function toLetterGrade(grade) {
// var grade = prompt("Give me an integer");
  if (grade > 100 || grade <0){
    return "INVALID";
  }
  else{
    if (grade >= 60 && grade <= 69 ){
      return ("D");
    }
    else if (grade >= 70 && grade <= 79){
      return ("C");
    }
    else if (grade >= 80 && grade <= 89){
      return ("B");
    }
    else if (grade >= 90 && grade <= 100){
      return ("A");
    }
    else{
      return ("F");
    }
  }
  
}

/**
 * Task 2: Create a function that takes in an array of integers and returns a
 * new array containing only even elements from the original array. The
 * ordering of the remaining elements should be the same as the original array.
 *
 * Example: [9, 3, 4, 1, 2, 0] --> [4, 2, 0]
 */
function getEvenElements(array) {
  const evenElements = array.filter(element => element %2 === 0);
  return evenElements;
}

/**
 * Task 3: Create a function that takes in a sentence and returns the LENGTH
 * of the longest word in that sentence. No punctuation will appear in the
 * sentence.
 *
 * Hint: The .split() method might be useful here
 *
 * Example: "I love Bits of Good" --> 4
 */
function findLongestWord(string) {
  const words = string.split(" ");
  console.log(words);
  let maxL = 0;
  for (let word of words) {
    if (word.length > maxL) {
      maxL = word.length;
    }
  }
  return maxL;
}

console.log(findLongestWord("I love Bits of Good"));

/**
 * Task 4: Create a function that takes in 2 objects and return an object that 
 * is the combination of the 2
 *
 * Example:
    {
        name: "Casey",
        age: 10
    }
    {
        breed: "Pomeranian",
        friendly: false
    }
    -->
    {
        name: "Casey",
        age: 10,
        breed: "Pomeranian",
        friendly: false
    } 
 */
function combineObjects(object1, object2) {
  // TODO
  const combo = {
    ...object1,
    ...object2
  }
  return combo;
}

/**
 *  Task 5: Create a function that takes an array as an argument and returns
 *  the reverse array.
 *
 *  DO NOT USE THE .reverse() METHOD!!
 *
 *  Example: [1, 2, 3] -> [3, 2, 1]
 */
function reverseArr(array) {
  // TODO
  const reversedArray = array.map((element, index, originalArray) => {
    return originalArray[originalArray.length - 1 - index];
  });
  return reversedArray;
}

// DO NOT EDIT BELOW THIS LINE -- the code is for testing purposes only!
// To test your code, run `node warmUp.js` in your terminal

import {
  testToLetterGrade,
  testGetEvenElements,
  testFindLongestWord,
  testCombineObjects,
  testReverseArr,
} from "./warmUpTests.js";

console.log("TEST RESULTS:");
testToLetterGrade(toLetterGrade);
testGetEvenElements(getEvenElements);
testFindLongestWord(findLongestWord);
testCombineObjects(combineObjects);
testReverseArr(reverseArr);
