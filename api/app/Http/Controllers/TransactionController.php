<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    // 1. Mengambil semua transaksi milik user yang login
    public function index()
    {
        $transactions = Auth::user()->transactions()->orderBy('date', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $transactions
        ]);
    }

    // 2. Menyimpan transaksi baru (Input Manual + Link Firebase)
    public function store(Request $request)
    {
        // Validasi input agar data yang masuk tidak ngawur
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'amount'   => 'required|numeric',
            'type'     => 'required|in:income,expense',
            'category' => 'required|string',
            'source'   => 'nullable|string',
            'date'     => 'required|date',
            'receipt_url' => 'nullable|string', // URL dari Firebase di React
        ]);

        // Simpan data melalui relasi User (Otomatis mengisi user_id)
        $transaction = Auth::user()->transactions()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Transaksi berhasil dicatat!',
            'data'    => $transaction
        ], 201);
    }
}