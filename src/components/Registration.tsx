import { React } from 'react';

import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const RegisterForm = () => {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			username: '',
			password: ''
		},

		validate: {
			// password and username 32 char limit
			username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid Email'),
			password: (value) => (/^[a-zA-Z]+$/).test(value) ? null : 'Invalid Password'
		},
	});

	return (
		<>
		<form onSubmit={(form.onSubmit((values) => console.log(values)))} >
			<TextInput
				label="Username"
				placeholder="Your Username"
				key={form.key('username')}
				{...form.getInputProps('username')}
			></TextInput>
			<TextInput
				lable="Password"
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
