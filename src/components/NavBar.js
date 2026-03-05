'use client';
import { clearToken, getToken } from '@/lib/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link 
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
    >
      {children}
    </Link>
  );
}

export default function NavBar() {
    const router = useRouter();
    const [token, setTokenState] = useState(null);
    const pathname = usePathname();
    const [role, setRole] = useState(null);
    const handleLogout = () => {
        clearToken();
        setTokenState(null);
        router.replace('/login');
        router.refresh();
    };
    useEffect(() => {
      setTokenState(getToken());
    }, [pathname]);
    useEffect(() => {
        const token = getToken();

        if (token) {
            const decoded = jwtDecode(token);
            setRole(decoded.role); 
        }
    }, []);
  return (
     <header>
      <div>
        <Link className='' href="/">GymRat</Link>
        <nav>
          <NavLink href="/">Inicio</NavLink>

          {token ? (
            <>
              <NavLink href="/instructors">Instructors</NavLink>
              <NavLink href="/"> Proximamente</NavLink>
              <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-900">
                Logout
              </button>
            </>
          ) : (
            <NavLink href="/login">Login</NavLink>
          )}

        </nav>
      </div>
    </header> 
  );
}