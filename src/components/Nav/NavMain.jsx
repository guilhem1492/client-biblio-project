import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "../../styles/NavMain.css";

const NavMain = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checked, setChecked] = useState(false);
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const searchBy = checked ? `author` : `title`;
    navigate(`/search?${searchBy}=${searchQuery}`);
  }

  return (
    <nav className="NavMain">
      <NavLink className="books-icon" to="/">
        <img src="/images/home.png" alt="icone livres" />
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="/profile">{currentUser && currentUser.name}</NavLink>
          <button onClick={removeUser}>
            <img
              className="logout-icon"
              src="/images/logout.png"
              alt="icone déconnexion"
            />
          </button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signup">
            <img
              className="signup-icon"
              src="/images/signup.png"
              alt="icone s'enregistrer"
            />
          </NavLink>
          <NavLink to="/signin">
            <img
              className="login-icon"
              src="/images/login.png"
              alt="icone connexion"
            />
          </NavLink>
        </>
      )}

      <form className="nav-search" onSubmit={handleSubmit}>
        <label htmlFor="searchTitle"></label>
        <input
          type="checkbox"
          name="author"
          checked={checked}
          onChange={(e) => {
            setChecked(Boolean(e.target.checked));
          }}
        />
        <input
          className="input-height"
          type="search"
          name="searchTitle"
          placeholder="Chercher un livre"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          id="searchTitle"
        />

        <button className="search-btn">
          <img
            className="magnifying-glass"
            src="/images/icon-search.png"
            alt="magnifying glass"
          />
        </button>
      </form>
    </nav>
  );
};

export default NavMain;
