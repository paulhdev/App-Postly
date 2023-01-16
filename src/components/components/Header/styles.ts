import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.View`
  max-width: 90%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px 0;
`;

export const Icon = styled(Ionicons)`
  font-size: 24px;
  margin-left: 20px;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #c4bebc;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const AreaIcons = styled.View`
  flex-direction: row;
  align-items: center;
`;
