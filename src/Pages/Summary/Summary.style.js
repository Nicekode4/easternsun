import styled from "styled-components";

export const SummaryStyle = styled.div`
height: 124vh;
.backBtn{
    text-align: left;
    height: 5rem;
    width: 5rem;
}
.cardAreaTop{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin-left: 2rem;
    margin-right: 2rem;
    text-align: center;
}
.spacer{
    background-color:white;
    height: 0.1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.cardArea{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    justify-content: center;
    text-align: center;
    div{
        background-color: #252933;
        border-radius: 20px;
        margin: 0.5rem;
    }
}

`