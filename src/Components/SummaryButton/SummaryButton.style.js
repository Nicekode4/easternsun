import styled from "styled-components";

export const SummaryButtonStyle = styled.div`
margin-top: 0;
padding: 0.1rem;
background-color: #252933;
a{
    text-decoration: none;
    div{
         border-radius: 10px;
    width: 21rem;
    background-color: gray;
margin: 1rem;
display: grid;
grid-template-columns: 30% 55% 15%;


padding-top: 1rem;
padding-bottom: 0.5rem;
    padding-top: 0.5rem;  
    h2{
font-size: 20px;
color: white; 
    } 
    }

img{
    height: 5vh;
    margin: 0;
    padding: 0;
}
.arrow{
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
}
.summary{
    padding-left: 1rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
}
}
`