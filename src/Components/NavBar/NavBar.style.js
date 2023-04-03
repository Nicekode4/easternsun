import styled from "styled-components";

export const NavBarStyle = styled.article`
display: grid;
grid-template-columns: repeat(4, 1fr);
position: fixed;
bottom: 0;
padding-bottom: 1rem;
background-color: black;
width: 100%;
div{
    padding-top: 0.5rem;
    a{
        
          text-decoration: none;
    color: white;  
    }
}
img{
    height: 3vh;
}
.active{
    background-color: red;
}
`