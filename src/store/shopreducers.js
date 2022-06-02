import { createSlice } from "@reduxjs/toolkit";
import { ShopData } from "../FakeShopData/FakeData";

export const ShopSlice = createSlice({
    name : "shops",
    initialState : {value : ShopData , filter : null,check:''},
    reducers : {
        // Various Functionality code
        addShop : (state,action) => {
           state.value.push(action.payload)
        },
        deleteShop : (state,action) => {
            // the logic is filtering out the object by grabbing its id and display the other objects
            state.value = state.value.filter((shop)=> shop.id !== action.payload.id)
        },
        filterByAreaAndCategory : (state,action) => {
            state.filter = action.payload.name
            state.check = action.payload.check
        },
        editShop : (state,action) => {
            state.value.map((user) => {
                if (user.id === action.payload.id) {
                  user.name =action.payload.name==="" ? user.name : action.payload.name;
                  user.area =action.payload.area==="" ? user.area : action.payload.area;
                  user.category =action.payload.category==="" ? user.category : action.payload.category;
                  user.OpeningDate =action.payload.OpeningDate==="" ? user.OpeningDate : action.payload.OpeningDate;
                  user.ClosingDate =action.payload.ClosingDate==="" ? user.ClosingDate : action.payload.ClosingDate;
                }
              });
        }
    }
})

export const {addShop,deleteShop,filterByAreaAndCategory,editShop} = ShopSlice.actions

export default ShopSlice.reducer

