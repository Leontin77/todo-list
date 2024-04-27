import "./Header.scss";
import { useState, useEffect } from "react";
import BaseButton from "../BaseButton/BaseButton";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('');

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/all') {
      setActiveTab('ALL');
    } else if (pathname === '/deleted') {
      setActiveTab('DELETED');
    } else {
      setActiveTab('');
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header-container">
        <ul className="header-list">
          <li className="header-list__item">
            <Link to="/all">
              <BaseButton className={activeTab !== 'ALL' ? 'inactive' : ''} title="All Tasks" />
            </Link>
          </li>
          <li className="header-list__item">
            <Link to="/deleted">
              <BaseButton className={activeTab !== 'DELETED' ? 'inactive' : ''} title="Deleted Tasks" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
