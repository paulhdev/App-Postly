import React, { useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import { AuthContext } from '../contexts/AuthContext'

export default function Routes() {

  const { signed, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eb5e11' }}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    )
  }

  return (
    signed ? <AppRoutes /> : <AuthRoutes />
  )
}
