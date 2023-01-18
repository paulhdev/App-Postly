import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.white};
`;

export const Title = styled.Text`
  font-size: 50px;
  margin-bottom: 30px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

export const InputArea = styled.View`
  max-width: 90%;
  width: 100%;
  height: 55px;
  flex-direction: row;
  align-items: center;
  background: transparent;
  padding: 10px;
  border-radius: 7px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.primary};
  margin-top: 15px;
`;

export const Icon = styled(Ionicons)`
  font-size: 24px;
  color: ${(props) => props.theme.colors.gray};
`;

export const Input = styled.TextInput`
  font-size: 16px;
  flex-grow: 1;
  margin-left: 5px;
  height: 55px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Button = styled.TouchableOpacity`
  max-width: 90%;
  width: 100%;
  height: 55px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  margin: 30px 0;
  border-radius: 7px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

export const SignUpButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SignUpText = styled.Text`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray};
`;
