// src/app.js
const express = require('express');
const authRoutes = require('./src/routes/auth.routes');
require('dotenv').config();
const cors = require('cors');
const pendaftaranRoutes = require('./src/routes/pendaftaran.route');
const seleksiRoutes = require('./src/routes/seleksi.routes');
const jadwalRoutes = require('./src/routes/jadwal.routes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads')); // serve file upload
app.use('/api', pendaftaranRoutes);
app.use('/api', seleksiRoutes)
app.use('/api', jadwalRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));
