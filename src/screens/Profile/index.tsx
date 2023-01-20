import React, { useContext, useState } from 'react'
import { ActivityIndicator, Modal, Platform } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
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
  Input
} from './styles'

export default function Profile() {

  const { user, signOut, storageUser, setUser } = useContext(AuthContext)

  const [url, setUrl] = useState('')
  const [name, setName] = useState(user?.name)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

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
      email: user?.email
    }

    setUser(data)
    storageUser(data)
    setOpen(false)
    setLoading(false)
  }

  return (
    <Container>
      {
        url !== '' ?
          <UploadButton>
            <Icon name='camera-outline' />
            <Avatar
              source={{ uri: url }}
            />
          </UploadButton>
          :
          <UploadButton>
            <Icon name='camera-outline' />
          </UploadButton>
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
