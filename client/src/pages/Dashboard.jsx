import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/transactions');
            setTransactions(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Gagal ambil data", error);
            if (error.response?.status === 401) navigate('/');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Finance Tracker</h1>
                    <p className="text-sm text-gray-500">Halo, Ari! Berikut catatan keuanganmu.</p>
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
                    <p className="p-10 text-center text-gray-500">Memuat data...</p>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {transactions.map((item) => (
                            <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                                <div>
                                    <p className="font-medium text-gray-800">{item.title}</p>
                                    <p className="text-xs text-gray-400">{item.category} • {new Date(item.date).toLocaleDateString('id-ID')}</p>
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