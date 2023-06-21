const initialState = {
	users: [],
	posts: [],
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'POPULATE_POSTS':
			return { ...state.posts, posts: payload.posts };
		default:
			return state;
	}
};
export default reducer;
