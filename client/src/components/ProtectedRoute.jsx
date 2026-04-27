import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Jika token tidak ada, tendang balik ke halaman login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Jika ada, persilakan masuk ke halaman yang dituju
    return children;
};

export default ProtectedRoute;