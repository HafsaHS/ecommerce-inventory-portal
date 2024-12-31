import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../lib/appwrite";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
    console.log(user);
  }, []);

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error("Error checking user status:", error); // Log or handle error
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loading, // Add loading state to context
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
