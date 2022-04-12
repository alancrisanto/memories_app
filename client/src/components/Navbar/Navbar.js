import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import useStyles from "./styles";
import logoMemories from "../../images/Memories-Logo1.png";
import textMemories from "../../images/Memories-Text2.png";
import { LOGOUT } from "../../constants/actiontype";

const Navbar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	const logOut = () => {
		dispatch({ type: LOGOUT });
		history.push("/");
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;

		// JWT
		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	return (
		<AppBar className={classes.appBar} position="static" color="primary">
			<Link to="/" className={classes.brandContainer}>
				<img className={classes.image} src={logoMemories} alt="memories" height="100" />
				<img src={textMemories} alt="icon" height="100px" />
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>
							Logout
						</Button>
					</div>
				) : (
					<Button component={Link} to="/auth" variant="contained" color="primary">
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
