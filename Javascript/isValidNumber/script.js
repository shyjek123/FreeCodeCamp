const resultsDiv = document.getElementById("results-div");
const input = document.getElementById("user-input");

const regex =
  /(?:^(?:1\s|1|)[(][0-9]{3}[)]|(?:^1\s|^1|^)[0-9]{3})(?:[-]||[\s])[0-9]{3}(?:[\s-]|)[0-9]{4}$/;

const possibleInputs = [
  "1 555-555-5555",
  "1 (555) 555-5555",
  "5555555555",
  "555-555-5555",
  "(555)555-5555",
  "1(555)555-5555",
  "555-5555",
  "5555555",
  "1 555)555-5555",
  "1 555 555 5555",
  "1 456 789 4444",
  "123**&!!asdf#",
  "55555555",
  "(6054756961)",
  "2 (757) 622-7382",
  "0 (757) 622-7382",
  "-1 (757) 622-7382 ",
  "2 757 622-7382",
  "10 (757) 622-7382",
  "27576227382",
  "(275)76227382",
  "2(757)76227382",
  "2(757)622-7382",
  "555)-555-5555",
  "(555-555-5555",
  "(555)5(55?)-5555",
  "55 55-55-555-5",
  "11 555-555-5555",
];

const check = (num) => regex.test(num);

const checkPhone = () => {
  const number = input.value;
  if (!input.value) {
    alert("Please provide a phone number");
    return;
  }

  resultsDiv.innerHTML += check(number)
    ? `<p>Valid US number: ${number}</p>`
    : `<p>Invalid US number: ${number}</p>`;
};

const clearResults = () => {
  resultsDiv.innerHTML = "";
};
