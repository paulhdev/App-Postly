import React, { useState } from 'react'
import { View } from 'react-native'

import {
  Container,
  Title,
  Input,
  ButtonArea,
  TextIndicator,
  Button,
  ButtonText
} from './styles'

const MAX_LENGHT = 200

export default function NewPost() {

  const [postText, setPostText] = useState('')

  return (
    <Container>
      <View>
        <Title>O que está acontecendo?</Title>
        <Input
          placeholder='Descreva em algumas palavras...'
          autoCorrect={false}
          multiline
          maxLength={MAX_LENGHT}
          value={postText}
          onChangeText={text => setPostText(text)}
        />
      </View>
      <ButtonArea>
        <Button>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
        <TextIndicator>{postText.length}/{MAX_LENGHT}</TextIndicator>
      </ButtonArea>
    </Container>
  )
}
