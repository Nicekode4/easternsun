import styled from "styled-components";

export const NavBarStyle = styled.article`
display: grid;
grid-template-columns: repeat(4, 1fr);
position: fixed;
bottom: 0;
padding-bottom: 0.5rem;
padding-top: 0.5rem;
background-color: #252933;
width: 22rem;
border-radius: 20px;
margin: 0.5rem;
text-align: center;
a{
    width: 2rem;
    padding: 0.3rem;
}
div{
    padding-top: 0.7rem;
    a{
        padding: 0.5rem;
          text-decoration: none;
    color: white;  
    }
}
img{
    height: 3vh;
    
}
.active{
    border-radius: 50px;
    background-color: black;
}
`