import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteShop } from "../../store/shopreducers";
import SearchBar from "./SearchBar";
import EditShop from "../Modals/EditShop";

const Home = () => {
  const [open, setopen] = useState(false);
  const [text, settext] = useState("");

  const handleClickOpen = (id) => {
    setopen(true);
    settext(id);
  };

  const handleClose = () => {
    setopen(false);
  };
  const dispatch = useDispatch();
  const shopList = useSelector((state) => {
    const all = state.shops.value;
    const filterName = state.shops.filter;
    if (filterName === null) {
      return all;
    } else {
      if (state.shops.check == "area")
        return all.filter((project) => project.area === filterName);
      else if (state.shops.check == "category")
        return all.filter((project) => project.category === filterName);
      else if (state.shops.check == "date")
        return all.filter(
          (project) =>
            new Date(project.ClosingDate) - filterName > 0 &&
            filterName - new Date(project.OpeningDate) > 0
        );
    }
  });

  const handleDelete = (id) => {
    dispatch(
      deleteShop({
        id: id,
      })
    );
  };

  return (
    <section className="products" id="products">
      <h1 className="heading">
        our <span>stores</span>
      </h1>

      <div className="products-slider slider">
        <div className="wrapper swiper-wrapper">
          <SearchBar />

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {shopList.map((shop) => {
              return (
                <Grid item xs={12} sm={6} md={4} style={{ marginTop: "2vh" }}>
                  <div className="box">
                    <img
                      src="https://st2.depositphotos.com/6741230/11285/v/950/depositphotos_112859506-stock-illustration-shop-front-vector-illustration.jpg"
                      alt=""
                    />
                    <h3>{shop.name}</h3>
                    <div className="price">Location : {shop.area}</div>
                    <div className="stars">Category : {shop.category}</div>
                    <div className="price">
                      {shop.OpeningDate} : {shop.ClosingDate}
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleClickOpen(shop.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        style={{ marginLeft: "1vw" }}
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(shop.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Grid>
              );
            })}
            <EditShop name={text} open={open} handleClose={handleClose} />
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Home;
