import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// 로그인한 사용자 정보 타입
interface User {
  id: number;
  userId: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 1. 앱이 켜질 때 로컬스토리지(브라우저 저장소) 확인
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. 로그인 함수 (상태 저장 + 로컬스토리지 저장)
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 3. 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
