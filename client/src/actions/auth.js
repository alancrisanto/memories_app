import { AUTH } from "../constants/actiontype";
import * as api from "../api/index";

export const signin = (formData, history) => async dispatch => {
  try {
    //Login the user
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async dispatch => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};