import React, { useContext, useState } from 'react'
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import uuid from 'react-native-uuid';
import firebase from '../../services/firebaseConnect'

import { propsStack } from '../../routes/app.routes'

import {
  Container,
  TitleArea,
  Title,
  Icon,
  Input,
  ButtonArea,
  TextIndicator,
  Button,
  ButtonText,
  ImagePreview
} from './styles'

import { AuthContext } from '../../contexts/AuthContext'

type PostProps = {
  createdAt: Date;
  content: string;
  author: string;
  userId: string;
  likes: number;
  avatarUrl: string | null;
  imageUrl: string | null;
}

const MAX_LENGHT = 200

export default function NewPost() {

  const navigation = useNavigation<propsStack>()

  const { user } = useContext(AuthContext)

  const [postText, setPostText] = useState('')
  const [loadingPost, setLoadingPost] = useState(false)

  const [isFile, setIsFile] = useState(false)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
  const [imageUri, setImageUri] = useState('')

  const handleSelectFile = async () => {
    setIsFile(true)
    if (!hasGalleryPermission) {
      await ImagePicker.requestMediaLibraryPermissionsAsync().then(val => {
        setHasGalleryPermission(val.status === 'granted')
        pickImage()
      })
      return
    }

    pickImage()
  }

  const handleClearFile = () => {
    setIsFile(false)
    setImageUri('')
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (result.canceled) {
      setIsFile(false)
      return
    }

    setImageUri(result.assets[0].uri)
  }

  const uploadPostImage = async () => {
    const res = await fetch(imageUri)
    const blob = await res.blob()

    const uid = `${user?.uid}_${uuid.v4()}`

    let currentFile = null;

    await firebase.storage().ref('posts').child(uid).put(blob)
      .then(async () => {
        const storageRef = firebase.storage().ref('posts').child(uid)
        await storageRef.getDownloadURL()
          .then(image => {
            currentFile = image
          })
      })

    return currentFile
  }

  const handlePost = async () => {
    setLoadingPost(true)
    if (postText === '' && !isFile) {
      alert('Seu post deve ter algum conte??do!')
      setLoadingPost(false)
      return
    }

    const fileUrl = isFile ? await uploadPostImage() : null

    const data = {
      createdAt: new Date(),
      content: postText,
      author: user?.name,
      userId: user?.uid,
      likes: 0,
      avatarUrl: user?.avatarUrl,
      imageUrl: fileUrl
    } as PostProps

    await firebase.firestore().collection('posts').add({ ...data })
      .then(() => {
        handleClearFile()
        setPostText('')
        setLoadingPost(false)
        navigation.navigate('Home')
      })
      .catch(error => {
        alert('Erro ao criar post! Tente novamente.')
        setLoadingPost(false)
      })
  }

  return (
    <Container>
      <View>
        <TitleArea>
          <Title>O que est?? acontecendo?</Title>
          {
            !isFile ?
              <TouchableOpacity onPress={handleSelectFile}>
                <Icon name='image-outline' />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={handleClearFile}>
                <Icon name='close-outline' />
              </TouchableOpacity>
          }
        </TitleArea>
        {
          imageUri !== '' &&
          <ImagePreview source={{ uri: imageUri }} />
        }
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
