<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaction; // Pastikan ini di-import jika tidak pakai backslash di bawah

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ISI KODE ANDA DI SINI
        \App\Models\Transaction::create([
            'user_id' => 1, 
            'title' => 'Gaji Bulanan',
            'amount' => 5000000,
            'type' => 'income',
            'category' => 'Salary',
            'source' => 'Manual',
            'date' => now(),
        ]);

        \App\Models\Transaction::create([
            'user_id' => 1,
            'title' => 'Belanja Shopee',
            'amount' => 150000,
            'type' => 'expense',
            'category' => 'Shopping',
            'source' => 'Shopee',
            'date' => now(),
        ]);
    }
}