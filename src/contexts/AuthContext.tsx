import React, { useState, useEffect, createContext, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from '../services/firebaseConnect'

type AuthContextData = {
  signIn: (email: string, pass: string) => void;
  signUp: (name: string, email: string, pass: string) => void;
  signOut: () => void;
  storageUser: (data: UserProps) => void;
  setUser: (user: UserProps) => void;
  signed: boolean;
  loading: boolean;
  loadingAuth: boolean;
  user: UserProps;
}

type UserProps = {
  uid: string;
  name: string;
  email: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export default function AuthProvider({ children }: AuthProviderProps) {

  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const signed = !!user.uid

  useEffect(() => {
    loadingStorage()
  }, [])

  const signIn = async (email: string, pass: string) => {
    setLoadingAuth(true)
    await firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(async (currentUser) => {
        const uid = currentUser.user?.uid

        // const userProfile = await firebase.firestore().collection('users').doc(uid).get()

        const data = {
          uid: uid as string,
          name: currentUser.user?.displayName as string,
          email: currentUser.user?.email as string
        }

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)

      })
      .catch(error => {
        // console.log('SIGN IN: ', error)
        setLoadingAuth(false)
        switch (error.code) {
          case 'auth/invalid-credential':
            alert('Credenciais inválidas! Tente novamente.')
            break
          default:
            alert('Ops! Houve um erro, tente novamente em alguns minutos.')
        }
      })
  }

  const signUp = async (name: string, email: string, pass: string) => {
    setLoadingAuth(true)
    await firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(async (currentUser) => {
        const uid = currentUser.user?.uid

        await currentUser.user?.updateProfile({
          displayName: name
        })

        await firebase.firestore().collection('users').doc(uid).set({
          name: name,
          email: email,
          createdAt: new Date()
        })
          .then(() => {
            const data = {
              uid: uid as string,
              name: name,
              email: email
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
          })
      })
      .catch(error => {
        // console.log('SIGN UP: ', error)
        setLoadingAuth(false)
        switch (error.code) {
          case 'auth/email-already-exists':
            alert('Este e-mail já existe! Tente usar um outro e-mail.')
            break
          case 'auth/weak-password':
            alert('A senha deve ter no mínimo 6 caracteres.')
            break
          default:
            alert('Ops! Houve um erro, tente novamente em alguns minutos.')
        }
      })
  }

  const signOut = async () => {
    await firebase.auth().signOut()
    await AsyncStorage.clear()
      .then(() => {
        setUser({} as UserProps)
      })
  }

  const storageUser = async (data: UserProps) => {
    await AsyncStorage.setItem('postly@user', JSON.stringify(data))
  }

  const loadingStorage = async () => {
    const storageUser = await AsyncStorage.getItem('postly@user')

    if (storageUser) {
      setUser(JSON.parse(storageUser))
      setLoading(false)
    }

    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signUp,
      signOut,
      storageUser,
      setUser,
      signed,
      loading,
      loadingAuth,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}
