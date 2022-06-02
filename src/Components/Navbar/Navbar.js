import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  faShoppingCart,
  faFilter,
  faShop,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import AddShop from "../Modals/AddShop";
import { filterByAreaAndCategory } from "../../store/shopreducers";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();


  const handleClickOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };
  const [openMenu, setopenMenu] = useState(false);
  const opening = Boolean(openMenu);

  const handleClickOpenMenu = (e) => {
    setopenMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setopenMenu(null);
  };

  const handleFilter = ()=>{
    dispatch(
      filterByAreaAndCategory({
        name: new Date(),
        check : 'date'
      })
    );
  }

  const handleReset = () => {
    dispatch(
      filterByAreaAndCategory({
        name: null,
      })
    );
  }

  return (
    <header className="header">
      <a href="/" className="logo">
        <i>
          <FontAwesomeIcon icon={faShop} />
        </i>
        The Everyday Store
      </a>
      <div className="icons" style={{ display: "flex", alignItems: "center" }}>
        <button type="button" id="search-btn" onClick={handleClickOpen}>
          <FontAwesomeIcon className="fa-icon" icon={faPlus} />
        </button>
        <button type="button" id="search-btn" onClick={handleClickOpenMenu}>
          <FontAwesomeIcon className="fa-icon" icon={faFilter} />
        </button>
      </div>
      <AddShop open={open} handleClose={handleClose} />
      <Menu
        id="basic-menu"
        anchorEl={openMenu}
        open={opening}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{
          zIndex: "9999",
          position: "fixed",
          left: "0",
          top: "0",
          right: "0",
        }}
      >
        <MenuItem style={{fontSize:'14px'}} onClick={handleFilter}>Filter By Date</MenuItem>
        <MenuItem style={{fontSize:'14px'}} onClick={handleReset}>Reset</MenuItem>
      </Menu>
    </header>
  );
};

export default Navbar;
