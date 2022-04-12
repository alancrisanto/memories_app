import {
	CREATE,
	DELETE,
	FETCH_ALL,
	// FETCH_POST,
	UPDATE,
	LIKE,
	FETCH_BY_SEARCH,
	START_LOADING,
	END_LOADING,
} from "../constants/actiontype";
import * as api from "../api/index";

//actions creators
// export const getPost = (id) => async (dispatch) => {
// 	try {
// 		dispatch({ type: START_LOADING });

// 		const { data } = await api.fetchPost(id);

// 		dispatch({ type: FETCH_POST, payload: { post: data } });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		console.log("Get the data");
		console.log(data);
		dispatch({ type: FETCH_ALL, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error.message);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);
		dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log("Error en getpostBySearch");
		console.log(error);
	}
};

export const createPost = (post, history) => async (dispatch) => {
	dispatch({ type: START_LOADING });
	try {
		const { data } = await api.createPost(post);

		dispatch({ type: CREATE, payload: data });
		history.push(`/posts/${data._id}`);
	} catch (error) {
		console.log("Error in createPost actions");
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log("Error en actions post update");
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log("Error en actions post delete");
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	const user = JSON.parse(localStorage.getItem("profile")); // agregado
	try {
		const { data } = await api.likePost(id, user?.token); // agregue user?.token
		dispatch({ type: LIKE, payload: data }); // cambie UPDATE por LIKE
	} catch (error) {
		console.log("Error en Like actions");
		console.log(error);
	}
};
