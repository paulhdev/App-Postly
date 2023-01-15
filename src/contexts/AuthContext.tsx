import React, { useState, createContext, ReactNode } from 'react'

type AuthContextData = {
  signIn: (email: string, pass: string) => void;
  signUp: (name: string, email: string, pass: string) => void;
  signOut: () => void;
  signed: boolean;
  loading: boolean;
  user: UserProps;
}

type UserProps = {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export default function AuthProvider({ children }: AuthProviderProps) {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const signed = !!user.uid

  const signIn = async (email: string, pass: string) => { }

  const signUp = async (name: string, email: string, pass: string) => { }

  const signOut = async () => { }

  return (
    <AuthContext.Provider value={{
      signIn,
      signUp,
      signOut,
      signed,
      loading,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}
