import { useState } from 'react';
import api from './services/api';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    alert('Login Berhasil!');
  } catch (error) {
    // Cek apakah server mengirimkan pesan error (401, 422, dll)
    if (error.response) {
      alert('Gagal: ' + error.response.data.message);
    } 
    // Cek apakah server tidak merespons sama sekali (Network Error)
    else if (error.request) {
      alert('Server Laravel tidak merespons. Pastikan Laragon/Artisan Serve sudah menyala!');
    } 
    else {
      alert('Error: ' + error.message);
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Finance Tracker</h2>
        <input 
          type="email" placeholder="Email" 
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default App;