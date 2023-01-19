import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.black};
  margin-left: 10px;
`;
