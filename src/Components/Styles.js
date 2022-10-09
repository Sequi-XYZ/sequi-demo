import styled from "styled-components";


export const Header = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
justify-items: center;
`;

export const Button = styled.button`

height: 40px;
width: 100px;
border-radius: 5px;
margin: 5px;
border: none;
background: #909090;
transition: all 0.2s;
color: #202020;
font-size: 15px;


&:hover {
    opacity: 0.9;
}
`;

export const InputPost = styled.input`
height: 40px;
width: 100px;
border-radius: 5px;
margin: 5px;
border: none;
background: #909090;
transition: all 0.2s;
color: #202020;
font-size: 15px;


&:hover {
    opacity: 0.9;
}
`;

export const Posts = styled.div`
display: grid;
grid-template-rows: repeat(3, 1fr);
justify-items: center;
height: 150vh;
align-items: center;
`;

export const Post = styled.div`
display: grid;
text-align: center;
height: 150px;
width: 500px;
border-radius: 10px;
background: #202020;
color: #f1f1f1;
align-items: center;
`;

export const ChangeBu = styled.div`
height: 110px;
width: 300px;
border-radius: 10px;
color: #f1f1f1;
background: #030303;
display: grid;
text-align: center;
align-items: center;

`;