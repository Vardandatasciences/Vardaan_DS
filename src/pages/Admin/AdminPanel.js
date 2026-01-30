import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const history = useNavigate();

  React.useEffect(() => {
    // Redirect to the admin dashboard
    history('/admin/dashboard');
  }, [history]);

  return null; // This component doesn't render anything, it just redirects
};

export default AdminPanel;
