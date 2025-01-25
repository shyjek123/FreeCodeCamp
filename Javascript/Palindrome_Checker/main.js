const input = document.getElementById("text-input");
const result = document.getElementById("result");

const stripInput = (s) => {
  const regex = /[a-zA-Z0-9]/g;
  return s.match(regex);
};

const isPalindrome = () => {
  if (input.value) {
    if (input.value.length > 1) {
      result.classList.toggle("hidden");
      const strippedArr = stripInput(input.value).map((c) => c.toLowerCase());
      const reversed = strippedArr
        .slice()
        .reverse()
        .map((c) => c.toLowerCase());
      if (strippedArr.join("") === reversed.join("")) {
        result.innerHTML = `${input.value}<br> Is a Palindrome`;
        result.style.display = "block";
      } else {
        result.innerText = `${input.value} is not a palindrome`;
        result.style.display = "block";
      }
    } else {
      result.innerText = `${input.value} is a palindrome`;
      result.style.display = "block";
    }
  } else {
    alert("Please input a value");
  }
  input.value = "";
};
