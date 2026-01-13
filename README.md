# 🇯🇵 LPK Hiroya - Japan Internship Platform

![Badge](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)
![NodeJS](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql)

Website resmi untuk pendaftaran program magang ke Jepang (Ginou Jisshu & Tokutei Ginou). Dibangun dengan konsep **Clean UI**, performa cepat, dan panel admin yang aman.

## 🚀 Fitur Unggulan

-   **🎨 Clean & Modern UI:** Desain responsif, nyaman di mata, dan mobile-friendly.
-   **📝 Pendaftaran Online:** Calon siswa bisa daftar langsung, data masuk real-time ke database.
-   **🔒 Admin Dashboard Aman:** Dilengkapi sistem Login (Session-based Auth).
-   **🛠 CRUD System:** Admin bisa melihat dan menghapus data pendaftar (Spam protection).
-   **📱 Floating WhatsApp:** Tombol chat langsung ke admin tanpa ribet.
-   **☁️ Cloud Ready:** Siap deploy di Railway/Docker.

## 🛠️ Tech Stack

Project ini dibangun menggunakan teknologi modern:

-   **Backend:** Node.js & Express.js
-   **Database:** MySQL (Relational DB)
-   **Frontend:** EJS (Templating Engine) + CSS Custom
-   **Deployment:** Railway (Cloud)

## 📦 Cara Install (Local)

Mau coba jalanin di laptop sendiri? Gas ikutin langkah ini:

1.  **Clone Repo ini**
    ```bash
    git clone [https://github.com/ianpecandumiayam/lpk-hiroya.git](https://github.com/ianpecandumiayam/lpk-hiroya.git)
    cd lpk-hiroya
    ```

2.  **Install Library**
    ```bash
    npm install
    ```

3.  **Setup Database**
    -   Buat database MySQL baru bernama `db_lpk_jepang`.
    -   Import query SQL di bawah ini untuk bikin tabel:
    ```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL
    );
    INSERT INTO users (username, password) VALUES ('admin', 'admin123');

    CREATE TABLE pendaftar (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(100) NOT NULL,
        no_hp VARCHAR(20) NOT NULL,
        pesan TEXT,
        tanggal_daftar TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

4.  **Atur Environment (.env)**
    Buat file `.env` dan isi:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=
    DB_NAME=db_lpk_jepang
    SESSION_SECRET=rahasia123
    PORT=3000
    ```

5.  **Jalankan Server**
    ```bash
    node server.js
    ```
    Buka browser di `http://localhost:3000`.

## 📸 Screenshots

-

---

**Created by ianpecandumiayam**
