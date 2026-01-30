import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  specialty: string;
  license: string;
  languages: string[];
  location: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Compte de test pour professionnel
const TEST_CREDENTIALS = {
  email: "dr.alice.obambi@monafrica.net",
  password: "Mona2024!",
  user: {
    id: "expert-001",
    name: "Dr. Alice Obambi",
    email: "dr.alice.obambi@monafrica.net",
    role: "Psychologue clinicienne",
    specialty: "Thérapie cognitive et comportementale",
    license: "PSY-CD-2024-001",
    languages: ["Français", "Anglais", "Lingala", "Kikongo"],
    location: "Kinshasa, RD Congo"
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("mona_expert_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 800));

    // Vérifier les identifiants
    if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
      setUser(TEST_CREDENTIALS.user);
      localStorage.setItem("mona_expert_user", JSON.stringify(TEST_CREDENTIALS.user));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mona_expert_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}