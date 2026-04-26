use App\Http\Controllers\TransactionController;

// Lindungi route ini dengan middleware 'auth:sanctum' 
// Artinya, hanya user yang sudah login yang bisa akses
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
});