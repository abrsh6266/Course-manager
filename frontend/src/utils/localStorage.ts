export const saveUserDataToLocalStorage = (data: {
  id: string;
  email: string;
  username: string;
  token: string;
}) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const getUserDataFromLocalStorage = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const clearUserDataFromLocalStorage = () => {
  localStorage.removeItem("user");
};
