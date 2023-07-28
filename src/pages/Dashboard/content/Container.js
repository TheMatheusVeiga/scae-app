import Styled from 'styled-components';
import Theme from '../../../style/theme';

const Container = Styled.div`
  width: 85vw;
  height: 85vh;
  margin: 3% 3% 3% 3%;
  background-color: ${Theme.white};
  border-radius: 2px;

  overflow: auto;
`;
export default Container;
