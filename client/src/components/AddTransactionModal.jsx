import { useState } from 'react';
import { db, auth } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddTransactionModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        title: '',
        shopName: '',
        amount: '',
        paymentMethod: 'Cash',
        date: '',
        time: '',
        type: 'expense'
    });
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // GANTI DUA VARIABLE INI DENGAN DATA DARI CLOUDINARY KAMU
    const CLOUD_NAME = "finance-file";
    const UPLOAD_PRESET = "upload_preset"; 

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = '';

            // 1. UPLOAD KE CLOUDINARY (Jika ada gambar)
            if (image) {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", UPLOAD_PRESET);
                data.append("cloud_name", CLOUD_NAME);

                const resp = await fetch(`https://api.cloudinary.com/v1_1/finance-file/image/upload`, {
                    method: "POST",
                    body: data
                });
                const imgData = await resp.json();
                imageUrl = imgData.secure_url;
            }

            // 2. SIMPAN DATA KE FIREBASE
            await addDoc(collection(db, "transactions"), {
                ...formData,
                amount: Number(formData.amount),
                imageUrl: imageUrl,
                userId: auth.currentUser?.uid || 'anonymous',
                createdAt: serverTimestamp(),
                fullDateTime: `${formData.date} ${formData.time}`
            });

            alert("Transaksi Berhasil Dicatat!");
            onRefresh(); // Refresh list di dashboard
            onClose();   // Tutup modal
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat menyimpan.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md overflow-y-auto max-h-[90vh] shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Input Transaksi</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-600 ml-1">Nama Barang/Keperluan</label>
                        <input type="text" placeholder="Contoh: Beli Kopi" className="w-full p-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" 
                            onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 ml-1">Toko/Aplikasi (Shopee, Alfamart, dll)</label>
                        <input type="text" placeholder="Contoh: Shopee" className="w-full p-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" 
                            onChange={(e) => setFormData({...formData, shopName: e.target.value})} required />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 ml-1">Total Harga</label>
                        <input type="number" placeholder="Rp 0" className="w-full p-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-blue-600" 
                            onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm font-semibold text-gray-600 ml-1">Tanggal</label>
                            <input type="date" className="w-full p-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" 
                                onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-600 ml-1">Jam</label>
                            <input type="time" className="w-full p-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" 
                                onChange={(e) => setFormData({...formData, time: e.target.value})} required />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 ml-1">Metode Pembayaran</label>
                        <select className="w-full p-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" 
                            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}>
                            <option value="Cash">Cash</option>
                            <option value="Transfer Bank">Transfer Bank</option>
                            <option value="ShopeePay">ShopeePay</option>
                            <option value="Dana/Ovo/Gopay">E-Wallet</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 ml-1">Foto Bukti (Opsional)</label>
                        <input type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                            onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button type="submit" disabled={uploading} className="w-full p-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition disabled:bg-gray-400 mt-4">
                        {uploading ? 'Sedang Memproses...' : 'Simpan Transaksi'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;