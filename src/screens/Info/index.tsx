import { useContext, useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"

import {
  Container,
  Title,
  Subtitle,
  Description
} from './styles'

import { propsStack } from "../../routes/app.routes"
import { AuthContext } from "../../contexts/AuthContext"

export default function Info() {

  const { user } = useContext(AuthContext)

  const navigation = useNavigation<propsStack>()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sobre o Postly',
    })
  }, [navigation])

  return (
    <Container>
      <Title numberOfLines={1}>{user?.name}</Title>
      <Subtitle>Obrigado por estar utilizando o Postly!</Subtitle>
      <Description>
        O Postly é um aplicativo de postagens onde você pode compartilhar seus momentos e ideias de forma fácil e rápida, seja através de textos ou imagens, faça postagens, curta e receba curtidas de outros usuários.
      </Description>
    </Container>
  )
}
