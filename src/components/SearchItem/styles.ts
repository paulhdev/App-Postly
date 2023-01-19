import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px auto;
  padding: 5px 15px;
  background: ${(props) => props.theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.gray};
  border-radius: 7px;
`;

export const InfoArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Ionicons)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

export const AvatarImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.bold};
`;
