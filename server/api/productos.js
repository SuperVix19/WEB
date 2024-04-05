const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.v3gxgby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`)

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String
});

const Producto = mongoose.model('Producto', productoSchema);

app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

app.post('/productos', async (req, res) => {
  const nuevoProducto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion
  });
  const producto = await nuevoProducto.save();
  res.send(producto);
});
 

app.delete('/productos/:id', async (req, res) => {
  const producto = await Producto.findByIdAndDelete(req.params.id);
  if (!producto) res.status(404).send('No existe el id');
  res.status(200).send();
});

app.put('/productos/:id', async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if (!producto) res.status(404).send('No existe el id');
  res.send(producto);
});
app.listen(3000);
