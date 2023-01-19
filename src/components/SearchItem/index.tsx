import { useNavigation } from '@react-navigation/native';

import {
  Container,
  InfoArea,
  AvatarImage,
  Name,
  Icon
} from './styles'

import { stackAppNavigationProps } from '../../routes/app.routes'

type ItemProps = {
  data: {
    uid: string;
    name: string;
    email: string;
  }
}

export default function SearchItem({ data }: ItemProps) {

  const navigation = useNavigation<stackAppNavigationProps>()

  const handleScreenUserPosts = () => {
    navigation.navigate('UserPosts', {
      uid: data?.uid,
      name: data?.name
    })
  }

  return (
    <Container onPress={handleScreenUserPosts}>
      <InfoArea>
        <AvatarImage source={{ uri: 'https://avatars.githubusercontent.com/u/42824466?v=4' }} />
        <Name numberOfLines={1}>{data.name}</Name>
      </InfoArea>
      <Icon name='arrow-forward-outline' />
    </Container>
  )
}