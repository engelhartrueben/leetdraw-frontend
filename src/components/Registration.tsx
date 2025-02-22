import { React } from 'react';

import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import c from '../server/connectors';

const RegisterForm = () => {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			username: '',
			password: ''
		},

		validate: {
			// TODO: password and username 32 char limit
			username: (value) => (/^[a-zA-Z0-9]+$/.test(value) ? null : 'Invalid User'),
			password: (value) => (/^[a-zA-Z0-9]+$/.test(value) ? null : 'Invalid Password')
		},
	});

	return (
		<>
		<form onSubmit={(form.onSubmit((values) => c.post("registration",values)))}>
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


const Registration = () => {
	return(
		<RegisterForm />
	);
};

export default Registration;
