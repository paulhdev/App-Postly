import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../../contexts/AuthContext'

import {
  Container,
  Icon,
  Description,
  Title,
  AreaIcons
} from './styles'

export default function Header() {

  const { user, signOut } = useContext(AuthContext)

  return (
    <Container>
      <View>
        <Description>Bem-vindo(a) ao Postly,</Description>
        <Title>{user.name}</Title>
      </View>
      <AreaIcons>
        <TouchableOpacity>
          <Icon name='notifications-outline' />
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut}>
          <Icon name='exit-outline' />
        </TouchableOpacity>
      </AreaIcons>
    </Container>
  )
}
