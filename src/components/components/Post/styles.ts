import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.View.attrs({
  shadowColor: '#444',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.36,
  shadowRadius: 6.68,

  elevation: 11,
})`
  max-width: 90%;
  width: 100%;
  margin: 15px auto;
  padding: 10px;
  background: #fff;
  border-radius: 7px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;

export const ImagePost = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 250px;
  border-radius: 7px;
  margin: 10px 0;
`;

export const Author = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const Content = styled.Text`
  font-size: 16px;
`;

export const CardFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const LikesArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const LikesNumber = styled.Text`
  margin-right: 5px;
`;

export const Icon = styled(Ionicons)`
  font-size: 24px;
`;

export const TimePost = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #c4bebc;
`;
