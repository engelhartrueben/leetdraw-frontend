import { useState, useEffect } from 'react';

const Header = (props) => {
	// When user is logged in, set userName
	useEffect(() => {
		setUserName(props.userName);	
	}, [props.loggedIn])

	const renderUserName = () => {
		return (
			<span>{userName}</span>
		)
	}	
	
	return (
		<>
			<p>1337draw</p>
			<p>
				{ props.loggedIn ? userName : "" }
			</p>
		</>
	);
}

export default Header;
