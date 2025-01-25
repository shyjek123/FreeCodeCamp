let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const register = document.getElementById("register-values");

const updateRegister = () => {
  register.innerHTML = "<p class='bg-blue-800'> Change in drawer</p>";
  for (const item of cid) {
    register.innerHTML += `<p>${item[0]}: $${item[1]}</p>`;
  }
};

const values = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

updateRegister();

const calcReturn = (cash) => {
  let total = cash;
  let total_change = 0;
  let cashBack = [];
  let change;
  const cid_backwards = [...cid].reverse();

  for (const item of cid_backwards) {
    const currAmount = values[item[0]];
    if (currAmount > total) {
      continue;
    }

    change = 0;
    while (currAmount <= total && item[1] > 0 && total >= 0) {
      change += currAmount;
      total = Math.round((total - currAmount) * 100) / 100;
      item[1] = Math.round((item[1] - currAmount) * 100) / 100;
    }
    if (change > 0) {
      cashBack.push([item[0], Math.round(change * 100) / 100]);
    }
    total_change += change;
  }
  return [cashBack, Math.round(total_change * 100) / 100];
};

const checkRegister = (e) => {
  e.preventDefault();
  const money = Number(cash.value);
  updateUI(money);
};

const updateUI = (given) => {
  const total_cash = Number(
    cid.reduce((acc, val) => acc + val[1], 0).toFixed(2),
  );
  let due = given - price;
  if (given < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (given === price) {
    changeDue.innerHTML = `<p class='bg-green-800'>No change due - customer paid with exact cash</p>`;
  } else if (price < given && due > total_cash) {
    changeDue.innerHTML = `<p class='bg-red-800'>Status: INSUFFICIENT_FUNDS</p>`;
  } else {
    let [returnList, change_due] = calcReturn(due);
    if (change_due !== due) {
      changeDue.innerHTML = `<p class='bg-red-800'>Status: INSUFFICIENT_FUNDS</p>`;
      return;
    }
    if (price < given && total_cash > due) {
      let status;
      if (total_cash === due) {
        status = `<p class="bg-red-800">Status: CLOSED</p>`;
      }
      if (total_cash > due) {
        status = `<p class="bg-green-800">Status: OPEN</p>`;
      }
      updateRegister();
      changeDue.innerHTML = status;
      returnList.forEach((list) => {
        changeDue.innerHTML += `<p class="change">${list[0]}: $${list[1]}</p>`;
      });
    } else {
      const status = `<p>Status: CLOSED</p>`;
      changeDue.innerHTML = status;
      returnList.forEach((list) => {
        changeDue.innerHTML += `<span class="change">${list[0]}: $${list[1]}</span><br>`;
      });
    }
  }
};
