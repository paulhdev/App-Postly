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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const toggleLogin = () => {
    setName('')
    setEmail('')
    setPass('')
    setLogin(!login)
  }

  const handleSignIn = () => {
    if (email === '' || pass === '') {
      alert('Preencha todos os campos!')
      return
    }
    alert('Acessando...')
  }

  const handleSignUp = () => {
    if (name === '' || email === '' || pass === '') {
      alert('Preencha todos os campos!')
      return
    }
    alert('Criando conta...')
  }

  if (!login) {
    return (
      <Container>
        <Title>Postly</Title>
        <InputArea>
          <Icon name='person-outline' />
          <Input
            placeholder='Nome'
            value={name}
            onChangeText={text => setName(text)}
          />
        </InputArea>
        <InputArea>
          <Icon name='mail-outline' />
          <Input
            placeholder='meuemail@gmail.com'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </InputArea>
        <InputArea>
          <Icon name='lock-closed-outline' />
          <Input
            placeholder='******'
            secureTextEntry
            value={pass}
            onChangeText={text => setPass(text)}
          />
        </InputArea>
        <Button onPress={handleSignUp}>
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
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </InputArea>
      <InputArea>
        <Icon name='lock-closed-outline' />
        <Input
          placeholder='******'
          secureTextEntry
          value={pass}
          onChangeText={text => setPass(text)}
        />
      </InputArea>
      <Button onPress={handleSignIn}>
        <ButtonText>Acessar</ButtonText>
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Não tem uma conta? Cadastre-se</SignUpText>
      </SignUpButton>
    </Container>
  )
}
