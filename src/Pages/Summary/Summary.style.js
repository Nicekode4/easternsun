import styled from "styled-components";

export const SummaryStyle = styled.div`
text-align: center;
header{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    color: white;
    
    
    p{
        text-align: center;
        border-radius: 30px;
        width: 10rem;
        padding: 0.5rem;
        margin-top: 0.5rem;
        font-size: 35px;
        background-color: gray;

    }
}
.cardArea{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    justify-content: center;
    text-align: center;
    div{
        background-color: gray;
        border-radius: 20px;
        margin: 0.5rem;
    }
}

`