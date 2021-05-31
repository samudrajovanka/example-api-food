const { nanoid } = require('nanoid'); // mengimport module nanoid
const FoodModels = require('../models/FoodModels'); // mengimport models schema
const { foodsDatabase } = require('../../database/database'); // mengimport database foods (contoh)

exports.getFoods = (req, res) => {
  let { page } = req.query; // mengambil page dari query
  page = page ? page : 1; // mengganti page dengan 1 jika page undefined
  
  // handle jika page yang dimasukan bukan angka
  if (isNaN(page)) {
    return res.status(400).json({
      success: false,
      message: 'Page yang dimasukan harus berupa angka',
    });
  }

  // handle untuk banyak datanya 0
  if (foodsDatabase.length === 0) {
    return res.status(200).json({
      success: true,
      message: 'Tidak ada makanan yang tersimpan',
    });
  }

  const maxPerPage = 3; // mengeset data per page
  const foodLength = foodsDatabase.length; // mendapatkan banyak data pada database
  const maxPage = Math.floor(foodLength / maxPerPage) + (foodLength % maxPerPage === 0 ? 0 : 1); // menghitung max page
  const indexStart = maxPage * (page - 1); // mendapatkan index start
  const dataFoods = foodsDatabase.slice(indexStart, maxPerPage); // mendapatkan isi array sesuai page
  
  // handle untuk page jika lebih dari max apge
  if (page > maxPage) {
    return res.status(400).json({
      success: false,
      maxpage: maxPage,
      message: 'Page yang dimasukan lebih dari maksimal'
    });
  }

  return res.status(200).json({
    success: true,
    page: Number(page), // page sekarang
    maxPage: maxPage, // maksimal page yang ada
    nextPage: (page == maxPage ? undefined : Number(page) + 1), // menampilkan nextPage jika dia bukan maxPage
    length: dataFoods.length, // menampilkan banyaknya data yang ditampilkan
    data: {
      dataFoods
    }
  });
}

exports.postFood = (req, res) => {
  // mengambil nilai name, price dan expired yang dikirimkan pada body request dengan desturcturing assignment
  const { name, price, expired }  = req.body;

  // handle jika data yang dimasukan kurang
  if (name === undefined || price === undefined || expired === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Data yang dimasukan kurang'
    });
  }

  // mengenerate id random dengan fungsi nanoid dari module nanoid
  const id = nanoid(12); // panjang id 12

  const nameExist = foodsDatabase.some(food => food.name === name); // mencari makanan dengan nama yang sama

  // jika ada, maka tampilkan pesan tidak bisa
  if (nameExist) {
    return res.status(400).json({
      success: false,
      message: 'Maaf nama makana sudah tersedia'
    })
  }

  // jika harga yang dimasukan kurang dari 0 maka harga tidak valid
  if (price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Harga tidak dapat dibawah 0'
    });
  }

  const food = new FoodModels(id, name, price, expired); // membuat object food
  foodsDatabase.push(food); // memasukan object kedalam array (contoh database)

  // tampilkan pesan sukses 201
  return res.status(201).json({
    success: true,
    message: 'Makanan berhasil ditambahkan',
    data: {
      id: id
    }
  });
}

exports.updateFood = (req, res) => {
  const { price } = req.body; // mengambil nilai price dari body
  const { foodId } = req.params; // mengambil nilai foodId dari parameter di URL

  // handle jika tidak memasukan price
  if (price === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Data price tidak ditemukan'
    });
  }

  // jika harga yang dimasukan kurang dari 0 maka harga tidak valid
  if (price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Harga tidak dapat dibawah 0'
    });
  }

  // mencari makanan yang dicari
  const foodIndex = foodsDatabase.findIndex(food => {
    return food.id === foodId
  });

  // jika data makanan tidak ditemukan
  if (foodIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Makanan tidak ditemukan',
    });
  }

  // mengubah harga makanan terkait dengan harga yang baru
  foodsDatabase[foodIndex].price = price;

  return res.status(200).json({
    success: true,
    message: 'Makan berhasil di perbaharui',
  });
}

exports.deleteFood = (req, res) => {
  const { foodId } = req.params; // mengambil nilai foodId dari parameter di URL

  // mencari makanan yang dicari
  const foodIndex = foodsDatabase.findIndex(food => {
    return food.id === foodId
  });

  // jika data makanan tidak ditemukan
  if (foodIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Makanan tidak ditemukan',
    });
  }

  foodsDatabase.splice(foodIndex, 1);

  return res.status(200).json({
    success: true,
    message: 'Makanan berhasil dihapus'
  });
};