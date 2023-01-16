import React, { useState, useEffect } from 'react'
import { ListRenderItem } from 'react-native'
import firebase from '../../services/firebaseConnect'

import Header from '../../components/components/Header'
import Post from '../../components/components/Post'

import {
  Container,
  ListPosts,
} from './styles'

type PostProps = {
  id: String;
  createdAt: Date;
  content: String;
  author: String;
  userId: String;
  likes: Number;
  avatarUrl: String | null;
}

export default function Home() {

  const [posts, setPosts] = useState<PostProps[] | []>([])

  useEffect(() => {
    getAllPosts()
  }, [])

  const renderItem: ListRenderItem<PostProps> = ({ item }) => <Post data={item} />;

  const getAllPosts = () => {
    firebase.firestore().collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get()
      .then(snapShot => {
        setPosts([])
        const postList = [] as PostProps[]

        snapShot.docs.map(document => {
          const newPostItem = {
            id: document.id,
            createdAt: document.data().createdAt,
            content: document.data().content,
            author: document.data().author,
            userId: document.data().userId,
            likes: document.data().likes,
            avatarUrl: document.data().avatarUrl
          } as PostProps

          postList.push(newPostItem)
        })

        setPosts(postList)
      })
  }

  return (
    <Container>
      <Header />
      {
        posts.length !== 0 &&
        <ListPosts
          data={posts}
          renderItem={renderItem}
        />
      }
    </Container>
  )
}
