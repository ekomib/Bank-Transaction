'use strict';

/*
// const checkDogs = function (dog1, dog2) {
//   const copy = dog1;
//   console.log(copy);
//   copy.splice(0, 1);
//   copy.splice(-2);
//   console.log(copy);

//   const mainDogs = copy.concat(dog2);
//   console.log(mainDogs);

//   for (let [i, dog] of mainDogs.entries()) {
//     dog = dog >= 3 ? 'adult' : 'puppy';
//     console.log(`Dog ${i + 1}: is a ${dog} `);
//   }
// };

// checkDogs([1, 2, 3, 5, 6], [4, 5, 4, 6, 6]);

function checkDogs(dogAge1, dogAge2) {
  const shallowDogCopy = dogAge1.slice();
  console.log(shallowDogCopy);
  const correctArray = [...shallowDogCopy.slice(1, -2), ...dogAge2];
  console.log(correctArray);

  correctArray.forEach(function (value, index, arr) {
    const dogLevel = value >= 3 ? 'Adult' : 'Puppy';
    let a;

    console.log(
      `Dog number ${index + 1} is ${(a =
        dogLevel === 'Adult' ? 'an' : 'still a')} ${dogLevel}  ${(value =
        dogLevel === 'Adult' ? `and is ${value} years old` : '')} `
    );
  });

  // for (const [i, dog] of correctArray.entries()) {
  //   const dogLevel = dog >= 3 ? 'Adult' : 'Puppy';
  //   let a;
  //   console.log(
  //     `Dog number ${i + 1} is ${(a =
  //       dogLevel === 'Adult' ? 'an' : 'a')} ${dogLevel} and is ${dog} years old`
  //   );
  // }
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/

//challenge 2
const calcAverageHumanAge = function (dogAge) {
  const humanAge = dogAge.map(function (value, index, arr) {
    let human = 0;
    if (value <= 2) {
      human = 2 * value;
    } else if (value > 2) {
      human = 16 + value * 4;
    }
    return human;
  });
  console.log(humanAge);

  const exclusion = humanAge.filter(function (value, index, arr) {
    return value > 18;
  });
  console.log(exclusion);
  // console.log(exclusion);

  const average = exclusion.reduce(function (acc, value, index, arr) {
    return acc + value / arr.length;
  }, 0);
  // return exclusion;
  return average; /// exclusion.length;

  // return humanAge;
};

const humanAge1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

const humanAge2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(humanAge1, humanAge2);

const dogAge = [5, 2, 4, 1, 15, 8, 3, 200, 19];
const exclusion = dogAge.filter(function (value, index, arr) {
  return value < 18;
});
console.log(exclusion);

const dogger = function (dogArray) {
  const dogAge = dogArray
    .map(function (val) {
      return val <= 2 ? val * 2 : 16 + val * 4;
    })

    .filter(function (val) {
      return val > 18;
    })
    .reduce(function (acc, val, index, arr) {
      return acc + val / arr.length;
    }, 0);
  console.log(dogAge);
  return dogAge;
};

const ink = dogger([16, 6, 10, 5, 6, 1, 4]);
const ink2 = dogger([5, 2, 4, 1, 15, 8, 3]);
console.log(ink, ink2);

const dogAge1 = [5, 2, 4, 1, 15, 8, 3, 200, 19];

const dogFoodPortion = dogAge1.map(function (val, index, arr) {
  return val * 2;
});

console.log(dogFoodPortion);

//3.
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
dogs.forEach(function (val, ind, arr) {
  return (val.recFood = Math.trunc(val.weight ** 0.75 * 28));
});

console.log(dogs);

//2.
const dogSarah = dogs.find(function (val, ind, arr) {
  return val.owners.includes('Sarah');
});

console.log(dogSarah);
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recFood ? 'too much' : 'little'
  } `
);

// 3.

const ownersEatTooMuch = dogs
  .filter(function (val, ind, arr) {
    return val.curFood > val.recFood;
  })
  .flatMap(function (val, ind, arr) {
    return val.owners;
  });

console.log(ownersEatTooMuch);

//4.

const ownersEatTooLittle = dogs
  .filter(function (val, ind, arr) {
    return val.curFood < val.recFood;
  })
  .flatMap(function (val, ind, arr) {
    return val.owners;
  });

console.log(ownersEatTooLittle);

//5.
console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat too much`);

console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little`);

//6.
const eatRecFood = dogs.some(function (val) {
  return val.curFood === val.recFood;
});

console.log(eatRecFood);

//7.

const eatOkayFood = dogs.some(function (val, ind, arr) {
  return val.curFood > val.recFood * 0.9 && val.curFood < val.recFood * 1.1;
});

console.log(eatOkayFood);

//8.
const checkOkayEat = dogs.filter(function (val, ind, arr) {
  return val.curFood > val.recFood * 0.9 && val.curFood < val.recFood * 1.1;
});
//OR

console.log(checkOkayEat);

const dogSorted = dogs.slice().sort(function (a, b) {
  return a.recFood - b.recFood;
});

console.log(dogSorted);
