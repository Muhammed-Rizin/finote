import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu"; // Import a hamburger icon
import "../styles/components/_header.css";

const Header = ({ onSidebarToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const user = { name: "John Doe", profileImage: "" };

  return (
    <div className="header">
      <div className="header-left">
        <button className="hamburger-menu" onClick={onSidebarToggle}>
          <MenuIcon />
        </button>
        <div className="header-title">Finote</div>
      </div>
      <div className="header-right">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle tag="div" className="profile-icon">
            <Avatar src={user.profileImage} alt={user.name} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => console.log("Navigate to Profile")}>
              View Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => console.log("Logout")}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
