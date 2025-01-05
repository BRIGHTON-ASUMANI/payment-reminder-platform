// components/LogoutButton.tsx
import { useAuth } from '../hooks/useAuth';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
