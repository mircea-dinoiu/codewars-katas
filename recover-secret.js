const assert = require('assert');

const secret1 = "whatisup"
const triplets1 = [
  ['t','u','p'],
  ['w','h','i'],
  ['t','s','u'],
  ['a','t','s'],
  ['h','a','p'],
  ['t','i','s'],
  ['w','h','s']
]

const initLetter = function (lettermap, letter) {
    if (lettermap[letter] == null) {
        lettermap[letter] = 0;
    }
}

const recoverSecret = function(triplets) {
    const ret = [];
    const lettermap = {};

    for (const arr of triplets) {
        const l1 = arr[0];
        const l2 = arr[1];
        const l3 = arr[2];
        let indexOfL1 = ret.indexOf(l1);
        let indexOfL2 = ret.indexOf(l2);
        let indexOfL3 = ret.indexOf(l3);

        if (!ret.includes(l1)) {
            const beforeL2 = Math.max(indexOfL2 - 1, 0);

            ret.splice(beforeL2, 0, l1);
        } else {
            if (indexOfL2 != -1 && indexOfL2 < indexOfL1) {
                ret.splice(indexOfL1, 1);
                ret.splice(indexOfL2, 0, l1);
            }
        }

        if (!ret.includes(l2)) {
            const afterL1 = ret.indexOf(l1) + 1;

            ret.splice(afterL1, 0, l2)
        } else {
            let indexOfL2 = ret.indexOf(l2);
            let indexOfL3 = ret.indexOf(l3);

            if (indexOfL3 != -1 && indexOfL3 < indexOfL2) {
                ret.splice(indexOfL2, 1);
                ret.splice(indexOfL3, 0, l2);
            }
        }

        if (!ret.includes(l3)) {
            const afterL2 = ret.indexOf(l2) + 1;

            ret.splice(afterL2, 0, l3);
        }
    }

    return ret.join('');
}

// assert.equal(recoverSecret(triplets1), secret1);
