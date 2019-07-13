import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#7159c1',
})`
  align-items: center;
  justify-content: center;
`;