/*
Range Extraction
A format for expressing an ordered list of integers is to use a comma separated list of either

- individual integers
- or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example ("12, 13, 15-17")

Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.
 */

const assert = require('assert');

function solution(list) {
    const ret = [];
    let start = list[0];
    let end = list[0];
    let increment = null;

    list.slice(1).forEach((el, index) => {
        const prev = list[index];

        if (increment == null) {
            increment = el - prev;
        }

        const currentElementIsConsistent = Math.abs(el - prev) === 1;
        const endOfTheList = index === list.length - 2;

        if (currentElementIsConsistent) {
            end = el;
        }

        if (!currentElementIsConsistent || endOfTheList) {
            if (end - start > (1 * increment)) {
                ret.push(`${start}-${end}`);
            } else if (end != start) {
                ret.push(start, end);
            } else {
                ret.push(start);
            }

            if (endOfTheList && end != el) {
                ret.push(el);
            }

            start = el;
            end = el;
            increment = null;
        }
    });

    return ret.join(',');
}

assert.equal(
    solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]),
    '-6,-3-1,3-5,7-11,14,15,17-20',
);

assert.equal(
    solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20, 22]),
    '-6,-3-1,3-5,7-11,14,15,17-20,22',
);
