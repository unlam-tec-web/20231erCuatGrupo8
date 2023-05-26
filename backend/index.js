const express = require('express');
const router = require("./src/route/product.router");
const app = express();
const mongoose = require("mongoose")

const port = 3000;
const URI = "mongodb+srv://tallerweb2:OU1FiMJesXKK6SvO@carcash.gw7cpnl.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json());
app.use("/api/products", router);

mongoose
    .connect(URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor iniciado en el puerto ${port}`);
        });
    })
    .catch((e) => {
        console.log(e);
    })



module.exports = app;