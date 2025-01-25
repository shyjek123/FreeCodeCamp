const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
const input = document.getElementById("number");
const map = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const numToRoman = () => {
  const number = input.value;
  if (!number) {
    return "Please enter a valid number";
  } else if (number < 1) {
    return "Please enter a number greater than or equal to 1";
  } else if (number > 3999) {
    return "Please enter a number less than or equal to 3999";
  } else {
    let result = "";
    let tempNumber = number;
    for (const tup of map) {
      let [val, sym] = tup;
      while (tempNumber >= val) {
        result += sym;
        tempNumber -= val;
      }
    }
    return result;
  }
};

convertBtn.addEventListener("click", () => {
  let num = numToRoman();
  output.style.display = "block";
  output.textContent = num;
});
