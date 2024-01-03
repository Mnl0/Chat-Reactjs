import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllUsersRoute } from "../utils/APIRouter";
import Contacts from "../components/Contacts";
function Chat() {
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	let id = undefined
	useEffect(() => {
		fetchData()
		async function fetchData() {
			if (!localStorage.getItem('chat-app-user')) {
				window.location.href = '/login';
				return
			}
			const user = await JSON.parse(localStorage.getItem('chat-app-user'))
			setCurrentUser(user)
		}
	}, [])
	useEffect(() => {
		let id = undefined
		if (currentUser) {
			if (currentUser.isAvatarImageSet === false) {
				window.location.href = '/setavatar';
			}
			id = currentUser._id
		}
		const url = `${getAllUsersRoute}/${id}`//corregir porque no se esta trayendo el id correctamente
		fetchApi()
		async function fetchApi() {
			const response = await fetch(url, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})
			const data = await response.json()
			setContacts(data)
		}
	}, [currentUser])
	const handleChatChange = (chat) => {
		setCurrentChat(chat)
	}
	return (
		<Container>
			<div className="container">
				{
					contacts.length > 0 ?
						<Contacts
							contacts={contacts}
							currentUser={currentUser}
							changeChat={handleChatChange}
						/>
						: <h6 className="sin-contanct">No hay contactos</h6>
				}
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
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  .sin-contanct {
	color: white;
  }
`;

export default Chat;