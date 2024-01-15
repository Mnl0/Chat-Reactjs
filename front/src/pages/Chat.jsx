import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllUsersRoute } from "../utils/APIRouter";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
function Chat() {

	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		fetchData()
		async function fetchData() {
			if (!localStorage.getItem('chat-app-user')) {
				window.location.href = '/login';
				return
			}
			const user = await JSON.parse(localStorage.getItem('chat-app-user'))
			setCurrentUser(user)
			setIsLoaded(true)
		}
	}, [])

	useEffect(() => {
		if (currentUser) {
			if (currentUser.isAvatarImageSet === false) {
				window.location.href = '/setavatar';
			}
		}

		//corregir esto primero carga toda la pagina despues hace la peticion
		isLoaded &&
			setTimeout(() => {
				fetchApi()
			}, 1000);
		async function fetchApi() {
			const url = `${getAllUsersRoute}/${currentUser._id}`
			const response = await fetch(url, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})
			const data = await response.json()
			setContacts(data)
		}
	}, [currentUser, isLoaded])

	const handleChatChange = (chat) => {
		setCurrentChat(chat)
	}

	return (
		<Container>
			<div className="container">
				<Contacts
					contacts={contacts}
					changeChat={handleChatChange}
				/>
				{isLoaded && currentChat === undefined ?
					<Welcome user={currentUser} /> :
					<ChatContainer user={currentUser} currentChat={currentChat} />}
			</div>
		</Container>
	);
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #00796B;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
	border-radius: 0.3rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  .sin-contanct {
	color: white;
  }
`;

export default Chat;