import React, { useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import Loading from '../components/components/Loading'

import { AuthContext } from '../contexts/AuthContext'

export default function Routes() {

  const { signed, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    signed ? <AppRoutes /> : <AuthRoutes />
  )
}
