import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import firebase from '../../services/firebaseConnect'

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
import { useNavigation } from '@react-navigation/native'
import { propsStack } from '../../routes/app.routes'

type PostProps = {
  data: {
    id: string;
    createdAt: {
      seconds: number;
      nanoseconds: number
    };
    content: string;
    author: string;
    userId: string;
    likes: number;
    avatarUrl: string | null;
  };
  currentUserId: string;
}

export default function Post({ data, currentUserId }: PostProps) {

  const navigation = useNavigation<propsStack>()

  const [likePost, setLikePost] = useState(data.likes)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const checkLiked = async () => {
      const docId = `${currentUserId}_${data.id}`
      const doc = await firebase.firestore().collection('likes').doc(docId).get()
      if (doc.exists) {
        setIsLiked(true)
      }
    }
    checkLiked()
  }, [])

  const handlePostLike = async (id: string, likes: number) => {
    const docId = `${currentUserId}_${id}`

    const doc = await firebase.firestore().collection('likes').doc(docId).get()

    if (doc.exists) {
      await firebase.firestore().collection('posts').doc(id).update({
        likes: likes - 1
      })

      await firebase.firestore().collection('likes').doc(docId).delete()
        .then(() => {
          setIsLiked(false)
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
        setIsLiked(true)
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

  const handleScreenUserPosts = (uid: string, name: string) => {
    navigation.navigate('UserPosts', {
      uid: uid,
      name: name
    })
  }

  return (
    <Container>
      <TouchableOpacity onPress={() => handleScreenUserPosts(data.userId, data.author)}>
        <CardHeader>
          <Avatar source={{ uri: data.avatarUrl !== null ? data.avatarUrl : 'https://avatars.githubusercontent.com/u/42824466?v=4' }} />
          <Author numberOfLines={1}>{data.author}</Author>
        </CardHeader>
      </TouchableOpacity>
      <ImagePost source={{ uri: 'https://www.folhadealphaville.com.br/images/articles/4012/b2ap3_large_decoracao-de-home-office-800x600.jpg' }} />
      {
        data.content !== '' &&
        <Content>{data.content}</Content>
      }
      <CardFooter>
        <LikesArea>
          <TouchableOpacity onPress={() => handlePostLike(data.id, likePost)}>
            {/* Check if the current user liked */}
            <Icon name={!isLiked ? 'heart-outline' : 'heart'} color={!isLiked ? '#000' : '#e52246'} />
          </TouchableOpacity>
          {
            likePost !== 0 &&
            <LikesNumber>
              {likePost} {likePost > 1 ? ' Curtidas' : ' Curtida'}
            </LikesNumber>
          }
        </LikesArea>
        <TimePost>
          {formatTime()}
        </TimePost>
      </CardFooter>
    </Container>
  )
}
