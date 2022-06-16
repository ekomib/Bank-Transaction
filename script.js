'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

alert(
  'Login with any of the following user and password details' +
    '\n' +
    '1.   kk - 1111' +
    '\n' +
    '2.   jd - 2222' +
    '\n' +
    '3.   stw - 3333' +
    '\n' +
    '4.   ss - 4444' +
    '\n'
);

const account1 = {
  owner: 'Kaiie Kaiie',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-04-05T17:01:17.194Z',
    '2022-04-06T17:01:17.194Z',
    '2022-04-07T17:01:17.194Z',
  ],
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');

const btnRegister = document.querySelector('.register__btn');
const inputRegister = document.querySelector('.elias');
const inputPin = document.querySelector('.levi');

// btnRegister.addEventListener('click', function (e) {
//   e.preventDefault();
//   const roma = inputRegister.value;
//   console.log(roma);
// });

const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const numFormatter = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

function dateFormat(date) {
  function daysInBetweenDates(date1, date2) {
    return Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  }

  const daysPassed = daysInBetweenDates(new Date(), date);
  console.log(daysPassed);
  const timee = navigator.language;
  const timeObj = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(timee, timeObj).format(date);
  }
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const sorter = acc.movements.slice().sort(function (a, b) {
    return a - b;
  });
  const movs = sort ? sorter : acc.movements;

  movs.forEach(function (move, i, arr) {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = dateFormat(date);

    // const options = {
    //   style: 'currency',
    //   currency: 'GBP',
    // };

    // const curren = new Intl.NumberFormat(navigator.language, options).format(
    //   move
    // );

    const curren = numFormatter(move, navigator.language, 'GBP');

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${curren}</div>
  </div>\n `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// const displayMovements = function (movements) {
//   containerMovements.innerHTML = '';
//   for (const [i, move] of movements.entries()) {
//     const type = move > 0 ? 'deposit' : 'withdrawal';
//     const html = ` <div class="movements__row">
//     <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//     <div class="movements__value">${move}</div>
//   </div>`;

//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   }
// };
// displayMovements(account1.movements);

const momentum = [200, 450, -400, 3000, -650, -130, 70, 1300];
const calcPrint = function (acc) {
  acc.printer = acc.movements.reduce(function (acc, value, index, arr) {
    return acc + value;
  }, 0);

  // const formatCurrency = new Intl.NumberFormat(navigator.language, {
  //   style: 'currency',
  //   currency: 'GBP',
  // }).format(acc.printer);

  const curren = numFormatter(acc.printer, navigator.language, 'GBP');

  labelBalance.textContent = `${curren}`;
  // return printer;
};

/// transactional using arrow function
const transactionTotal = function (acc) {
  const cashIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = numFormatter(cashIn, navigator.language, 'GBP');
  // labelSumIn.textContent = `${cashIn.toFixed(2)}£`;

  const cashOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = numFormatter(
    Math.abs(cashOut),
    navigator.language,
    'GBP'
  );
  // labelSumOut.textContent = `${Math.abs(cashOut).toFixed(2)}£`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = numFormatter(
    interest,
    navigator.language,
    'GBP'
  );
  // labelSumInterest.textContent = `${interest.toFixed(2)}£`;
};

// const cashInside = function (mov) {
//   const cashInflow = mov
//     .filter(function (mov) {
//       return mov > 0;
//     })
//     .reduce(function (acc, mov) {
//       return acc + mov;
//     }, 0);
//   labelSumIn.textContent = `${cashInflow}£`;
//   return cashInflow;
// };
// console.log(cashInside(account1.movements));

// const cashOutside = function (mov) {
//   const cashOutFlow = mov
//     .filter(function (mov) {
//       return mov < 0;
//     })
//     .reduce(function (acc, mov) {
//       return acc + mov;
//     }, 0);
//   labelSumOut.textContent = `${Math.abs(cashOutFlow)}£`;
//   return cashOutFlow;
// };
// console.log(cashOutside(account1.movements));

// const interest = function (mov) {
//   const int = mov
//     .filter(function (value, index, arr) {
//       return value > 0;
//     })
//     .map(function (value, index, arr) {
//       return value * (1.2 / 100);
//     })
//     .filter(function (value) {
//       return value > 1;
//     })
//     .reduce(function (acc, value, index, arr) {
//       return acc + value;
//     });
//   labelSumInterest.textContent = `${int}£`;
//   return int;
// };

// interest(momentum);

console.log(accounts);
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};
createUserName(accounts);
console.log(accounts);

// const createUserName = function (user) {
//   const userName = user.toLowerCase().split(' ');
//   // console.log(userName);
//   const ekom = userName
//     .map(function (value, index, arr) {
//       console.log(value);
//       return value[0];
//     })
//     .join('');
//   return ekom;
// };
// console.log(createUserName('Steven Tom Woods')); // stw

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  //display balance
  calcPrint(acc);

  // display summary
  transactionTotal(acc);
};

/// Event handlers
let currentAccount;
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

const startLogOutTimer = function () {
  // Set time to 5 mins
  let time = 10;

  const timeSquare = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call print remaining time to UI
    labelTimer.textContent = `${min}: ${sec}`;

    time--;
    // when 0 seconds, stop timer and log out user

    if (time === 0) {
      clearInterval(timeSquare);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Login`;
    }
    // call timer every second
    setInterval(timeSquare, 1000);
  };
};

// ISO lanaguage code table

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });

  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Dipsplay UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // current date
    // const now = new Date();

    // const date = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${date}/${month}/${year}, ${hour}:${min}`;
    //date

    // const options = {
    //   hour: 'numeric',
    //   minute: 'numeric',
    //   day: 'numeric',
    //   month: 'long',
    //   year: 'numeric',
    //   weekday: 'long',
    // };
    const local = navigator.language;
    console.log(local);

    labelDate.textContent = new Intl.DateTimeFormat('en-GB', options).format(
      now
    );
    labelDate.textContent = new Intl.DateTimeFormat(local, options).format(now);

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    startLogOutTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.printer >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing thr transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    //update UI
    updateUI(currentAccount);
  }
});

console.log(accounts);

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      console.log(acc);
      return acc.username === currentAccount.username;
    });
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    // clear delete field
    inputCloseUsername.value = inputClosePin.value = '';

    //Login message
    labelWelcome.textContent = `Login`;
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  const percentValue = currentAccount.movements.some(function (mov) {
    return mov >= amount * 0.1;
  });

  if (amount > 0 && percentValue) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    //update UI

    setTimeout(() => updateUI(currentAccount), 8000);

    // updateUI(currentAccount) ;
  }

  inputLoanAmount.value = '';
});

let sorted = false;
console.log(!sorted);
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(acc, !sorted);
  sorted = !sorted;
});
console.log(!sorted);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
////Simple array method
let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

//Slice
console.log(arr.slice(1, -1));
console.log(arr.slice(2, -1));
console.log(arr.slice(1, -2));
console.log(arr.slice(3, -1));

console.log(arr.slice(2)); // slice from index postion 2
console.log(arr.slice(2, 4)); // slice from index position 2, and stop from index position 4
console.log(arr.slice(-1)); // slice the last element in the array
console.log(arr.slice(-2)); // slice from the second to last element in the array
console.log(arr.slice(1, -2)); // slice from index position 1 and stop from the second to last element in the array
console.log(arr.slice()); // shallow array copy
console.log([...arr]); // spread operator, which is the same as producing another copy of the array.. could be called a shallow copy.

//splice - works similarly to slice, but mutates the original array whilce slice doesn't

arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(1, 2));
console.log(arr.splice());
console.log(arr);

// reverse

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = [5, 4, 3, 2, 1];
const kokoM = arr2.reverse(arr2);
console.log(kokoM);
console.log(arr2);

arr.splice(0, 0, 'March', 'February');
console.log(arr);

//CONCAT
const letNum = arr.concat(arr2);
console.log(letNum);
console.log(arr);
console.log([...arr, ...arr2]); //this is an alternative to the concat method

//Join

console.log(letNum.join(' - '));
*/

/*
/// The At Array method
const arr = [23, 22, 34];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1));
console.log(arr.slice(-1)[0]);
console.log(...arr.slice(-1));
console.log(arr.at(-1));
console.log(arr.at(0));

console.log('Ibangaibiok'.at(5));

// const koko = [arr.at(0)];
// console.log(koko);

const kok = [1, 2, 4, 5, 6];

const kokl = kok.splice(2, 0, 3);
console.log(kok);
*/

/*
//looping arrays: using forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const movement of movements.entries()) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}
// using the for of loop with a counter
for (const [i, move] of movements.entries()) {
  if (move > 0) {
    console.log(`Movement ${i + 1}: You deposited ${move}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
  }
}
// for (const lomas of movements.values()) {
//   if (lomas > 0) {
//     console.log(`Movement  You deposited ${lomas}`);
//   } else {
//     console.log(`Movement  You deposited ${lomas}`);
//   }
// }

console.log('-----FOR EACH-------');
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });
// We say for each iteration check the value and print to console

movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(` Movement ${i + 1}: You deposited ${movement}\n
     `);
  } else {
    console.log(` Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

// const family = [
//   'b-koko',
//   'w-carol',
//   'd-Ibanga',
//   'm-fortune',
//   's-dioma',
//   'victoria',
//   'blessing',
// ];
// console.log('w-carol'.slice(0));
// family.forEach(function (fam, index, array) {
//   if (fam.at(0) === 'b-') {
//     console.log(`${fam} is Ekom's brother`);
//   } else if (fam.slice(0, 1) === 'w') {
//     console.log(`${fam} is Ekom's lovely Wife`);
//   } else if (fam[0] === 'd') {
//     console.log(`${fam} is Ekom's Dad. The man tried`);
//   } else if (fam.at(fam.length - 1) === 'e') {
//     console.log(`${fam} is Ekom's sweet mama. She's done so well`);
//   } else if (fam.slice(1) === '-dioma') {
//     console.log(`${fam} is Ekom's darling sister.`);
//   } else {
//     console.log(`My nieces are Victoria and Blessing`);
//   }
// });

//forEach on maps and sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//forEach on sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

// the value and key results produce the same output in sets, therefore the key is not really important.
currenciesUnique.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
});

const bansAPI = [
  'Lyods bank',
  'barclays',
  'HSBC',
  'GTB',
  'FIRST BANK',
  'MONZO',
  'fidility',
];

bansAPI.forEach(function (value, i, array) {
  console.log(`${i + 1}: ${value}`);
});
*/

/*
/// Data trasnformation => maps, filter, reduce
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

const mover = movements.map(function (value) {
  return value * euroToUsd;
});
console.log(movements);
console.log(mover);

// const mover = movements.map(value => value * euroToUsd);
// console.log(movements);
// console.log(mover);

const movementUSd = [];
for (const mov of movements.values()) {
  const arrr = mov * euroToUsd;
  movementUSd.push(arrr);
}
console.log(movementUSd);

// const moveDescp = movements.map(function (value, index, arr) {
//   if (value > 0) {
//     return ` ${index + 1}: You deposited ${value}`;
//   } else {
//     return ` ${index + 1}: You withdrew ${Math.abs(value)}`;
//   }
// });

const moveDescp = movements.map(function (value, index, arr) {
  return ` ${
    index + 1
  }: You  ${value > 0 ? 'deposited' : 'withdrew'} ${Math.abs(value)}`;
});

console.log(moveDescp);

// filter
function dep(cum) {
  const deposits = cum.filter(function (mov) {
    let koka;
    if (mov > 0) {
      koka = mov;
      console.log(koka);
      return koka;
    }
  });
  return deposits;
}

console.log(dep(movements));

const depositer = [];
for (const dom of movements.values()) {
  if (dom > 0) {
    depositer.push(dom);
  }
}

console.log(depositer);

const withdraw = movements.filter(function (movv) {
  // return movv < 0;
  if (movv < 0) {
    return movv;
  }
});

console.log(withdraw);

//Reduce

console.log(movements);

const balance = movements.reduce(function (acc, value, index, arr) {
  console.log(`Iteration ${index}: ${acc}`);
  return acc + value;
}, 0);

console.log(balance);

let bal = 0;
for (const mov of movements.values()) {
  bal = bal + mov;
  // console.log(dog);
}
console.log(bal);

//maximun value
console.log(movements);

const maxer = movements.reduce(function (acc, val, index, arr) {
  if (acc > val) {
    return acc;
  } else {
    return val;
  }
}, movements[0]);
console.log(maxer);

function rum() {
  let max = 0;
  for (const tom of movements) if (tom > max) max = tom;
  console.log(max);
  return max;
}

console.log(rum());
*/

/*
/// The magic of chaining methods

const euroToUsd = 1.1;

const totdeposit = momentum
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (mov) {
    return mov * euroToUsd;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
console.log(totdeposit);

*/

/*
///The find method
const firstWithdrawal = momentum.find(function (mov) {
  return mov < 0;
});
console.log(momentum);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(function (acc) {
  return acc.owner === 'koko';
});

let abc;
for (const acc of accounts.values()) {
  if (acc.owner === 'Koko') {
    abc = acc;
  }
}
console.log(abc);

// console.log(account);
*/

/*
///Some and every method
console.log(momentum);
console.log(momentum.includes(-130));

const anyDeposits = momentum.some(function (mov) {
  return mov > 5000;
});
console.log(anyDeposits);

const depo = momentum.every(function (mov) {
  return mov > 0;
});

const dep = account4.movements.every(function (mov) {
  return mov > 0;
});

console.log(depo, dep);

// Writing a function seperately and calling it back in an array method
const deposit = function (mov) {
  return mov > 0;
};
console.log(momentum.filter(deposit));
console.log(momentum.map(deposit));
console.log(momentum.some(deposit));
// side note
// const cola = [23, 24, 'Ekom', 45];
// console.log(cola.indexOf(23));
// console.log(cola.includes(45));
*/

/*
///FLat and FLat map
const arr = [...[1, 2, 3], ...[4, 5, 6], 7, 8];
console.log(arr);

const ar = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1));
console.log(arrDeep.flat(2));

// Another example of Writing a function seperately and calling it back in an array method
// const returnMoves = function (mov) {
//   return mov.movements;
// };
// console.log(accounts.map(returnMoves));

const returnMoves = accounts.map(function (mov) {
  return mov.movements;
});

const allMovements = returnMoves.flat();
console.log(allMovements);

console.log(accounts);

const overalBalance = allMovements.reduce(function (acc, val, index, arr) {
  return acc + val;
}, 0);

console.log(overalBalance);

const overBalance = accounts
  .map(function (mov) {
    return mov.movements;
  })
  .flat()
  .reduce(function (acc, val) {
    return acc + val;
  }, 0);

console.log(overBalance);


const overBalance2 = accounts
  .flatmap(function (mov) {
    return mov.movements;
  })
  .reduce(function (acc, val) {
    return acc + val;
  }, 0);
  */

/*
//Sorting arrays
//Sorting with strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

//Numbers
//Sorts like string, first alphabet number
console.log(momentum);
console.log(momentum.sort());

const num = [11, 31, 21, 51, 41];
console.log(num.sort());

//return < 0, A,B (keep order)
//return > 0, B,A (switch order)
//Ascending order of sorting
momentum.sort(function (a, b) {
  console.log(a, b);
  if (a > b) {
    return 1;
  }
  if (a < a) return -1;
});

momentum.sort(function (a, b) {
  return a - b;
});
console.log(momentum);

// descending order of sorting
momentum.sort(function (a, b) {
  if (a > b) {
    return -1;
  }
  if (a < a) return 1;
});

momentum.sort(function (a, b) {
  return b - a;
});
console.log(momentum);
*/

/*
// More ways of creating and filling arrays

console.log([1, 2, 3, 4, 5, , 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// x.fill(1);
// x.fill(1, 3);
x.fill(1, 3, 5);
console.log(x);

// you can also use the fill method on already existing arrays
const arr = [1, 2, 3, 4, 5, 6, 7];

arr.fill(2, 4, 6);
console.log(arr);

//Array.from

const y = Array.from({ length: 7 }, function () {
  return 1;
});
console.log(y);

const z = Array.from({ length: 7 }, function (_, i) {
  return i + 1;
});
console.log(z);

// the _ is a throwaway variable, we are just defining it

// Array with 100 dice rolls
const arrDice = Array.from({ length: 100 }, function (_, i) {
  return i + 1;
});
console.log(arrDice);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    function (mov) {
      return mov.textContent.replace('£', '');
    }
  );
  console.log(movementsUI);

  // const limo = movementsUI.map(function (mov) {
  //   return mov.textContent.replace('£', '');
  // });
  // console.log(limo);
  /// Because the map function cannot be attached to the movementsUI variable, we simply attached a comma and write the function itself without the map

  // Another way taking the values from the dom and putting them in a new array
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

*/

/*
//////Arrray methods practice

//1.
const bankDepositSum = accounts
  .flatMap(function (mov) {
    return mov.movements;
  })
  .filter(function (mov) {
    return mov > 0;
  })
  .reduce(function (acc, val) {
    return acc + val;
  });

console.log(bankDepositSum);

//2.

const deposit1000 = accounts
  .flatMap(function (val) {
    return val.movements;
  })
  .filter(function (mov) {
    return mov > 1000;
  }).length;
console.log(deposit1000);

const deposit10001 = accounts
  .flatMap(function (val) {
    return val.movements;
  })
  .reduce(function (acc, val) {
    return val >= 1000 ? ++acc : acc;
  }, 0);

// Prefix ++ operator
let a = 10;
console.log(a++); //10
console.log(a); //11
let b = 10;
console.log(++b); //11
console.log(b); //11

console.log(deposit10001);

///3.
const sum = accounts
  .flatMap(function (mov) {
    return mov.movements;
  })
  .reduce(
    function (acc, val) {
      val > 0 ? (acc.deposits += val) : (acc.withdrawals += val);
      //OR
      // acc[val > 0 ? 'deposits' : 'withdrawals'] += val;
      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sum);

const { deposits, withdrawals } = sum;
console.log(deposits, withdrawals);

//4.

const convertTitle = function (title) {
  const capitalize = function (str) {
    return str[0].toUpperCase() + str.slice(1);
  };
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return exceptions.includes(word) ? word : capitalize(word);
    })
    .join(' ');
  return capitalize(titleCase);
};

// console.log(run);
// const tit = run;

*/

function ekomCash(numo) {
  const rap = numo[0];
  console.log(rap);
  const rum = numo.slice(1);
  console.log(rum);

  if (rum.length === 3) {
    return `${rap},${rum}`;
  } else {
    return numo;
  }
}

console.log(ekomCash('1500'));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (
//     val,
//     ind,
//     arr
//   ) {
//     if (ind % 2 === 0) val.style.backgroundColor = 'pink';
//     if (ind % 3 === 0) val.style.backgroundColor = 'blue';
//   });
// });
