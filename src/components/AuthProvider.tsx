"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/store";
import axios from "axios";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, token, setUser, clearUser } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = Cookies.get("auth_token");
      if (storedToken && !user) {
        try {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`
          );
          if (response.data.success) {
            setUser(response.data.user, storedToken);
          } else {
            clearUser();
          }
        } catch (error) {
          clearUser();
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    clearUser();
    // Clear authorization header
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <>
      {children}
      {user && (
        <div className="fixed bottom-4 right-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      )}
    </>
  );
}
