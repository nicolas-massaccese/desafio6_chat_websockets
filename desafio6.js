const express = require('express');
const app = express();
const PORT = 3000;
const httpServer = require('http').createServer(app);
const io = require('socket.io') (httpServer, {cors: {origin:"*"}})


app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

const { engine } = require('express-handlebars');

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);    

let product = [
    {
        id: 1,
        name: "zapato",
        price: 15000,
        photo: "https://cdn.shopify.com/s/files/1/0517/6282/3347/products/HCAC00969021-01_720x.jpg?v=1640618168"
    },

    {
        id: 2,
        name: "cartera",
        price: 3000,
        photo: "https://juanitajo.com/28715-thickbox_default/cartera-bela-grande.jpg"
    },

    {
        id: 3,
        name: "bolso",
        price: 5000,
        photo: "https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/b/o/bolso-topper-tote-benito-mujer-negro-800030172704001-1.jpg"
    },
];

let chat = [
    {
        email:"a@agmail.com",
        date: new Date().toLocaleDateString(),
        message:"hola"
    },
];

// app.get('/products', (req, res) => {
//     res.render('products', { products });
// });
// { root: __dirname + 'public'}
app.get('/', (req, res) => {
    res.render('productslist', { root: __dirname + 'public'});
});

io.on('connection', (socket) => {
    console.log(`New connection id: ${socket.id}`);
    socket.emit('products', product);
    socket.emit('chat', chat);

    socket.on('newMessage', (msg) => {
        chat.push(msg);
        socket.emit('chat', chat);
    });

    socket.on('addProduct', (product) => {
        chat.push(product);
        socket.emit('products', product);
    });
});

httpServer.listen(PORT, ()=>{
    console.log(`Server listening in port: ${PORT}`);
});

// app.post('/', (req, res) => {
//     const newID = products.length + 1;
    
//     const productToAdd = req.body;
//     const newProduct = {'id':newID, ...productToAdd};
//     products.push(newProduct);
//     res.redirect('/');  
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Listening in port ${PORT}`));
