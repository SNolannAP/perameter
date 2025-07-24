import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
    const checkLoginStatus = async () => {
        const user = await AsyncStorage.getItem('user');
        setIsLoggedIn(!!user);
    }
    checkLoginStatus();
}, []);

const login = () => setIsLoggedIn(true);
const logout = () => {
    AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
};

return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
    </AuthContext.Provider>
)};