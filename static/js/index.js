const serverSocket = io("http://localhost:8080/");

const listadoProducts = document.getElementById("listadoproducts");
const titulo = document.getElementById("titulo");
const codigo = document.getElementById("codigo");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
const descripcion = document.getElementById("descripcion");
const categoria = document.getElementById("categoria");
const guardarproducto = document.getElementById("guardar");
const form = document.getElementById("form");

//chat
const mensajesContainer = document.getElementById('mensajes')
const name1 = document.getElementById('name')
const msg = document.getElementById('msg')
const but = document.getElementById('buton')

serverSocket.on('actualizarproducts', datosAdjuntos => {
  console.log(datosAdjuntos);
  renderizarPage()
})

if (mensajesContainer) {

  Swal.fire({
    title: 'Identificate',
    input: 'text',
    inputValidator: (value) => {
      return !value && '¡Necesitas escribir un nombre para chatear!'
    },
    allowOutsideClick: false
  }).then((res) => {
    name1.value = res.value
    // avisa que se logeo un usuario
    serverSocket.emit('nuevousuario', name1.value)
  })
  
}


if (guardarproducto) {

guardarproducto.addEventListener("click", (e) => {
  e.preventDefault();
  const newProduct = {
    title: titulo.value,
    description: descripcion.value,
    code: codigo.value,
    price: precio.value,
    stock: stock.value,
    category: categoria.value,
  };

  axios
    .post("http://localhost:8080/api/products", newProduct)
    .then((res) => {
      
      alert("producto guardado con exito");
      form.reset();
      
    })
    .catch((err) => console.log(err));
  serverSocket.emit("newProduct", newProduct);
  // renderizarPage()
});
}
const getproductsAll = async () => {
  const data = await axios.get("http://localhost:8080/api/products");  
  const productos = data.data.data;
  return productos;
};

const obtenerMensajes = async () => {
  const data = await axios.get('http://localhost:8080/api/messages')
  const mensajes = data.data.data
  return mensajes
}

const renderizarPage = async () => {
  const productos = await getproductsAll();
  const mensajesRecibidos = await obtenerMensajes()
  if (listadoProducts) {
    listadoProducts.innerHTML = ""
    productos.map((prod) => {
      let product = `
      <div class="card m-2" style="width: 18rem">
      <div class="card-body">
      <h5 class="card-title">${prod.title}</h5>
      <p class="card-text">${prod.description}</p>
      <p class="card-text">precio: ${prod.price}</p>
      <button class="btn btn-danger" onclick="deleteProduct('${prod._id}')" >Borrar</button>
      </div>
      </div>`;
      listadoProducts.innerHTML += product;
    });

  }
  else {


  mensajesContainer.innerHTML = ''
  mensajesRecibidos.map((ms) => {
    const msg = `  <p class="mt-3"> <b> ${ms.user} dice: </b> ${ms.message} </p>`
    mensajesContainer.innerHTML += msg
  })
  }

};

const deleteProduct = (id) => {

  axios.delete(`http://localhost:8080/api/products/${id}`).then((res) => {
    alert("producto eliminado exitosamente");
    serverSocket.emit("deleteProduct", 'elimine product');
    // renderizarPage()
  });
};

const sendMsg = async () => {
  console.log(name1.value, msg.value);
  await axios.post('http://localhost:8080/api/messages/createmessage', {
    user: name1.value,
    message: msg.value
  })
  name1.value = ''
  msg.value = ''  
}

if (mensajesContainer) {
  
  but.addEventListener('click', () => {
    sendMsg()
    serverSocket.emit('chat', 'user envio mensaje')
  })
}

renderizarPage()

serverSocket.on("nuevousuario", (nomuser) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    title: `${nomuser} se ha unido al chat`,
    icon: "success",
  });
});