import { useNavigation } from '@react-navigation/native';

import {
  Container,
  InfoArea,
  AvatarImage,
  Name,
  Icon
} from './styles'

import { propsStack } from '../../routes/app.routes'

type ItemProps = {
  data: {
    uid: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  }
}

const defaultAvatar = require('../../assets/default-avatar.png')

export default function SearchItem({ data }: ItemProps) {

  const navigation = useNavigation<propsStack>()

  const handleScreenUserPosts = () => {
    navigation.navigate('UserPosts', {
      uid: data?.uid,
      name: data?.name
    })
  }

  return (
    <Container onPress={handleScreenUserPosts}>
      <InfoArea>
        <AvatarImage source={data.avatarUrl === null ? defaultAvatar : { uri: data.avatarUrl }} />
        <Name numberOfLines={1}>{data.name}</Name>
      </InfoArea>
      <Icon name='arrow-forward-outline' />
    </Container>
  )
}
