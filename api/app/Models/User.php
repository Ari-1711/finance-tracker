<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Pastikan ini ada untuk React nantinya

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // Tambahkan role jika Anda memasukkannya di migration
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // RELASI: User mempunyai banyak Transaksi
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
