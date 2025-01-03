import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    window.location.replace("/");
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email, password) {
    await account.create(ID.unique(), email, password);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      console.log(loggedIn);
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false regardless of outcome
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, loading, login, logout, register }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
