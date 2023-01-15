import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 30px;
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
  border-color: #eb5e11;
  margin-top: 15px;
`;

export const Icon = styled(Ionicons)`
  font-size: 24px;
  color: #c4bebc;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  flex-grow: 1;
  margin-left: 5px;
  height: 55px;
`;

export const Button = styled.TouchableOpacity`
  max-width: 90%;
  width: 100%;
  height: 55px;
  align-items: center;
  justify-content: center;
  background-color: #eb5e11;
  margin: 30px 0;
  border-radius: 7px;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 20px;
`;

export const SignUpButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SignUpText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #c4bebc;
`;
