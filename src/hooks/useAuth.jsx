import React, { useState, useEffect, useContext, createContext } from 'react'; // Add "React," here
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.email === newUser.email.trim().toLowerCase());

    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    const userToSave = { 
      ...newUser, 
      email: newUser.email.trim().toLowerCase(), 
      password: hashedPassword 
    };

    users.push(userToSave);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  };

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user (case-insensitive)
    const existingUser = users.find((u) => u.email === email.trim().toLowerCase());

    if (!existingUser) {
      return { success: false, message: "Invalid credentials" };
    }

    // Compare plain-text password with stored hash
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    // Success logic
    const token = "jwt_" + btoa(existingUser.email); // mock token
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(existingUser));
    setUser(existingUser);

    return { success: true };
  };

  const logout = () => {
  setUser(null);
  localStorage.removeItem('user_token'); // Clear user session
  window.location.href = '/login'; //  redirects to login page
};
  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);