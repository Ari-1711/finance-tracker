<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    // Menentukan kolom mana saja yang boleh diisi secara massal
    protected $fillable = [
        'user_id',
        'title',
        'amount',
        'type',
        'category',
        'source',
        'receipt_url',
        'date'
    ];

    // RELASI: Transaksi ini dimiliki oleh satu User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}