console.log("hola");

let botonesComprar = document.querySelectorAll(".addToCart");

console.log(botonesComprar);

botonesComprar.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    console.log(e.target.id);

    if (localStorage.carrito) {
      //solucionar problema
      let carrito = JSON.parse(localStorage.carrito);
      console.log(carrito);
      let index = carrito.findIndex((prod) => prod.id == e.target.id);
      if (index != -1) {
        carrito[index].cantidad = carrito[index].cantidad + 1;
      } else {
        carrito.push({ id: e.target.id, cantidad: 1 });
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      localStorage.setItem(
        "carrito",
        JSON.stringify([{ id: e.target.id, cantidad: 1 }])
      );
    }
    Toastify({
      text: "producto agregado!",
      duration: 3000,
    }).showToast();
  });
});
