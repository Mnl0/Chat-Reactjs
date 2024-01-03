import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginRoute } from "../utils/APIRouter";

function Login() {
	const [value, setValue] = useState({
		username: '',
		password: '',
	})
	useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			window.location.href = '/';
		}
	}, [])
	const handleSubmit = (event) => {
		event.preventDefault();
		if (handleValidation()) {
			const { username, password } = value;
			fetchData()
			async function fetchData() {
				const response = await fetch(loginRoute, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: username,
						password: password
					})
				})
				const data = await response.json();
				if (data.status === false) {
					alert(data.message);
					return;
				}
				if (data.status === true) {
					localStorage.setItem('chat-app-user', JSON.stringify(data.data));
					window.location.href = '/';
				}
			}
		}
	}
	const handleChange = (event) => {
		setValue({
			...value,
			[event.target.name]: event.target.value
		})
	}
	const handleValidation = () => {
		const { username, password } = value;
		if (username === '' || password === '') {
			alert('Todos los campos son requeridos');
			return false;
		}
		//mejorar validaciones
		return true;

	}
	return (
		<>
			<FormContainer>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className="brand">
						<h1>Registro</h1>
						{/* <img src="" alt="buscar un logo" /> */}
					</div>
					<input
						type="text"
						placeholder="Nombre"
						name="username"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="password"
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					<button
						type="submit">
						Logearse
					</button>
					<span>No tienes una cuenta ? <Link to="/register">Registrarse</Link></span>

				</form>
			</FormContainer>
		</>
	);
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login;