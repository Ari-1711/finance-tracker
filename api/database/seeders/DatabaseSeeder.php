<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Buat satu user contoh dulu
        User::factory()->create([
            'name' => 'Ari Test',
            'email' => 'ari@test.com',
            'password' => bcrypt('password123'), // Tambahkan password agar bisa login nanti
        ]);

        // 2. Lalu jalankan seeder transaksi
        $this->call(TransactionSeeder::class);
    }
}