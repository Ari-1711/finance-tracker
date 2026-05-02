import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase'; // Import auth dari firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Panggil fungsi Firebase untuk login
      await signInWithEmailAndPassword(auth, email, password);
      
      alert('Login Berhasil!');
      navigate('/dashboard'); // Pindah ke dashboard setelah sukses
    } catch (error) {
      console.error("Error Login:", error.code);
      
      // Menangani pesan error agar lebih ramah user
      let errorMessage = "Terjadi kesalahan saat login.";
      if (error.code === 'auth/invalid-credential') {
        errorMessage = "Email atau Password salah!";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Format email tidak valid!";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "User tidak ditemukan!";
      }

      alert('Gagal: ' + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Finance Tracker</h2>
        <p className="text-center text-gray-400 mb-6 text-sm">Masuk untuk mengelola keuanganmu.</p>
        
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-6 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition duration-300">
          Login
        </button>
        
        <p className="mt-6 text-center text-xs text-gray-400">
          Versi Cloud - Powered by Firebase
        </p>
      </form>
    </div>
  );
};

export default Login;