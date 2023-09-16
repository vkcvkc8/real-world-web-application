import React, { useState, useEffect, useContext, useReducer } from "react";

// Create a custom context for user authentication
const AuthContext = React.createContext();

// Define a reducer for managing user authentication
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const App = () => {
  // Initialize state and reducer for user authentication
  const [authState, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
  });

  // Simulate user authentication (fetch user data from an API)
  useEffect(() => {
    // Assuming an async function fetchUser is used to get user data
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        dispatch({ type: "LOGIN", payload: data });
      } catch (error) {
        // Handle authentication error
        console.error("Authentication failed:", error);
      }
    };

    // Check if the user is already authenticated
    if (!authState.isAuthenticated) {
      fetchUser();
    }
  }, [authState.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

const Header = () => {
  const { authState, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    // Simulate user logout
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header>
      <h1>My App</h1>
      {authState.isAuthenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </header>
  );
};

const Main = () => {
  const { authState } = useContext(AuthContext);

  return (
    <main>
      {authState.isAuthenticated ? (
        <AuthenticatedContent user={authState.user} />
      ) : (
        <Login />
      )}
    </main>
  );
};

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {
    // Simulate user login
    const user = { id: 1, username: "user123" };
    dispatch({ type: "LOGIN", payload: user });
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const AuthenticatedContent = ({ user }) => {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>This is the authenticated content of the app.</p>
    </div>
  );
};

const Footer = () => {
  return <footer>&copy; 2023 My App</footer>;
};

export default App;
