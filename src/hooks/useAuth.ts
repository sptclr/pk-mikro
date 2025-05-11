/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useToast } from "@/components/Toast/ToastProvider";
import { keySession } from "@/lib/constants";

interface AuthState {
  isAuthenticated: boolean;
  data: any;
  loading: boolean;
}

const useAuth = () => {
  const { showToast } = useToast();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    data: {},
    loading: true,
  });

  const checkAuthState = () => {
    const session = Cookies.get(keySession);

    if (session) {
      const { isAuthenticated, expires, data, token } = JSON.parse(session);
      if (new Date().getTime() < expires) {
        return { isAuthenticated, data, token };
      } else {
        Cookies.remove(keySession);
        showToast("Sesi berakhir, silahkan login kembali.", "error");
        window.location.href = "/login";
      }
    }
    return { isAuthenticated: false, data: {}, token: null };
  };

  useEffect(() => {
    const { isAuthenticated, data } = checkAuthState();
    setAuthState({
      isAuthenticated,
      data,
      loading: false,
    });
  }, []);

  const login = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const result = await response.json();

      if (response.ok) {
        const expiresIn = result.expiresIn;
        let expiresInMilliseconds = 0;

        if (expiresIn.endsWith("d")) {
          expiresInMilliseconds =
            parseInt(expiresIn.replace("d", ""), 10) * 24 * 60 * 60 * 1000;
        } else if (expiresIn.endsWith("h")) {
          expiresInMilliseconds =
            parseInt(expiresIn.replace("h", ""), 10) * 60 * 60 * 1000;
        } else if (expiresIn.endsWith("s")) {
          expiresInMilliseconds =
            parseInt(expiresIn.replace("s", ""), 10) * 1000;
        }

        const expires = new Date().getTime() + expiresInMilliseconds;

        setAuthState({
          isAuthenticated: true,
          data: result.data,
          loading: false,
        });

        Cookies.set(
          keySession,
          JSON.stringify({
            isAuthenticated: true,
            expires,
            data: result.data,
            token: result.Authorization,
          }),
          { expires: 1, secure: true, sameSite: "Strict" }
        );

        showToast("Anda telah berhasil login.", "success");

        return true;
      } else {
        showToast("Login gagal, silakan coba lagi.", "error");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Terjadi kesalahan saat login, silakan coba lagi.", "error");
      return false;
    }
  };

  const logout = () => {
    try {
      Cookies.remove(keySession);

      setAuthState({
        isAuthenticated: false,
        data: {},
        loading: false,
      });

      showToast("Anda telah berhasil logout.", "success");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      showToast("Terjadi kesalahan saat logout, silakan coba lagi.", "error");
    }
  };

  return { ...authState, login, logout };
};

export default useAuth;
