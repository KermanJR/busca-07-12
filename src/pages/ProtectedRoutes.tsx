import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();

  useEffect(() => {
    const userToken = window.localStorage.getItem('USER_TOKEN'); 
    const userRole = window.localStorage.getItem('USER_ROLE');

    if (!userToken || !allowedRoles.includes(userRole)) {
      router.push('/');
    }
  }, []);

  return children;
}
