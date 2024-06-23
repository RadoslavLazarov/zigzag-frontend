export const selectUser = (store) => store.auth.user;
export const selectIsLoggedIn = (store) => !!store.auth.user;
