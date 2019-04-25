let glider = {
	'name': "glider",
	'price': 1.00,
	'quantity': 0
};

let lwss = {
	'name': "lwss",
	'price': 2.50,
	'quantity': 0
};

let penta = {
	'name': "penta",
	'price': 5.99,
	'quantity': 0
};

let expl = {
	'name': "expl",
	'price': 6.99,
	'quantity': 0
};

let test;

function addGlider() {	
	glider.quantity = Number(document.getElementById("gliderInput").value);
	localStorage.setItem ('glider', JSON.stringify(glider));
}

function addLwss() {	
	lwss.quantity = Number(document.getElementById("lwssInput").value);
	localStorage.setItem ('lwss', JSON.stringify(lwss));
}

function addPenta() {
	penta.quantity = Number(document.getElementById("pentaInput").value);
	localStorage.setItem ('penta', JSON.stringify(penta));
}

function addExpl() {
	expl.quantity = Number(document.getElementById("explInput").value);
	localStorage.setItem ('expl', JSON.stringify(expl));
}