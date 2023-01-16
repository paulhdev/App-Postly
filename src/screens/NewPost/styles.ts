import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 20px 5%;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  margin-top: 15px;
`;

export const ButtonArea = styled.View`
  flex-direction: column;
  align-items: flex-end;
`;

export const Button = styled.TouchableOpacity`
  background: #eb5e11;
  border-radius: 7px;
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const TextIndicator = styled.Text`
  font-size: 14px;
  color: #c4bebc;
  margin-top: 5px;
`;
