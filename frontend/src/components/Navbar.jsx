import { Link, NavLink } from "react-router-dom";
import Styled from "styled-components";
import logo from "../assets/images/logo.png";

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
  return (
    <Wrapper className="absolute w-full top-0">
      <nav className="bg-white/30 mt-5 mx-5 px-4 text-white font-bold text-lg rounded-2xl backdrop-blur-sm">
        <div className="nav-center mx-auto max-w-[1190px]">
          <div className="nav-links flex gap-3 items-center">
            <NavLink to={`/`}>Home</NavLink>
            <NavLink to={`/`}>About</NavLink>
            <NavLink to={`/`}>Contacts</NavLink>
          </div>
          <div className="nav-logo flex justify-center items-center text-4xl text-green-900">
            <img src={logo} alt="" className="" />
            <span className="pl-1 font-serif">Essence</span>
          </div>
          <div className="nav-action flex justify-end gap-3 my-auto">
            <Link to={`/login`}>
              <button className="">Login</button>
            </Link>
            <Link to={`/signup`}>
              <button className="bg-blue-500 rounded-full">Sign Up</button>
            </Link>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};
