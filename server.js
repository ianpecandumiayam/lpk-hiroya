require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session'); // IMPORT LIBRARY BARU
const app = express();

// --- 1. KONEKSI DATABASE ---
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'septian', 
    password: process.env.DB_PASS || '123456', 
    database: process.env.DB_NAME || 'db_lpk_jepang'
});

db.getConnection((err) => {
    if (err) console.error('❌ DB Error:', err);
    else console.log('✅ DB Konek!');
});

// --- 2. SETTINGAN MIDDLEWARE ---
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// SETUP SESSION (SATPAM)
app.use(session({
    secret: 'rahasia_dapur_mirai_japan', // Kunci rahasia (bebas isi apa aja)
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 } // Sesi habis dalam 10 menit kalau didiemin
}));

// --- 3. ROUTES ---

// Halaman HOME
app.get('/', (req, res) => { res.render('index'); });
app.get('/alur', (req, res) => { res.render('alur'); });
app.get('/program', (req, res) => { res.render('program'); });
app.get('/tentang', (req, res) => { res.render('tentang'); });

// Proses Daftar Siswa
app.post('/daftar', (req, res) => {
    const { nama, no_hp, pesan } = req.body;
    const sql = "INSERT INTO pendaftar (nama, no_hp, pesan) VALUES (?, ?, ?)";
    db.query(sql, [nama, no_hp, pesan], (err, result) => {
        if (err) throw err;
        res.send("<script>alert('Data Masuk!'); window.location='/';</script>");
    });
});

// --- FITUR LOGIN ADMIN (BARU) ---

// 1. Tampilkan Halaman Login
app.get('/login', (req, res) => {
    // Kalau udah login, langsung lempar ke admin (gak usah login lagi)
    if (req.session.loggedin) {
        return res.redirect('/admin');
    }
    res.render('login', { error: null });
});

// 2. Proses Cek Password (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Cek ke Database users
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            // LOGIN SUKSES: Kasih tiket session
            req.session.loggedin = true;
            req.session.username = username;
            console.log('Admin login berhasil!');
            res.redirect('/admin');
        } else {
            // LOGIN GAGAL: Balikin ke login form kasih pesan error
            res.render('login', { error: 'Username atau Password salah bro!' });
        }
    });
});

// 3. Halaman Admin (DIPROTEKSI)
app.get('/admin', (req, res) => {
    // CEK TIKET: Kalau belum login, tendang ke /login
    if (!req.session.loggedin) {
        return res.redirect('/login');
    }

    // Kalau punya tiket, baru ambil data
    const sql = "SELECT * FROM pendaftar ORDER BY id DESC";
    db.query(sql, (err, results) => {
        res.render('admin', { calonSiswa: results });
    });
});

// ... (Route /admin yang lama di atas sini)

// --- FITUR DELETE (Baru) ---
app.post('/admin/delete/:id', (req, res) => {
    // 1. Cek Login Dulu (Satpam)
    if (!req.session.loggedin) {
        return res.redirect('/login');
    }

    // 2. Ambil ID dari URL
    const idSiswa = req.params.id;

    // 3. Hapus dari Database
    const sql = "DELETE FROM pendaftar WHERE id = ?";
    db.query(sql, [idSiswa], (err, result) => {
        if (err) {
            console.error(err);
            res.send('Gagal menghapus data.');
        } else {
            console.log(`Data ID ${idSiswa} berhasil dihapus.`);
            // 4. Balikin ke Halaman Admin
            res.redirect('/admin');
        }
    });
});

// ... (Route /logout di bawah sini)

// 4. Logout (Keluar)
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
});

// --- NYALAIN SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server aman terkendali di http://localhost:${PORT}`);
});