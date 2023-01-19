import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import { propsStack } from '../../routes/app.routes'

import {
  Container,
  Icon,
  Description,
  Title,
  AreaIcons
} from './styles'

export default function Header() {

  const { user, signOut } = useContext(AuthContext)

  const navigation = useNavigation<propsStack>()

  const handleScreenInfo = () => {
    navigation.navigate('Info')
  }

  return (
    <Container>
      <View>
        <Description>Bem-vindo(a) ao Postly,</Description>
        <Title numberOfLines={1}>{user.name}</Title>
      </View>
      <AreaIcons>
        <TouchableOpacity onPress={handleScreenInfo}>
          <Icon name='help-buoy-outline' />
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut}>
          <Icon name='exit-outline' />
        </TouchableOpacity>
      </AreaIcons>
    </Container>
  )
}
