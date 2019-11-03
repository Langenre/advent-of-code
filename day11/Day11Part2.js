const input = 8868

const MIN_GRID_SIZE = 3
const MAX_GRID_SIZE = 3

function createGrid(input) {
    let grid = []
    for (let x = 1; x <= 300; x++) {
        grid[x] = []
        for (let y = 1; y <= 300; y++) {

            grid[x][y] = Math.floor(((((x + 10) * y + input) * (x + 10)) % 1000) / 100) - 5
        }
    }
    return grid
}

function searchMaxArea(grid) {
    let result = { x: 0, y: 0, size: 0, power: 0 };
    
    for (var size = MIN_GRID_SIZE; size <= MAX_GRID_SIZE; size++) {
        for (var y = 1; y < 300 - size; y++) {
            for (var x = 1; x < 300 - size; x++) {
          
                let power = 0;

                for (var col = 0; col < size; col++) {
                    for (var row = 0; row < size; row++) {
                        power += grid[x + row][y + col]
                    }
                }

                if (power > result.power) result = {x, y, size, power}
            }
        }
    }
    return result;
}

const grid = createGrid(input)
const result = searchMaxArea(grid)
