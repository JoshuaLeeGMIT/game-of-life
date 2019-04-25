const ALIVE = "rgb(0, 0, 0)";
const DEAD = "rgb(255, 255, 255)";
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

function isAlive(i, j) {
    return (cells[i][j].style.backgroundColor === ALIVE);
}

function getNeighbours(i, j) {
    let neighbours = 0;

    for (let k = 0; k < OFFSET.length; ++k) {
        let rWrap = (i + OFFSET[k][0] + cells.length) % cells.length;
        let cWrap = (j + OFFSET[k][1] + cells.length) % cells.length;
        if (isAlive(rWrap, cWrap))
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

function create(seed) {
    let rPos;
    let cPos;
    
    if (!userHas(seed)) {
        alert("You need to visit our store!");
        return;
    }
    
    switch (seed) {
        case "glider":
            rPos = cPos = parseInt(cells.length - (cells.length * 0.85));
            for (let i = 0; i < GLIDER.length; ++i)
                cells[rPos + GLIDER[i][0]][cPos + GLIDER[i][1]].style.backgroundColor = ALIVE;
            break;
        case "lwss":
            rPos = parseInt(cells.length / 2);
            cPos = parseInt(cells.length - (cells.length * 0.25));
            for (let i = 0; i < LWSS.length; ++i)
                cells[rPos + LWSS[i][0]][cPos + LWSS[i][1]].style.backgroundColor = ALIVE;
            break;
        case "penta":
            rPos = cPos = parseInt(cells.length / 2);
            for (let i = 0; i < PENTA.length; ++i)
                cells[rPos + PENTA[i][0]][cPos + PENTA[i][1]].style.backgroundColor = ALIVE;
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

    for (let i = 0; i < size; ++i) {
        row = document.createElement("tr");
        world.appendChild(row);

        for (let j = 0; j < size; ++j) {
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
    // let explBtn = document.getElementById("explBtn");
    let startBtn = document.getElementById("startBtn");
    
    init(50);
    
    gliderBtn.addEventListener("click", function() { create("glider"); });
    lwssBtn.addEventListener("click", function() { create("lwss"); });
    pentaBtn.addEventListener("click", function() { create("penta"); });
    // explBtn.addEventListener("click", function() { create("expl"); })
    startBtn.addEventListener("click", function() { setInterval(tick, 72); });
}
