import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

function MenuBar({ theme, onThemeToggle }) {
  const authContext = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const isDarkTheme = theme === "dark";

  const handleItemClick = (_e, { name }) => setActiveItem(name);

  const menubar = authContext.user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={authContext.user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item
          name="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          <Icon name={isDarkTheme ? "sun" : "moon"} />
          {isDarkTheme ? "Light" : "Dark"}
        </Menu.Item>
        <Menu.Item name="logout" onClick={authContext.logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          <Icon name={isDarkTheme ? "sun" : "moon"} />
          {isDarkTheme ? "Light" : "Dark"}
        </Menu.Item>
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menubar;
}

export default MenuBar;
