import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import firebase from '../../../services/firebaseConnect'

import {
  Container,
  CardHeader,
  Avatar,
  Author,
  ImagePost,
  Content,
  CardFooter,
  LikesArea,
  LikesNumber,
  Icon,
  TimePost
} from './styles'

type PostProps = {
  data: {
    id: String;
    createdAt: Date;
    content: String;
    author: String;
    userId: String;
    likes: Number;
    avatarUrl: String | null;
  };
  currentUserId: String;
}

export default function Post({ data, currentUserId }: PostProps) {

  const [likePost, setLikePost] = useState(data.likes)

  const handlePostLike = async (id: string, likes: number) => {
    const docId = `${currentUserId}_${id}`

    const doc = await firebase.firestore().collection('likes').doc(docId).get()

    if (doc.exists) {
      await firebase.firestore().collection('posts').doc(id).update({
        likes: likes - 1
      })

      await firebase.firestore().collection('likes').doc(docId).delete()
        .then(() => {
          setLikePost(likes - 1)
        })

      return
    }

    await firebase.firestore().collection('likes').doc(docId).set({
      postId: id,
      userId: currentUserId
    })

    await firebase.firestore().collection('posts').doc(id).update({
      likes: likes + 1
    })
      .then(() => {
        setLikePost(likes + 1)
      })
  }

  const formatTime = () => {
    const datePost = new Date(data.createdAt.seconds * 1000)

    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  }

  return (
    <Container>
      <CardHeader>
        <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/42824466?v=4' }} />
        <Author numberOfLines={1}>{data.author}</Author>
      </CardHeader>
      <ImagePost source={{ uri: 'https://www.folhadealphaville.com.br/images/articles/4012/b2ap3_large_decoracao-de-home-office-800x600.jpg' }} />
      {
        data.content !== '' &&
        <Content>{data.content}</Content>
      }
      <CardFooter>
        <LikesArea>
          <LikesNumber>
            {likePost === 0 ? '' : Number(likePost)}
          </LikesNumber>
          <TouchableOpacity onPress={() => handlePostLike(data.id, likePost)}>
            {/* Check if the current user liked */}
            <Icon name={likePost === 0 ? 'heart-outline' : 'heart'} color={likePost === 0 ? '#000' : '#e52246'} />
          </TouchableOpacity>
        </LikesArea>
        <TimePost>
          {formatTime()}
        </TimePost>
      </CardFooter>
    </Container>
  )
}
