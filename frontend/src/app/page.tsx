// pages/index.tsx
import PrivateRoute from '../components/PrivateRoute';

const Home: React.FC = () => {
  return (
    <PrivateRoute>
      <div>
        <h1>Welcome to your Dashboard</h1>
        {/* Protected content goes here */}
      </div>
    </PrivateRoute>
  );
};

export default Home;
