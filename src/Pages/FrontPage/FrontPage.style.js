import styled from "styled-components";

export const FrontPageStyle = styled.article`
color: white;
height: 115vh;
img{
    height: 10vh;
    margin-left: 4rem;
}
p{
    color: white;
}
.revenueDiv{
    margin-top: 25vh;
    height: 30vh;
    margin-bottom: 5rem;

    div{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        h3{
            margin-right: 1rem;
        }
        h2{
            text-align: end;
            margin-right: 1rem;
        }
    }
}
.panelArea{
    display: grid;
    grid-template-columns: repeat(10,1fr);
    overflow: scroll;
    height: auto;
    .DaActive{
    background-color: green;
}
    div{
        margin: 0.5rem;
        width: 10rem;
        background-color: gray;
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
}

`