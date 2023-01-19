import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.SafeAreaView`
  padding: 20px 0;
  align-items: center;
`;

export const Name = styled.Text`
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.black};
  margin-top: 15px;
`;

export const Email = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray};
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
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.white};
`;

export const Icon = styled(Ionicons)`
  font-size: 32px;
  color: ${(props) => props.theme.colors.primary};
  z-index: 99;
  opacity: 0.5;
  position: absolute;
`;

export const UploadButton = styled.TouchableOpacity`
  margin-top: 10%;
  width: 170px;
  height: 170px;
  border-radius: 85px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;

export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;
