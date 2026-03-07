export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const userLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth/login";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};