const socket = io();

socket.on('connect', () => {
    console.log(socket.id);
});

let prod = []
let msg = []

socket.on('products', (data) => {
    prod = data;
    console.log(prod);
    let htmlToRender = '';
    for (let i = 0; i < prod.length; i++) {
        htmlToRender +=`
        <tr>
            <th scope="row">${prod[i].id}</th>
            <td>${prod[i].name}</td>
            <td>${prod[i].price}</td>
            <td><img height="60p" src="${prod[i].photo}" alt="${prod[i].name}"></td>
        </tr>
        `
    }
    document.querySelector('#products').innerHTML = htmlToRender;
});



socket.on('chat', (data) => {
    msg = data;
    console.log(msg);

    let htmlToRender = '';
    for (let i = 0; i < msg.length; i++) {
        htmlToRender +=`
        <tr>
            <td><p style="color:blue; font-weight: bold;">${msg[i].email}</p></td>
            <td><p style="color:rgb(65, 33, 1);">${msg[i].date}</p></td>
            <td><p style="color:green; font-style: italic;">${msg[i].message}</p></td>
        </tr>
        `    
    }
    document.querySelector('#message').innerHTML = htmlToRender;
});

function addMessage(addMessage){
    let messageToAdd = {
        email:addMessage.email.value,
        message:addMessage.message.value,
        date: new Date().toLocaleDateString()
    };
    socket.emit('newMessage', messageToAdd);
};

function addProduct(addProduct){
    let productToAdd = {
        name:addProduct.name.value,
        price:addProduct.price.value,
        photo:addProduct.photo.value,
    };
    socket.emit('addProduct', productToAdd);
};


// function addProduct(addProduct){
//     console.log(addProduct);
//     let productToAdd = {
//         name:addProduct.name.value,
//         price:addProduct.price.value,
//         photo:addProduct.photo.value
//     };
//     socket.emit('addProduct', productToAdd);
//     console.log(productToAdd);
// };
