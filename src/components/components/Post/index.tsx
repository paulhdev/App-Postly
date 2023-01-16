import React from 'react'
import { View, TouchableOpacity } from 'react-native'

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
  id: String;
  createdAt: Date;
  content: String;
  author: String;
  userId: String;
  likes: Number;
  avatarUrl: String | null;
}

export default function Post({ data }: { data: PostProps }) {
  return (
    <Container>
      <CardHeader>
        <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/42824466?v=4' }} />
        <Author numberOfLines={1}>{data.author}</Author>
      </CardHeader>
      <ImagePost source={{ uri: 'https://www.folhadealphaville.com.br/images/articles/4012/b2ap3_large_decoracao-de-home-office-800x600.jpg' }} />
      <Content>{data.content}</Content>
      <CardFooter>
        <LikesArea>
          <LikesNumber>12</LikesNumber>
          <TouchableOpacity>
            <Icon name='heart-outline' />
          </TouchableOpacity>
        </LikesArea>
        <TimePost>12 horas</TimePost>
      </CardFooter>
    </Container>
  )
}
