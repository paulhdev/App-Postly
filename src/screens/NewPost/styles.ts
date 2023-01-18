import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.white};
  padding: 20px 5%;
  justify-content: space-between;
`;

export const TitleArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

export const Icon = styled(Ionicons)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.gray};
`;

export const ImagePreview = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 250px;
  border-radius: 7px;
  margin-top: 10px;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  margin-top: 10px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const ButtonArea = styled.View`
  flex-direction: column;
  align-items: flex-end;
`;

export const Button = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.primary};
  border-radius: 7px;
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.white};
`;

export const TextIndicator = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray};
  margin-top: 5px;
`;
