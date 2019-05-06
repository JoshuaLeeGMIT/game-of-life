function addToCart() {
	let cart = JSON.parse(localStorage.getItem('cart'));

	if(sessionStorage.loggedIn == 0)
	{
		alert("please sign in");
	}	
	else
	{
		alert("Successfuly added to cart");
		cart.nGliders += Number(document.getElementById("gliderInput").value);
		cart.nLwss +=  Number(document.getElementById("lwssInput").value);
		cart.nPenta +=  Number(document.getElementById("pentaInput").value);
		cart.nExpl +=  Number(document.getElementById("explInput").value);
		localStorage.cart = JSON.stringify(cart);
	}
}

function display() {
	document.getElementById("gDes").innerHTML = "A basic piece which perform a simple task. It travels in a diagonal direction. €1.00 a piece";
	document.getElementById("lDes").innerHTML = "A unique piece which perform a simple task. It travels in a straight direction. €2.50 a piece";
	document.getElementById("pDes").innerHTML = "A basic enough piece which perform a task for infinity. It can be broken by other piece upon collision. €5.99 a piece";
	document.getElementById("eDes").innerHTML = "A simple piece which perform a complex task for infinity. It can be broken by other piece upon collision. €6.99 a piece";
}
