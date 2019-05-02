/* The colours used for the game pieces (JL) */
const ALIVE = "rgb(65, 65, 65)";
const DEAD = "rgb(255, 255, 255)";
/* The size for game board, and the speed of its "ticks" (JL) */
const SIZE = 50;
const SPEED = 72;
/* The game pieces stored as arrays of relative positions (JL) */
const EXPL = [
    [0, 0], [0, 2], [1, 2], [2, 2],
    [3, 2], [4, 2], [4, 0], [4, -2],
    [3, -2], [2, -2], [1, -2], [0, -2]
];
const GLIDER = [
    [0, 0], [1, 1], [2, 1], [2, 0],
    [2, -1]
];
const LWSS = [
    [0, 0], [0, 3], [2, 3], [3, 2],
    [3, 1], [3, 0], [3, -1], [2, -1],
    [1, -1]
];
const OFFSET = [
    [1, -1], [1, 0], [1, 1], [0, -1],
    [0, 1], [-1, 1], [-1, 0], [-1, -1]
];
const PENTA = [
    [-4, 0], [-3, 0], [-2, 1], [-2, -1],
    [-1, 0], [0, 0], [1, 0], [2, 0], 
    [3, 1], [3, -1], [4, 0], [5, 0]
];

/* The array for the game world (JL) */
let cells = new Array();
/* Whether the game is in play or not (JL) */
let inPlay = false;

/* Function to check if a cell is dead or alive (JL) */
function isAlive(row, col) {
    return (cells[row][col].style.backgroundColor === ALIVE);
}

/* Function to get the number of neighbours a cell has (JL) */
function getNeighbours(i, j) {
    let neighbours = 0;

    for (let k = 0; k < OFFSET.length; ++k) {
        /* Use modulus to enable cell wrapping (JL) */
        let row = (i + OFFSET[k][0] + cells.length) % cells.length;
        let col = (j + OFFSET[k][1] + cells.length) % cells.length;
        if (isAlive(row, col))
            ++neighbours;
    }
    
    return neighbours;
}

/* Function that iterates over the game world and updates it (JL) */
function tick() {
    /*
     * Because the cells need to be updated simultaneously, we need
     * arrays to store all the cells that need to be updated on each
     * "tick" (JL)
     */
    let deaths = new Array();
    let births = new Array();

    /* Nested for loop to iterate over the world and check for changes (JL) */
    for (let i = 0, k = 0, l = 0; i < cells.length; ++i) {
        for (let j = 0; j < cells.length; ++j) {
            let neighbours = getNeighbours(i, j);
            if (isAlive(i, j) && neighbours < 2 || neighbours > 3)
                deaths[k++] = [i, j];
            else if (!isAlive(i, j) && neighbours === 3)
                births[l++] = [i, j];
        }
    }

    /* Two loops to update cull and birth the cells that need updating (JL) */
    for (let i = 0; i < births.length; ++i)
        cells[births[i][0]][births[i][1]].style.backgroundColor = ALIVE;
    for (let i = 0; i < deaths.length; ++i)
        cells[deaths[i][0]][deaths[i][1]].style.backgroundColor = DEAD;
}

/* Function to check if the user owns the piece she wants to place (JL) */
function userHas(seed) {
    return true;
}

/* Function to conditionally start the game (JL) */
function start() {
    let startBtn = document.getElementById("startBtn");

    if (inPlay) {
        return;
    } else {
        inPlay = true;
        /* Sets the start button to insensitive once the game begins (JL) */
        startBtn.setAttribute("disabled", "true");
        /* Runs tick() at the interval specified by SPEED (in ms) (JL) */
        setInterval(tick, SPEED);
    }
}

/* Function that creates the game pieces (JL) */
function create(seed) {
    let row;
    let col;
    
    /* Checks if the user owns the piece she wants to use (JL) */
    if (!userHas(seed)) {
        alert("You need to visit our store!");
        return;
    }
    
    /*
     * This switch block creates the piece the user corrected by checking
     * the seed string and using the relative position arrays of each
     * piece (JL)
     */
    switch (seed) {
        case "expl":
            row = parseInt(cells.length - (cells.length * 0.25));
            col = parseInt(cells.length - (cells.length * 0.85));
            for (let i = 0; i < EXPL.length; ++i)
                cells[row + EXPL[i][0]][col + EXPL[i][1]].style.backgroundColor = ALIVE;
            break;
        case "glider":
            row = col = parseInt(cells.length - (cells.length * 0.85));
            for (let i = 0; i < GLIDER.length; ++i)
                cells[row + GLIDER[i][0]][col + GLIDER[i][1]].style.backgroundColor = ALIVE;
            break;
        case "lwss":
            row = parseInt(cells.length / 2);
            col = parseInt(cells.length - (cells.length * 0.25));
            for (let i = 0; i < LWSS.length; ++i)
                cells[row + LWSS[i][0]][col + LWSS[i][1]].style.backgroundColor = ALIVE;
            break;
        case "penta":
            row = col = parseInt(cells.length / 2);
            for (let i = 0; i < PENTA.length; ++i)
                cells[row + PENTA[i][0]][col + PENTA[i][1]].style.backgroundColor = ALIVE;
            break;
        default:
            console.log("error: malformed seed: " + seed);
            break;
    }
}

/* Function to create and initialize the game world dynamically (JL) */
function init() {
    let row;
    let world = document.getElementById("world");
    let cell;

    for (let i = 0; i < SIZE; ++i) {
        /* Creates a table row and appends it to the world table (JL) */
        row = document.createElement("tr");
        world.appendChild(row);

        for (let j = 0; j < SIZE; ++j) {
            /*
             * Creates the table date, sets its size, sets its name and
             * appends it to the row created above (JL)
             */
            cell = document.createElement("td");
            cell.width = "12px";
            cell.height = "12px";
            cell.className = "row-" + i;
            row.appendChild(cell);
        }
        /* Adds each completed row into a 2D array (JL) */
        cells[i] = document.getElementsByClassName("row-" + i);
    }

    /* Sets every cell to "dead" once created (JL) */
    for (let i = 0; i < cells.length; ++i) {
        for (let j = 0; j < cells.length; ++j)
            cells[i][j].style.backgroundColor = DEAD;
    }
}

/* Main function that loads upon opening the game page (JL) */
function main() {
    let gliderBtn = document.getElementById("gliderBtn");
    let lwssBtn = document.getElementById("lwssBtn");
    let pentaBtn = document.getElementById("pentaBtn");
    let explBtn = document.getElementById("explBtn");
    let startBtn = document.getElementById("startBtn");
    
    init();
    
    /* Add onclick listeners to the buttons on the game page (JL) */
    gliderBtn.addEventListener("click", function() { create("glider"); });
    lwssBtn.addEventListener("click", function() { create("lwss"); });
    pentaBtn.addEventListener("click", function() { create("penta"); });
    explBtn.addEventListener("click", function() { create("expl"); })
    startBtn.addEventListener("click", start);
}
