import React, { useContext, useState } from 'react'
import { ActivityIndicator, Modal, Platform } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../services/firebaseConnect'

import {
  Container,
  Name,
  Email,
  Button,
  ButtonText,
  Icon,
  UploadButton,
  Avatar,
  ModalContainer,
  ButtonSecondary,
  ButtonSecondaryText,
  InputArea,
  IconInput,
  Input,
  UploadText
} from './styles'

export default function Profile() {

  const { user, signOut, storageUser, setUser } = useContext(AuthContext)

  const [url, setUrl] = useState(user?.avatarUrl)
  const [name, setName] = useState(user?.name)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false)

  const handleUpdateProfile = async () => {
    setLoading(true)
    if (name === '') {
      setLoading(false)
      return
    }

    await firebase.firestore().collection('users')
      .doc(user?.uid)
      .update({
        name: name
      })
      .then(async () => {
        const currentUser = await firebase.auth().currentUser
        currentUser?.updateProfile({
          displayName: name
        })
      })

    const postDocs = await firebase.firestore().collection('posts')
      .where('userId', '==', user?.uid).get()

    postDocs.forEach(async doc => {
      await firebase.firestore().collection('posts').doc(doc.id)
        .update({
          author: name
        })
    })

    const data = {
      uid: user?.uid,
      name: name,
      email: user?.email,
      avatarUrl: user?.avatarUrl
    }

    setUser(data)
    storageUser(data)
    setOpen(false)
    setLoading(false)
  }

  const handleUploadFile = async () => {
    if (!hasGalleryPermission) {
      await ImagePicker.requestMediaLibraryPermissionsAsync().then(val => {
        setHasGalleryPermission(val.status === 'granted')
        pickImage()
      })
      return
    }

    pickImage()
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (result.canceled) return

    uploadFileDb(result.assets[0].uri)
  }

  const uploadFileDb = async (fileSource: string) => {
    setLoadingImage(true)
    const res = await fetch(fileSource)
    const blob = await res.blob()

    try {
      await firebase.storage().ref('users').child(user?.uid).put(blob)
        .then(() => {
          uploadAvatarPosts()
          updateUserAvatar()
        })
      setUrl(fileSource)
      setLoadingImage(false)
    }
    catch (error) {
      setLoadingImage(false)
    }
  }

  const updateUserAvatar = async () => {
    const storageRef = firebase.storage().ref('users').child(user?.uid)
    await storageRef.getDownloadURL()
      .then(async (image) => {
        const currentUser = firebase.auth().currentUser
        await currentUser?.updateProfile({
          photoURL: image
        })
          .then(() => {
            const data = {
              uid: user?.uid,
              name: name,
              email: user?.email,
              avatarUrl: image
            }

            setUser(data)
            storageUser(data)
          })
      })
  }

  const uploadAvatarPosts = async () => {
    const storageRef = firebase.storage().ref('users').child(user?.uid)
    await storageRef.getDownloadURL()
      .then(async (image) => {
        const postDocs = await firebase.firestore().collection('posts')
          .where('userId', '==', user?.uid).get()

        postDocs.forEach(async (document) => {
          await firebase.firestore().collection('posts').doc(document.id).update({
            avatarUrl: image
          })
        })
      })
      .catch(error => {
        console.log('ERROR UPDATE AVATAR FILES: ', error)
      })
  }

  return (
    <Container>
      {
        url !== '' ?
          <UploadButton onPress={handleUploadFile} disabled={loadingImage}>
            <Icon name='camera-outline' />
            <Avatar
              source={{ uri: url as string }}
            />
          </UploadButton>
          :
          <UploadButton onPress={handleUploadFile} disabled={loadingImage}>
            <Icon name='camera-outline' />
          </UploadButton>
      }
      {
        loadingImage && <UploadText>Enviando imagem...</UploadText>
      }
      <Name numberOfLines={1}>{user?.name}</Name>
      <Email>{user?.email}</Email>
      <Button onPress={() => setOpen(true)}>
        <ButtonText>Atualizar Perfil</ButtonText>
      </Button>
      <ButtonSecondary onPress={signOut}>
        <ButtonSecondaryText>Sair da conta</ButtonSecondaryText>
      </ButtonSecondary>

      <Modal visible={open} animationType='slide' transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? undefined : 'padding'}>
          <InputArea>
            <IconInput name='person-outline' />
            <Input
              value={name}
              onChangeText={text => setName(text)}
              placeholder={user?.uid}
            />
          </InputArea>
          <Button onPress={handleUpdateProfile} disabled={loading}>
            {
              loading ?
                <ActivityIndicator size='large' color='#fff' />
                :
                <ButtonText>Salvar</ButtonText>
            }
          </Button>
          <ButtonSecondary onPress={() => setOpen(false)}>
            <ButtonSecondaryText>Cancelar</ButtonSecondaryText>
          </ButtonSecondary>
        </ModalContainer>
      </Modal>

    </Container>
  )
}
