import React from "react";
import styled from "styled-components";

function Logout() {
  const handleClick = async () => {
    localStorage.clear()
    window.location.href = '/login';
  }
  return (
    //agregar un icono de logout/salir
    <Button onClick={handleClick}>
      <h6>Salir</h6>
    </Button>
  )
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #00BCD4;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
export default Logout;