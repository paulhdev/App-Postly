import React, { useState } from 'react'

import {
  Container,
  Title,
  InputArea,
  Icon,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText
} from './styles'

export default function Login() {

  const [login, setLogin] = useState(true)

  const toggleLogin = () => {
    setLogin(!login)
  }

  if (!login) {
    return (
      <Container>
        <Title>Postly</Title>
        <InputArea>
          <Icon name='person-outline' />
          <Input
            placeholder='Nome'
          />
        </InputArea>
        <InputArea>
          <Icon name='mail-outline' />
          <Input
            placeholder='meuemail@gmail.com'
          />
        </InputArea>
        <InputArea>
          <Icon name='lock-closed-outline' />
          <Input
            placeholder='******'
          />
        </InputArea>
        <Button>
          <ButtonText>Cadastrar-se</ButtonText>
        </Button>
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Já tem uma conta? Acesse</SignUpText>
        </SignUpButton>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Postly</Title>
      <InputArea>
        <Icon name='mail-outline' />
        <Input
          placeholder='meuemail@gmail.com'
        />
      </InputArea>
      <InputArea>
        <Icon name='lock-closed-outline' />
        <Input
          placeholder='******'
        />
      </InputArea>
      <Button>
        <ButtonText>Acessar</ButtonText>
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Não tem uma conta? Cadastre-se</SignUpText>
      </SignUpButton>
    </Container>
  )
}
