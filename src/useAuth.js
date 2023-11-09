import { useState, useEffect } from 'react';
import * as authApi from '../src/apis/auth'
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const getAdminInfo = async () => {
    const result = await authApi.getAdminInfo()
    setUser(result?.user[0])
  }

  useEffect(() => {
    const token = localStorage.getItem('token');


    if (token) {
      setIsAuthenticated(true);
      getAdminInfo()
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return {
    isAuthenticated,
    user,
  };
}

export default useAuth;
