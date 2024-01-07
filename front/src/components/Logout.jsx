import React from "react";
import styled from "styled-components";

function Logout() {
	const handleClick = async () => {
		localStorage.clear()
		window.location.href = '/login';
	}
	return (
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
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
export default Logout;