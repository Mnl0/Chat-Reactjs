import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerRoute } from "../utils/APIRouter";

function Register() {
	const [value, setValue] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			window.location.href = '/';
		}
	}, [])
	const handleSubmit = (event) => {
		event.preventDefault();
		if (handleValidation()) {
			const { username, email, password } = value;
			fetchData()
			async function fetchData() {
				const response = await fetch(registerRoute, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: username,
						email: email,
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
		const { username, email, password, confirmPassword } = value;
		if (password !== confirmPassword) {
			alert('Las contraseñas no coinciden');
			return false;
		}
		if (username === '' || email === '' || password === '' || confirmPassword === '') {
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
					</div>
					<input
						type="text"
						placeholder="Nombre"
						name="username"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="email"
						placeholder="email"
						name="email"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="password"
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="confirmar password"
						name="confirmPassword"
						onChange={(e) => handleChange(e)}
					/>
					<button
						type="submit">
						Crear Usuario
					</button>
					<span>ya tienes una cuenta ? <Link to="/login">Login</Link></span>

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
  background-color: #00796B;
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
    border: 0.1rem solid #00BCD4;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #00BCD4;
      outline: none;
    }
  }
  button {
    background-color: #00BCD4;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #009688;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #00BCD4;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register;