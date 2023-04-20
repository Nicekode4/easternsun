import styled from "styled-components";

export const SolarPanelsStyle = styled.article` 

    .panelArea{
       padding-bottom: 5rem;
        width: 100%;
    a{
        text-decoration: none;
        color: #DFE5E5;
    }
    display: grid;
    grid-template-columns: repeat(2,1fr);
    overflow: scroll;
    height: auto;

    div{
        border: 2px solid #DFE5E5;
        margin: 0.5rem;
        //background-color: #A0E150;
        border-radius: 30px;
        padding-top: 1rem;
        font-size: 13px;
        text-align: center;
        p{
            font-size: 20px;
        }
        img{
            height: 10vh;
            margin-left: 1vw;
        }
        
    }    
    .active{
        color: #183948;
    div{
        background-color: #A0E150;
        
    }
    
}
}
    
`