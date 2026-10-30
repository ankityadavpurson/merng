import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import MenuBar from "./components/MenuBar";
import { AuthProvider } from "./context/auth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import AuthRoute from "./utils/auth-route";

const THEME_STORAGE_KEY = "themePreference";

const getSystemTheme = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getStoredThemePreference = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === "dark" || storedTheme === "light" ? storedTheme : null;
};

function App() {
  const [themePreference, setThemePreference] = useState(getStoredThemePreference);
  const [theme, setTheme] = useState(() => getStoredThemePreference() || getSystemTheme());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (event) => {
      if (!themePreference) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    if (!themePreference) {
      setTheme(mediaQuery.matches ? "dark" : "light");
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }

    mediaQuery.addListener(updateTheme);
    return () => mediaQuery.removeListener(updateTheme);
  }, [themePreference]);

  const handleThemeToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setThemePreference(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <AuthProvider>
      <Router>
        <Container>
            <MenuBar theme={theme} onThemeToggle={handleThemeToggle} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthRoute component={Login} />} />
            <Route
              path="/register"
              element={<AuthRoute component={Register} />}
            />
            <Route path="/posts/:postId" element={<SinglePost />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
