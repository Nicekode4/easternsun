import styled from "styled-components";

export const FrontPageStyle = styled.article`
color: white;
height: 62rem;
img{
    height: 10vh;
    margin-left: 4rem;
}
p{
    color: white;
}
.revenueDiv{
    margin-top: 25vh;
    
    background-color: #252933;

    div{
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
.panelArea{
    a{
        text-decoration: none;
        color: white;
    }
    display: grid;
    grid-template-columns: repeat(21,1fr);
    overflow: scroll;
    height: auto;

    div{
        
        margin: 0.5rem;
        width: 10rem;
        
        padding: 1rem;
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
    background-color: green;
    
}
}

`