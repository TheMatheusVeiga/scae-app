import Styled from "styled-components";
import Theme from '../../../style/theme';

const Base = Styled.div`
display: flex;
justify-content: center;

width: 100vw;
height: 100vh;

background-color: ${Theme.contrast};
background-size: cover;
position:absolute;
top:0px;
right:0px;
bottom:0px;
left:0px;
`;
export default Base;