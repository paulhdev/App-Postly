import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  padding: 20px 0;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
  align-self: flex-start;
  margin-left: 5%;
`;

export const InputArea = styled.View`
  width: 90%;
  height: 55px;
  flex-direction: row;
  align-items: center;
  background: transparent;
  padding: 10px;
  border-radius: 7px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.primary};
  margin: 0 auto 15px auto;
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

export const List = styled.FlatList`
  flex: 1;
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
`;
