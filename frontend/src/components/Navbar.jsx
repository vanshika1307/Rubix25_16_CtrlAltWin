import { Link, NavLink, useNavigate } from "react-router-dom";
import Styled from "styled-components";
import logo from "../assets/images/logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Wrapper = Styled.div`
  .nav-links a {
    display : block;
  }
  .nav-center {
    display:grid;
    grid-template-columns : repeat(3, 1fr);
  }
  .nav-action button {
    padding : .3rem 1rem;
    font-size : 0.9rem;
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user data in localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    // Refresh the page
    window.location.reload();
    navigate("/");
  };

  useGSAP(() => {
    gsap.from(".nav-action button, .nav-links a", {
      y: -100,
      stagger: 0.2,
    });

    gsap.from(".nav-logo", {
      y: -50,
      opacity: 0,
    });
  });

  return (
    <Wrapper className="absolute w-full top-0">
      <nav className="bg-white/30 mt-5 mx-5 px-4 text-white font-bold text-lg rounded-2xl backdrop-blur-sm">
        <div className="nav-center mx-auto max-w-[1190px]">
          <div className="nav-links flex gap-3 items-center">
            <NavLink to={`/`}>Home</NavLink>
            <NavLink to={`/score`}>Scores</NavLink>
            <NavLink to={`/`}>Contacts</NavLink>
          </div>
          <div className="nav-logo flex justify-center items-center text-4xl text-green-900">
            <img src={logo} alt="" className="" />
            <span className="pl-1 font-title">Essence</span>
          </div>
          <div className="nav-action flex justify-end gap-3 my-auto">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-2xl" />
                  <span className="text-green-900">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to={`/auth`} state={{ isLogin: true }}>
                  <button className="">Login</button>
                </Link>
                <Link to={`/auth`} state={{ isLogin: false }}>
                  <button className="bg-blue-500 rounded-full">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};
