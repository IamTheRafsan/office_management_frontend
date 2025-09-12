// Check if user is authenticated
const isAuthenticated = () => {
  return document.cookie.includes("token=");
};
