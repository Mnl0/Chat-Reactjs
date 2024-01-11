import React from "react";
import styled from "styled-components";


function Welcome({ user }) {
  return (
    <Container>
      <h1>Bienvenido , <span>{user.username}</span></h1>
      <h3>Porfavor seleccione un chat para comenzar a chatear</h3>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #00BCD4;
  }
`;

export default Welcome;