export const pathService = {
    getPathsMap
}

var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

function getPathsMap(rawInput) {
    const grid = getGrid(rawInput)
}

function getGrid(rawInput) {
    const allNumbers = getAllNumbers(rawInput)
    const numberOfRows = getNumberOfRows(allNumbers)
    const emptyGrid = getEmptyGrid(numberOfRows)
    const populatedGrid = populateGrid(emptyGrid, allNumbers)
    console.log('populatedGrid: ', populatedGrid)

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
    return allNumbers
}


function getNumberOfRows(allNumbers) {
    // Solve number of rows per this formula:
    // n(n+1) = 2 * numbersAmount
    const {parse, Equation} = algebra 
    const numbersAmount = allNumbers.length
    let n = parse('n')
    let twoNumbersAmount = parse("2 * " + numbersAmount)
    let equation = new Equation(n.pow(2).add(n).subtract(twoNumbersAmount), 0)
    let solution = equation.solveFor("n").filter(solution => solution >= 0)
    const numberOfRows = parseInt(solution)
    return numberOfRows
}

function getEmptyGrid(num) {
    // Create a two-dimensional array (grid) with num as the specified number of rows and columns.
    // Initialize each item in the grid to null.
    const emptyGrid = Array.from({ length: num }, () => Array(num).fill(null))
    return emptyGrid
}

function populateGrid(emptyGrid, allNumbers) {
    const allNumbersCopy = [...allNumbers]
    const populatedGrid = emptyGrid.map((row, rowIdx) => {
        return row.map((item, itemIdx) => {
            return (itemIdx <= rowIdx) ? allNumbersCopy.shift() : null
        })
    })
    return populatedGrid
}