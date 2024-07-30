export const pathService = {
    formatInput
}

var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;



function formatInput(rawInput) {
    console.log('rawInput: ', rawInput)
    const grid = getGrid(rawInput)
}

function getGrid(rawInput) {
    const allNumbers = getAllNumbers(rawInput)
    const numberOfRows = getNumberOfRows(allNumbers)
    const emptyGrid = getEmptyGrid(numberOfRows)
    // TODO: populate grid

}

// Get an array of numbers, if an item is not a number skip it. 
function getAllNumbers(rawInput) {
    const allNumbers =
        rawInput
            .replaceAll('\n', ' ')
            .split(' ')
            .map((item) => {
                const parsedNumber = parseInt(item, 10)
                if (isNaN(parsedNumber)) {
                    return null
                }
                return parsedNumber
            })
            .filter(item => item !== null)

    console.log('allNumbers: ', allNumbers)
    return allNumbers
}


function getNumberOfRows(allNumbers) {
    const numbersAmount = allNumbers.length
    // Solve number of rows per this formula:
    // n(n+1) = 2 * numbersAmount
    let n = algebra.parse('n')
    let twoNumbersAmount = algebra.parse("2 * " + numbersAmount)
    let equation = new algebra.Equation(n.pow(2).add(n).subtract(twoNumbersAmount), 0)
    let solution = equation.solveFor("n").filter(solution => solution >= 0)
    const numberOfRows = parseInt(solution)
    return numberOfRows
}

function getEmptyGrid(numberOfRows) {
    const emptyGrid = Array.from({ length: numberOfRows }, () => Array(numberOfRows).fill(null))
    return emptyGrid
}