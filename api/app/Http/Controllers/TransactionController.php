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
        // Mengambil transaksi lewat relasi yang sudah kita buat di model User
        $transactions = Auth::user()->transactions()->orderBy('date', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $transactions
        ]);
    }

    // 2. Menyimpan transaksi baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'amount'   => 'required|numeric',
            'type'     => 'required|in:income,expense',
            'category' => 'required|string',
            'source'   => 'nullable|string',
            'date'     => 'required|date',
            'receipt_url' => 'nullable|string',
        ]);

        // Simpan data otomatis terhubung dengan ID user yang sedang login
        $transaction = Auth::user()->transactions()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Transaksi berhasil dicatat!',
            'data'    => $transaction
        ], 201);
}
}