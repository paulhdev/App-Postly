import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import {
  Container,
  Name,
  Email,
  Button,
  ButtonText,
  Icon,
  UploadButton,
  Avatar
} from './styles'

export default function Profile() {

  const { user } = useContext(AuthContext)

  const [url, setUrl] = useState('')

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
      <Button>
        <ButtonText>Atualizar Perfil</ButtonText>
      </Button>
    </Container>
  )
}
