/*Ad */
function addToCart() {
	/*Get localstorage cart(EL) */
	let cart = JSON.parse(localStorage.getItem('cart'));
	/*See if there logged in(EL) */
	if(sessionStorage.loggedIn == 1)
	{
		/*Add items to the cart(EL) */
		alert("Successfuly added to cart");
		cart.nGliders += Number(document.getElementById("gliderInput").value);
		cart.nLwss +=  Number(document.getElementById("lwssInput").value);
		cart.nPenta +=  Number(document.getElementById("pentaInput").value);
		cart.nExpl +=  Number(document.getElementById("explInput").value);
		localStorage.cart = JSON.stringify(cart);
	}
	else
	{
		alert("please sign in");
	}
}
/*Displays important infomation on page(EL) */
function display() {
		document.getElementById("gDes").innerHTML = "A basic piece which perform a simple task. It travels in a diagonal direction. €1.00 a piece";
		
		document.getElementById("lDes").innerHTML = "A unique piece which perform a simple task. It travels in a straight direction. €2.50 a piece";
		
		document.getElementById("pDes").innerHTML = "A basic enough piece which perform a task for infinity. It can be broken by other piece upon collision. €5.99 a piece";
		
		document.getElementById("eDes").innerHTML = "A simple piece which perform a complex task for infinity. It can be broken by other piece upon collision. €6.99 a piece";
}