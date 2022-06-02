import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import "./Home.css";
import { useDispatch } from "react-redux";
import { filterByAreaAndCategory } from "../../store/shopreducers";

const SearchBar = () => {
  const [check, setCheck] = useState(false);
  const [searchval, setSearchval] = useState(""); // search value for areas
  const [searchUsers, setsearchUsers] = useState(""); // search value for categories
  const dispatch = useDispatch();
  const handleChange = () => {
    setCheck((check) => !check);
  };
  useEffect(() => {
    if (searchval == "")
      dispatch(
        filterByAreaAndCategory({
          name: null,
        })
      );
  }, [searchval]);
  useEffect(() => {
    if (searchUsers == "")
      dispatch(
        filterByAreaAndCategory({
          name: null,
        })
      );
  }, [searchUsers]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchval) {
      dispatch(
        filterByAreaAndCategory({
          name: searchval,
          check : 'area'
        })
      );
    }
    if (searchUsers) {
      dispatch(
        filterByAreaAndCategory({
          name: searchUsers,
          check : 'category'
        })
      );
    }
  };
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
    <div className="search-container views">
      <div
        style={{
          width: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!check ? (
          <p style={{ color: "#000000", fontSize: "15px" }}>Area</p>
        ) : (
          <p style={{ color: "#000000", fontSize: "15px" }}>Category</p>
        )}
        <RiArrowDropDownLine
          size={30}
          style={{ color: "#ff7800" }}
          onClick={handleChange}
        />
      </div>
    <div style={{width:'100%'}}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "baseline" ,justifyContent:'space-between'}}
      >
        {!check ? (
          <input
            value={searchval}
            onChange={(e) => setSearchval(e.target.value)}
            type="text"
            name="search"
            placeholder="Search by area name"
            className="search-input test"
            style={{
              marginLeft: "1vw",
              fontSize: "15px",
              color: "#000000",
            }}
          />
        ) : (
          <input
            value={searchUsers}
            onChange={(e) => setsearchUsers(e.target.value)}
            type="text"
            name="search"
            placeholder="Search by category name"
            className="search-input test"
            style={{
              marginLeft: "1vw",
              fontSize: "15px",
              color: "#000000",
            }}
          />
        )}
        <button
          type="submit"
          style={{ border: "none", backgroundColor: "#ffffff" }}
          className="search-btn"
        >
          <BsSearch style={{ color: "#ff7800" }} />
        </button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default SearchBar;
