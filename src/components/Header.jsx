import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import "../styles/components/_header.css";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = { name: "John Doe", profileImage: "" };

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleNavigate = (url) => {
    if (!url) return;
    navigate(url);
  };

  return (
    <div className="header">
      <div className="header-title">Finote</div>
      <div className="header-right">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle tag="div" className="profile-icon">
            <Avatar src={user.profileImage} alt={user.name} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleNavigate("/profile")}>View Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => handleNavigate("/logout")}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
