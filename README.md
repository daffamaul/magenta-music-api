# Magenta Music API

Sebuah API yang terinspirasi dari proyek Dicoding Indonesia di tahap intermediate (menengah). Jadi, proyek ini adalah replikasi pengalaman belajar saya pada tahap intermediate di program IDCamp X Dicoding 2024

## Kebutuhan Program

- NodeJS v20.x.x
- AdonisJS
- MySQL

## Fitur Program

- Registrasi akun
- CRUD lagu
- CRUD album
- CRUD playlist
- Otentikasi dan otorisasi _JSON Web Token_ pada playlist
- Cari lagu berdasarkan **title** dan **performer**

## Cara menjalankan

- Buat file `.env`, copy isi file `.env.example` ke `.env`.
- Konfigurasi `.env` sesuai kebutuhan.
- Melakukan migration: `node ace migration:run`
- Gunakan postman untuk testing endpoint
- Import file `.json` pada folder **postman** ke dalam aplikasi postman
- Jalankan _runner collection postman_
