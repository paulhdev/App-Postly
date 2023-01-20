import { RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import React, { useLayoutEffect, useState, useCallback, useContext } from 'react'
import { ListRenderItem, ActivityIndicator } from 'react-native'
import firebase from '../../services/firebaseConnect'

import {
  Container,
  ListPosts,
  LoadingArea
} from './styles'

import { propsStack } from '../../routes/app.routes'
import Post from '../../components/Post'
import { AuthContext } from '../../contexts/AuthContext'

type ParamProps = {
  Detail: {
    uid: string,
    name: string
  }
}

type PostProps = {
  id: string;
  createdAt: Date;
  content: string;
  author: string;
  userId: string;
  likes: number;
  avatarUrl: string | null;
  imageUrl: string | null;
}

export default function UserPosts() {

  const { user } = useContext(AuthContext)

  const route = useRoute<RouteProp<ParamProps>>()
  const navigation = useNavigation<propsStack>()

  const [title, setTitle] = useState(route.params?.name)

  const [posts, setPosts] = useState<PostProps[] | []>([])
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === '' ? '' : title
    })
  }, [navigation, title])

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const getPostsById = () => {
        firebase.firestore().collection('posts')
          .where('userId', '==', route.params?.uid)
          .orderBy('createdAt', 'desc')
          .get()
          .then(snapshot => {

            const postList = [] as PostProps[]

            snapshot.docs.map(document => {
              const newPostItem = {
                id: document.id,
                createdAt: document.data().createdAt,
                content: document.data().content,
                author: document.data().author,
                userId: document.data().userId,
                likes: document.data().likes,
                avatarUrl: document.data().avatarUrl,
                imageUrl: document.data().imageUrl
              } as PostProps

              postList.push(newPostItem)
            })

            if (isActive) {
              setPosts(postList)
              setLoading(false)
            }

          })
      }

      getPostsById()

      return () => {
        isActive = false
      }
    }, [])
  )

  const renderItem: ListRenderItem<PostProps | unknown> = ({ item }) => <Post data={item} currentUserId={user?.uid} />;

  return (
    <Container>
      {
        loading &&
        <LoadingArea>
          <ActivityIndicator size='large' color='#eb5e11' />
        </LoadingArea>
      }
      {
        posts.length !== 0 &&
        <ListPosts
          data={posts}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      }
    </Container>
  )
}
