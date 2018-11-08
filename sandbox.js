//Using the arguments variable in functions

var nums = [1, 3, 4];

function test(x, y, z) {

    return Array.prototype.reduce.call(arguments, function (acc, curr) {
        if (typeof curr === 'number') {
            acc += curr;
        }
        return acc;

    }, 0);
}
console.log(test(1, 2, 3, 4, 5, "Hello ", "World"));