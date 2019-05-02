const ALIVE = "rgb(65, 65, 65)";
const DEAD = "rgb(255, 255, 255)";
const SPEED = 72;
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

let cells = new Array();
let inPlay = false;

function isAlive(row, col) {
    return (cells[row][col].style.backgroundColor === ALIVE);
}

function getNeighbours(i, j) {
    let neighbours = 0;

    for (let k = 0; k < OFFSET.length; ++k) {
        let row = (i + OFFSET[k][0] + cells.length) % cells.length;
        let col = (j + OFFSET[k][1] + cells.length) % cells.length;
        if (isAlive(row, col))
            ++neighbours;
    }
    
    return neighbours;
}

function tick() {
    let deaths = new Array();
    let births = new Array();

    for (let i = 0, k = 0, l = 0; i < cells.length; ++i) {
        for (let j = 0; j < cells.length; ++j) {
            let neighbours = getNeighbours(i, j);
            if (isAlive(i, j) && neighbours < 2 || neighbours > 3)
                deaths[k++] = [i, j];
            else if (!isAlive(i, j) && neighbours === 3)
                births[l++] = [i, j];
        }
    }

    for (let i = 0; i < births.length; ++i)
        cells[births[i][0]][births[i][1]].style.backgroundColor = ALIVE;
    for (let i = 0; i < deaths.length; ++i)
        cells[deaths[i][0]][deaths[i][1]].style.backgroundColor = DEAD;
}

function userHas(seed) {
    return true;
}

function start() {
    if (inPlay) {
        return;
    } else {
        inPlay = true;
        setInterval(tick, SPEED);
    }
}

function create(seed) {
    let row;
    let col;
    
    if (!userHas(seed)) {
        alert("You need to visit our store!");
        return;
    }
    
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

function init(size) {
    let row;
    let world = document.getElementById("world");
    let cell;

    for (let i = 0; i < SIZE; ++i) {
        row = document.createElement("tr");
        world.appendChild(row);

        for (let j = 0; j < SIZE; ++j) {
            cell = document.createElement("td");
            cell.width = "12px";
            cell.height = "12px";
            cell.className = "row-" + i;
            row.appendChild(cell);
        }
        cells[i] = document.getElementsByClassName("row-" + i);
    }

    for (let i = 0; i < cells.length; ++i) {
        for (let j = 0; j < cells.length; ++j)
            cells[i][j].style.backgroundColor = DEAD;
    }
}

function main() {
    let gliderBtn = document.getElementById("gliderBtn");
    let lwssBtn = document.getElementById("lwssBtn");
    let pentaBtn = document.getElementById("pentaBtn");
    let explBtn = document.getElementById("explBtn");
    let startBtn = document.getElementById("startBtn");
    
    init();
    
    gliderBtn.addEventListener("click", function() { create("glider"); });
    lwssBtn.addEventListener("click", function() { create("lwss"); });
    pentaBtn.addEventListener("click", function() { create("penta"); });
    explBtn.addEventListener("click", function() { create("expl"); })
    startBtn.addEventListener("click", start);
}
