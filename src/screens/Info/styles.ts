import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${(props) => props.theme.colors.white};
  padding: 20px 5%;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.primary};
  margin: 20px 0 5px 0;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.medium};
`;

export const Description = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.regular};
  margin: 10px 0;
`;
