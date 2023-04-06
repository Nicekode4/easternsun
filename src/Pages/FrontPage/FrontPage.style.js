import styled from "styled-components";

export const FrontPageStyle = styled.article`
color: #183948;
height: 63rem;
.topImg{
    height: 30rem;
    width: 100%;
    border-radius: 0px 0px 80px 80px;
    
}
p{
    color: #183948;
}
.revenueDiv{
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 1rem;
    border-radius: 40px;
    background-color: #A0E150;

    div{
        
        margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        padding: 0.5rem;
        h3{
            margin-right: 0.5rem;
        }
        h2{
            text-align: end;
            margin-right: 0.5rem;
        }

    }
}
.cardArea{
    display: grid;
        grid-template-columns: 40% 40% 20%;
    margin-top: 0.5rem;
    
    width: 100%;
    a{
        background: #DFE5E5;
border-radius: 40px;
margin: 1rem;
svg{
    height: 3rem;
    margin-top: 2rem;
    margin-left: 0.5rem;
}
p{
    color: #DFE5E5;
}
h2{
    color: #DFE5E5;
}
    }
}
`