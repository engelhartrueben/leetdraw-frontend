import { React, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import c from '../server/connectors';

interface Auth {
	authorizaiton: string | null
}



const LoginForm = () => {
	let wantsToLogIn: boolean = false;
	let isLoggedin: boolean = false;

	let [auth, setAuth] = useState(localStorage.getItem("auth"))

	useEffect(() => {
		if(typeof(auth) == "string") {
			return <Navigate to="/menu" replace />
		}
	}, [auth]);
	   	   
	// if auth, redirect to Menu page

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			username: '',
			password: ''
		},

		validate: {
			// TODO: password and username 32 char limit
			username: (value) => (/^[a-zA-Z0-9]{1,32}$/.test(value) ? null : 'Invalid User'),
			password: (value) => (/^[a-zA-Z0-9]{1,32}$/.test(value) ? null : 'Invalid Password'),
		},
	});

	return (auth) ? <Navigate to="/menu" replace /> : (
		<>
		{/* unsure if this Auth inteface unioned with any is... good */}
		<form 
			onSubmit=
				{
				form.onSubmit((values) => {
					const req: Auth = c.post("auth/register", values)
					if (req.authorization == null) {
						alert("Bad bad bad");
					} else {
						auth = req.authorization;	
					}
				})
			}>
			<TextInput
				label="Username"
				placeholder="Your Username"
				key={form.key('username')}
				{...form.getInputProps('username')}
			></TextInput>
			<TextInput
				label="Password"
				placeholder="Your Password"
				key={form.key('password')}
				{...form.getInputProps('password')}
			></TextInput>

			<Group justify="flex-end" mt="md">
				<Button type="submit">Register</Button>
			</Group>
		</form>
		</>
	);
}


const Login = () => {
	return(
		<LoginForm />
	);
};

export default Login;
