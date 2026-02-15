// import React, { createContext, useContext, useState, ReactNode } from 'react';

// type UserRole = 'customer' | 'admin' | 'superadmin' | null;

// interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: UserRole;
// }

// interface AuthContextType {
//     user: User | null;
//     role: UserRole;
//     isLoading: boolean;
//     login: (role: UserRole) => void;
//     logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//     const [user, setUser] = useState<User | null>(null);
//     const [role, setRole] = useState<UserRole>(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const login = (userRole: UserRole) => {
//         setIsLoading(true);
//         // Mock user data based on role
//         const mockUser: User = {
//             id: '1',
//             name: userRole === 'admin' ? 'Admin User' : userRole === 'superadmin' ? 'Super Admin' : 'Customer User',
//             email: `${userRole}@MyFitness Meals.com`,
//             role: userRole,
//         };

//         setUser(mockUser);
//         setRole(userRole);
//         setIsLoading(false);
//     };

//     const logout = () => {
//         setUser(null);
//         setRole(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, role, isLoading, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth() {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// }

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'customer' | 'admin' | 'superadmin' | null;

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    role: UserRole;
    pendingRole: UserRole;
    login: (role: UserRole) => void;
    logout: () => void;
    setPendingRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<UserRole>(null);
    const [pendingRole, setPendingRole] = useState<UserRole>(null);

    const login = (userRole: UserRole) => {
        const mockUser: User = {
            id: '1',
            name: userRole === 'admin' ? 'Admin User' : userRole === 'superadmin' ? 'Super Admin' : 'Customer User',
            email: `${userRole}@MyFitness Meals.com`,
            role: userRole,
        };

        setUser(mockUser);
        setRole(userRole);
        setPendingRole(null);
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        setPendingRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, pendingRole, login, logout, setPendingRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}