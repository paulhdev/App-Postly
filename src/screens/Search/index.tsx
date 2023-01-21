import React, { useState, useEffect } from 'react'
import { ListRenderItem } from 'react-native'
import firebase from '../../services/firebaseConnect'

import {
  Container,
  Title,
  InputArea,
  Input,
  Icon,
  List
} from './styles'

import SearchItem from '../../components/SearchItem'

type UserListProps = {
  uid: string,
  name: string,
  email: string,
  avatarUrl: string | null
}

export default function Search() {

  const [name, setName] = useState('')
  const [users, setUsers] = useState<UserListProps[] | []>([])

  useEffect(() => {
    if (name === '' || name === undefined) {
      setUsers([])
      return
    }

    const subscriber = firebase.firestore().collection('users')
      .where('name', '>=', name)
      .where('name', '<=', name + '\uf8ff')
      .onSnapshot(snapshot => {
        const listUsers = [] as UserListProps[]

        snapshot.forEach(doc => {
          const newUserItem = {
            uid: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            avatarUrl: doc.data().avatarUrl
          } as UserListProps

          listUsers.push(newUserItem)
        })

        setUsers(listUsers)

      })

    return () => subscriber()

  }, [name])

  const renderItem: ListRenderItem<UserListProps> = ({ item }) => <SearchItem data={item} />

  return (
    <Container>
      <Title>Procurando alguém?</Title>
      <InputArea>
        <Icon name='search-outline' />
        <Input
          value={name}
          onChangeText={text => setName(text)}
          placeholder='Digite o nome aqui...'
        />
      </InputArea>
      {
        users.length !== 0 &&
        <List
          data={users}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      }
    </Container>
  )
}
