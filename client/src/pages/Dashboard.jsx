import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Hapus kunci akses
        navigate('/'); // Tendang ke login
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
                <h1 className="text-2xl font-bold text-blue-600">My Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            <p className="mt-6 text-gray-600 text-center text-lg">
                Selamat datang! Hanya user yang login yang bisa melihat ini. 🚀
            </p>
        </div>
    );
};

export default Dashboard;