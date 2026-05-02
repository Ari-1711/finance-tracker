import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase'; // Import db dan auth
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Cek apakah user sudah login, kalau tidak lempar ke login
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/');
            } else {
                fetchTransactions();
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const fetchTransactions = async () => {
        try {
            // Ambil data dari koleksi bernama "transactions" di Firestore
            const q = query(collection(db, "transactions"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setTransactions(data);
            setLoading(false);
        } catch (error) {
            console.error("Gagal ambil data dari Firebase", error);
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Gagal Logout", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Finance Tracker</h1>
                    <p className="text-sm text-gray-500">Halo! Berikut catatan keuanganmu (Firebase Mode).</p>
                </div>
                <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-200 transition">
                    Logout
                </button>
            </div>

            {/* List Transaksi */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Riwayat Transaksi</h2>
                </div>
                
                {loading ? (
                    <p className="p-10 text-center text-gray-500">Memuat data dari Google Cloud...</p>
                ) : transactions.length === 0 ? (
                    <p className="p-10 text-center text-gray-500">Belum ada transaksi. Tambahkan data di Firebase Console!</p>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {transactions.map((item) => (
                            <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                                <div>
                                    <p className="font-medium text-gray-800">{item.title}</p>
                                    <p className="text-xs text-gray-400">
                                        {item.category} • {item.date?.seconds ? new Date(item.date.seconds * 1000).toLocaleDateString('id-ID') : 'No Date'}
                                    </p>
                                </div>
                                <div className={`font-bold ${item.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.type === 'income' ? '+' : '-'} Rp {parseInt(item.amount).toLocaleString('id-ID')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;