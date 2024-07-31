export const pathService = {
    getPathsMap
}

function getPathsMap(rawInput) {
    const grid = getGrid(rawInput)
    const paths = getPaths(grid)
    const pathSumFrequencyMap = getPathSumFrequencyMap(paths)
    const formattedSumsMap = formatSumsMap(pathSumFrequencyMap)
    console.log('paths: ', paths)
    console.log('pathSumFrequencyMap: ', pathSumFrequencyMap)
    console.log('formattedSumsMap: ', formattedSumsMap)
    return formattedSumsMap

}

function getGrid(rawInput) {
    const allNumbers = getAllNumbers(rawInput)
    const numberOfRows = getNumberOfRows(allNumbers)
    const emptyGrid = getEmptyGrid(numberOfRows)
    const populatedGrid = populateGrid(emptyGrid, allNumbers)
    return populatedGrid
}

// Get an array of numbers, if an item is not a number skip it. 
function getAllNumbers(rawInput) {
    const allNumbers =
        rawInput
            .replaceAll('\n', ' ')
            .replaceAll(/\D/g, ' ')
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
    // Solve number of rows per this formula:
    // n(n+1) = 2 * numbersAmount
    const { parse, Equation } = algebra
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

function getPaths(grid, rowId = 0, cellIdx = 0, path = []) {
    const gridLength = grid.length
    path.push(grid[rowId][cellIdx])
    // After reaching the last row, return the path.
    if (rowId === gridLength - 1) {
        return [path]
    }

    const paths = []
    if (cellIdx + 1 < gridLength) {
        const nextCellIdxOptions = getNextStepIdxOptions(cellIdx)
        nextCellIdxOptions.forEach(cellIdxOption => {
            paths.push(...getPaths(grid, rowId + 1, cellIdxOption, path.slice()))
        })
    }
    return paths
}

function getNextStepIdxOptions(cellIdx) {
    const stepLeftIdx = cellIdx
    const stepRightIdx = cellIdx + 1
    return [stepLeftIdx, stepRightIdx]
}

function getPathSumFrequencyMap(paths) {
    const sums = getPathSums(paths)
    const pathSumFrequencyMap = sums.reduce((acc, sum) => {
        acc[sum] = (acc[sum] || 0) + 1
        return acc
    }, {})
    return pathSumFrequencyMap
}

function getPathSums(paths) {
    const sums = paths.map(path => {
        return path.reduce((sum, item) => sum + item, 0)
    })
    console.log('sums: ', sums)
    return sums
}

function formatSumsMap(sumsMap) {
    const formattedSumsMap = Object.entries(sumsMap)
        .map(([sum, count]) => ({ sum: parseInt(sum, 10), count }))
        .sort((a, b) => b.count - a.count)

    return formattedSumsMap
}