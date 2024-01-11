import React from "react";
import styled from "styled-components";

function ChatInput({ handleSendMsg }) {
	const [msg, setMsg] = React.useState("");

	const sendMessage = (event) => {
		event.preventDefault();
		if (msg.length > 0) {
			console.log('entro al if este es el mensaje chatinput', msg);
			handleSendMsg(msg);
			setMsg("");
		}
	}
	return (
		<Container>
			<form className="input-container" onSubmit={(e) => sendMessage(e)}>
				<input
					type="text"
					placeholder="Escribe un mensaje..."
					value={msg}
					onChange={(event) => setMsg(event.target.value)}
				/>
				<button className="submit" type="submit">Enviar</button>
			</form>
		</Container>
	);
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 100% 95%;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .input-container {
    width: 100%;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #BDBDBD;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #00BCD4;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
      }
    }:hover {
	  cursor: pointer;
	}
  }
`;

export default ChatInput;