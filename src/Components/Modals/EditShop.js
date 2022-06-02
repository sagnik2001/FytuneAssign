import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../Home/Home.css";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addShop, editShop } from "../../store/shopreducers";

const categoryoptions = [
  { value: "Grocery", label: "Grocery" },
  { value: "Butcher", label: "Butcher" },
  { value: "Chemist", label: "Chemist" },
  { value: "Baker", label: "Baker" },
  { value: "Stationary Shop", label: "Stationary Shop" },
];

const options = [
  { value: "Thane", label: "Thane" },
  { value: "Pune", label: "Pune" },
  { value: "Mumbai Suburban", label: "Mumbai Suburban" },
  { value: "Nashik", label: "Nashik" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Ahmednagar", label: "Ahmednagar" },
  { value: "Solapur", label: "Solapur" },
];

const EditShop = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [value, onChange] = useState(null);
  const [lastvalue, onHandleChange] = useState(null);
  const [text, setText] = useState(props.name);
  const isLetters = (str) => /^[A-Za-z]*$/.test(str); // regex text to not allow numericals
  const dispatch = useDispatch();
  const shopList = useSelector((state) => state.shops.value);

  // Convert Date According to the need

  const convertDate = (value) => {
    var date = new Date(value),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    const convert1 = [mnth, day, date.getFullYear()].join("/");

    return convert1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props.name);
   
      dispatch(
        editShop({
          id: props.name,
          name: text,
          area: selectedOption==null ? "" : selectedOption.value,
          category: selectedCategory==null ? "" : selectedCategory.value,
          OpeningDate: value==null ? "" : convertDate(value.toISOString()),
          ClosingDate: lastvalue==null ? "" : convertDate(lastvalue.toISOString()),
        })
      )
      setText("");
      setSelectedOption("");
      setselectedCategory("");
      onChange("");
      onHandleChange("");
      props.handleClose();
     
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <h1 className="heading">
          <span> Edit stores </span>
        </h1>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <h3 className="context">
            Provide the necessary details to add new store
          </h3>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Shop Name(In Alphabets Only)"
          type="text"
          onkeydown="return /[a-z]/i.test(event.key)"
          fullWidth
          variant="standard"
          className="context"
          autoComplete="false"
          defaultValue={props.name}
          value={text}
          onChange={(e) => {
            if (isLetters(e.target.value)) {
             
              setText(e.target.value);
            }
          }}
        />
        <div style={{ marginTop: "2vh" }}>
          <Select
            className="react-select5"
            classNamePrefix="react-select5"
            onChange={setSelectedOption}
            options={options}
            placeholder="Area"
            value={selectedOption}
          />
        </div>
        <div style={{ marginTop: "2vh" }}>
          <Select
            className="react-select5"
            classNamePrefix="react-select5"
            value={selectedCategory}
            onChange={setselectedCategory}
            options={categoryoptions}
            placeholder="Category"
          />
        </div>
        <div style={{ marginTop: "2vh" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 8, lg: 12 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <h3 for="start" style={{ fontSize: "1.5rem" }}>
                Opening date:
              </h3>

              <DatePicker onChange={onChange} value={value} />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <h3 for="start" style={{ fontSize: "1.5rem" }}>
                Closing date:
              </h3>

              <DatePicker onChange={onHandleChange} value={lastvalue} />
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions style={{ margin: "auto", marginBottom: "6px" }}>
        <Button
          className="buttonprod"
          variant="contained"
          onClick={handleSubmit}
        >
          Edit Store
        </Button>
        <Button
          className="buttonpro"
          variant="contained"
          onClick={props.handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
     
    </Dialog>
  );
};

export default EditShop;
