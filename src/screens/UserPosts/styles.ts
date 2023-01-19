import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.white};
`;

export const ListPosts = styled.FlatList`
  margin: 10px 0 30px 0;
`;

export const LoadingArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
