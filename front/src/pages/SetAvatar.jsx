import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { setAvatarRoute } from "../utils/APIRouter";
import loader from "../assets/rick-morty.gif";

const YOUR_API_KEY = process.env.REACT_APP_API_KEY || 'rKFt3m8iATob5E';
const api = `https://api.multiavatar.com/4645646`

function SetAvatar() {
	const [avatar, setAvatar] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);

	useEffect(() => {
		fetchStorage();
		async function fetchStorage() {
			if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || 'chat-app-user')) {
				window.location.href = '/login';
			}
		}
	}, [])


	const setProfilePicture = async () => {
		if (selectedAvatar === undefined) {
			alert('Seleccione un avatar');
			return;
		}
		const user = await JSON.parse(
			localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || 'chat-app-user')
		);

		const fetchData = await fetch(`${setAvatarRoute}/${user._id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				image: avatar[selectedAvatar]
			})
		})
		// console.log(fetchData);
		if (fetchData.status === 200) {
			user.isAvatarImageSet = true;
			user.avatarImage = fetchData.image;
			localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY || 'chat-app-user', JSON.stringify(user));
			window.location.href = '/';
		}
		else {
			alert('Error al seleccionar el avatar, intente nuevamente');
			return;
		}
	}
	useEffect(() => {
		const data = [];
		fetchData()
		async function fetchData() {
			for (let i = 0; i < 4; i++) {
				const response = await fetch(`${api}/${Math.round(Math.random() * 1000)}.svg?apikey=${YOUR_API_KEY}`)
				const dataApi = response.url;
				data.push(dataApi);
			}
			setAvatar(data);
			setIsLoading(false);
		}
	}, [])

	return (
		<>
			{isLoading ? <Container>
				<img src={loader} alt="loader" className="loader" />
			</Container> : (
				<Container>
					<div className="title-container">
						<h1>Seleccione un avatar para su perfil</h1>
					</div>
					<div className="avatars">
						{avatar.map((avatar, index) => {
							return (
								<div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
									<img
										src={`${avatar.split('?')[0]}`}
										alt="avatar"
										key={index}
										onClick={() => setSelectedAvatar(index)} />
								</div>
							)
						})}
					</div>
					<button
						className="submit-btn"
						onClick={setProfilePicture}
					>Seleccione una imagen</button>
				</Container>
			)}

		</>
	);
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;