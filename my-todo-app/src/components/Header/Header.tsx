import "./Header.scss";
import BaseButton from "../BaseButton/BaseButton";
import { Link } from "react-router-dom";

const Header = () => {
    return (
      <header className="header">
        <div className="header-container">
          <ul className="header-list">
            <li className="header-list__item">
              <Link to="/all">
                <BaseButton title="All Tasks" />
              </Link>
            </li>
            <li className="header-list__item">
              <Link to="/deleted">
                <BaseButton title="Deleted Tasks" />
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  };
  
  export default Header;

