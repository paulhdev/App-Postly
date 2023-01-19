import React, { useState, useContext } from 'react'
import { ActivityIndicator } from 'react-native'

import {
  Container,
  InputArea,
  Icon,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText
} from './styles'

import { AuthContext } from '../../contexts/AuthContext'
import Logo from '../../components/Logo'

export default function Login() {

  const { signIn, signUp, loadingAuth } = useContext(AuthContext)

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
    signIn(email, pass)
  }

  const handleSignUp = () => {
    if (name === '' || email === '' || pass === '') {
      alert('Preencha todos os campos....!')
      return
    }
    signUp(name, email, pass)
  }

  if (!login) {
    return (
      <Container>
        <Logo />
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
            secureTextEntry={true}
            value={pass}
            onChangeText={text => setPass(text)}
          />
        </InputArea>
        <Button onPress={handleSignUp} disabled={loadingAuth}>
          {
            loadingAuth ?
              <ActivityIndicator size='large' color='#fff' />
              :
              <ButtonText>Cadastrar-se</ButtonText>
          }
        </Button>
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Já tem uma conta? Acesse</SignUpText>
        </SignUpButton>
      </Container>
    )
  }

  return (
    <Container>
      <Logo />
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
          secureTextEntry={true}
          value={pass}
          onChangeText={text => setPass(text)}
        />
      </InputArea>
      <Button onPress={handleSignIn} disabled={loadingAuth}>
        {
          loadingAuth ?
            <ActivityIndicator size='large' color='#fff' />
            :
            <ButtonText>Acessar</ButtonText>
        }
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Não tem uma conta? Cadastre-se</SignUpText>
      </SignUpButton>
    </Container>
  )
}
