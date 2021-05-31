const express = require('express'); // import module express
const app = express(); // menginisialisasi app

const foodsRoute = require('../api/routes/foods'); // import module route foods

// agar dapat memasukan body dari json danm url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// menggunakan route yang sudah dibuat pada /api/routes
app.use('/foods', foodsRoute); // awalan untuk route foods

const PORT = 3000; // mengeset port
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});