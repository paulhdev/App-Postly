import React, { useState, useCallback, useContext } from 'react'
import { ActivityIndicator, ListRenderItem } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import firebase from '../../services/firebaseConnect'

import Header from '../../components/Header'
import Post from '../../components/Post'

import {
  Container,
  ListPosts,
  LoadingArea
} from './styles'

import { AuthContext } from '../../contexts/AuthContext'

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

export default function Home() {

  const { user } = useContext(AuthContext)

  const [posts, setPosts] = useState<PostProps[] | []>([])
  const [loading, setLoading] = useState(true)

  const [loadingRefresh, setLoadingRefresh] = useState(false)
  const [lastItem, setLastItem] = useState()
  const [emptyList, setEmptyList] = useState(false)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const getPosts = () => {
        firebase.firestore().collection('posts')
          .orderBy('createdAt', 'desc')
          .limit(5)
          .get()
          .then(snapshot => {

            if (isActive) {
              setPosts([])
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

              setEmptyList(!!snapshot.empty)
              setPosts(postList)
              setLastItem(snapshot.docs[snapshot.docs.length - 1])
              console.log('LAST ITEM ==> ', snapshot.docs[snapshot.docs.length - 1])
              setLoading(false)
            }
          })
      }

      getPosts()

      return () => {
        isActive = false
      }
    }, [])
  )

  const renderItem: ListRenderItem<PostProps> = ({ item }) => <Post data={item} currentUserId={user?.uid} />

  const getListPosts = () => {
    if (emptyList) {
      setLoading(false)
      return
    }

    if (loading) return

    firebase.firestore().collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .startAfter(lastItem)
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

        setEmptyList(!!snapshot.empty)
        setLastItem(snapshot.docs[snapshot.docs.length - 1])
        setPosts(oldPosts => [...oldPosts, ...postList])
        setLoading(false)
      })
  }

  const handlePostsRefresh = async () => {
    getPostsRefresh()
  }

  const getPostsRefresh = async () => {
    setLoadingRefresh(true)
    firebase.firestore().collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get()
      .then(snapshot => {
        setPosts([])
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

        setEmptyList(false)
        setPosts(postList)
        setLastItem(snapshot.docs[snapshot.docs.length - 1])
        setLoading(false)
      })

    setLoadingRefresh(false)
  }

  return (
    <Container>
      <Header />
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
          refreshing={loadingRefresh}
          onRefresh={handlePostsRefresh}
          onEndReached={() => getListPosts()}
          onEndReachedThreshold={0.1}
        />
      }
    </Container>
  )
}
