import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Car, User, LogOut, Axis3DIcon } from 'lucide-react';
import { authStorage } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { useAuth } from '@/provider/authProvider';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const {user} = auth;

  const handleLogout = () => {
    auth.logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold text-foreground">AutoRental</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/vehicles">
              <Button 
                variant={isActive('/vehicles') ? 'default' : 'ghost'}
                className="font-medium"
              >
                Browse Vehicles
              </Button>
            </Link>

            {user ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    variant={isActive('/dashboard') ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-accent hover:opacity-90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
