let character = "#";
let count = 8;
let inverted = true;

buildPyramid(character, count);

function getPaddedArr(count, character) {
  let result = [];
  for (let i = 1; i <= count; i++) {
    let rowPadding = " ".repeat(count - i);
    result.push(rowPadding + character.repeat(2 * i - 1));
  }
  return result;
}

function buildPyramid(char, count, isInverted = false) {
  let pyramid = getPaddedArr(count, char);

  if (isInverted) {
    for (i = pyramid.length - 1; i >= 0; i--) {
      console.log(pyramid[i]);
    }
  } else {
    for (i = 0; i < pyramid.length; i++) {
      console.log(pyramid[i]);
    }
  }
}
