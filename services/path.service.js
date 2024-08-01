export const pathService = {
    getPathsMap
}

function getPathsMap(rawInput) {
    try {
        const grid = getGrid(rawInput)
        const paths = getPaths(grid)
        const pathSumFrequencyMap = getPathSumFrequencyMap(paths)
        const formattedSumsMap = formatSumsMap(pathSumFrequencyMap)
        return formattedSumsMap
    } catch (error) {
        console.error('Error in getPathsMap:', error)
        throw new Error('Failed to generate paths map')
    }
}

function getGrid(rawInput) {
    try {
        const allNumbers = getAllNumbers(rawInput)
        const numberOfRows = getNumberOfRows(allNumbers)
        const emptyGrid = getEmptyGrid(numberOfRows)
        const populatedGrid = populateGrid(emptyGrid, allNumbers)
        return populatedGrid
    } catch (error) {
        console.error('Error in getGrid:', error)
        throw new Error('Failed to create grid')
    }
}

// Get an array of numbers, if an item is not a number skip it. 
function getAllNumbers(rawInput) {
    const allNumbers =
        rawInput
            .replaceAll(/\D/g, ' ') // Replace any character that is not a digit with a space.
            .trim()
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
    const { parse, Equation } = algebra
    const numbersAmount = allNumbers.length
    let n = parse('n')
    let twoNumbersAmount = parse("2 * " + numbersAmount)
    let equation = new Equation(n.pow(2).add(n).subtract(twoNumbersAmount), 0)
    try {
        let solutions = equation.solveFor("n").filter(solution => solution >= 0)
        if (solutions.length === 0) {
            throw new Error('No valid solution for the number of rows found.');
        }
        // Round to the nearest integer and select the maximum valid solution
        const numberOfRows = Math.max(...solutions.map(Math.round))
        return numberOfRows
    } catch (error) {
        console.error('Error calculating number of rows:', error.message)
    }
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

function getPaths(grid, rowIdx = 0, cellIdx = 0, path = []) {
    try {
        const gridLength = grid.length
        path.push(grid[rowIdx][cellIdx])
        // After reaching the last row, return the path.
        if (rowIdx === gridLength - 1) {
            return [path]
        }

        const paths = []
        if (cellIdx + 1 < gridLength) {
            const nextCellIdxOptions = getNextStepIdxOptions(cellIdx)
            nextCellIdxOptions.forEach(cellIdxOption => {
                if (grid[rowIdx + 1][cellIdxOption]) {
                    paths.push(...getPaths(grid, rowIdx + 1, cellIdxOption, path.slice()))
                }
            })
        }
        return paths
    } catch (error) {
        console.error('Error in getPaths:', error)
        throw new Error('Failed to get paths')
    }
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
    return sums
}

function formatSumsMap(sumsMap) {
    const formattedSumsMap = Object.entries(sumsMap)
        .map(([sum, count]) => ({ sum: parseInt(sum, 10), count }))
        .sort((a, b) => b.count - a.count)
    return formattedSumsMap
}