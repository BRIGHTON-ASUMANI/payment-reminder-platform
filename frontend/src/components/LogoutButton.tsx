import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Button 
      onClick={logout}
      className="text-amber-100 hover:text-white-500 hover:bg-red-500"
    >
      <LogOut className="mr-2 h-4 w-4" /> 
      Logout
    </Button>
  );
};

export default LogoutButton;