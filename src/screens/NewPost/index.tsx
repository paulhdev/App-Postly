import React, { useContext, useState } from 'react'
import { View, ActivityIndicator, Keyboard } from 'react-native'
import firebase from '../../services/firebaseConnect'

import {
  Container,
  Title,
  Input,
  ButtonArea,
  TextIndicator,
  Button,
  ButtonText
} from './styles'

import { AuthContext } from '../../contexts/AuthContext'

type PostProps = {
  createdAt: Date;
  content: String,
  author: String,
  userId: String,
  likes: Number,
  avatarUrl: String | null,
}

const MAX_LENGHT = 200

export default function NewPost() {

  const { user } = useContext(AuthContext)

  const [postText, setPostText] = useState('')
  const [loadingPost, setLoadingPost] = useState(false)

  const handlePost = async () => {
    setLoadingPost(true)
    if (postText === '') {
      alert('Seu post deve ter algum conteúdo!')
      setLoadingPost(false)
      return
    }

    let avatarUrl = null

    try {
      const response = await firebase.storage().ref('users').child(user?.uid).getDownloadURL()
      avatarUrl = response
    } catch (err) {
      avatarUrl = null
    }

    const data = {
      createdAt: new Date(),
      content: postText,
      author: user?.name,
      userId: user?.uid,
      likes: 0,
      avatarUrl,
    } as PostProps

    await firebase.firestore().collection('posts').add({ ...data })
      .then(() => {
        setPostText('')
        setLoadingPost(false)
        Keyboard.dismiss()
        alert('Seu post foi criado com sucesso!')
      })
      .catch(error => {
        alert('Erro ao criar post! Tente novamente.')
        setLoadingPost(false)
      })
  }

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
        {
          loadingPost ?
            <ActivityIndicator size='large' color='#eb5e11' />
            :
            <>
              <Button onPress={handlePost} disabled={loadingPost}>
                <ButtonText>Compartilhar</ButtonText>
              </Button>
              <TextIndicator>{postText.length}/{MAX_LENGHT}</TextIndicator>
            </>
        }
      </ButtonArea>
    </Container>
  )
}
