import { AUTH, LOGOUT } from "../constants/actiontype";

const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
			return { ...state, authData: action?.dat, loading: false, errors: null }; // agregue loading: false, errors: null
		case LOGOUT:
			localStorage.clear();
			return { ...state, authData: null, loading: false, errors: null }; //agregue loading: false, errors: null
		default:
			return state;
	}
};

export default authReducer;
