import { getDefaultNormalizer } from "@testing-library/react";
import { Dropdown, MenuItem, Input } from "bootstrap";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  InputGroup,
  Button,
  FormControl,
  DropdownButton,
  ButtonToolbar,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import search from "../assets/search.png";
import "../styles/searchbar.css";
import event from "./Events";

function SearchBar({ getData, setQuery, userId }) {
  const [leftState, setLeftState] = useState(0);


  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const [location, setLocation] = useState("city");
  const [keyword, setKeyword] = useState("");

  const { t, i18n } = useTranslation();

  const handleSelect = (e) => {

    setLocation(e.target.value);
  };

  function Cancel() {
    event.emit("clear_user", "searchbar");

    setLocation("city");
    setLow("");
    setHigh("");
    setKeyword("");
    setQuery("");
  }

  function searchByCondition() {
    if (low !== "" && high !== "" && Number(low) > Number(high)) {
      alert("Incorrect price range");
      return;
    }
    const url = `/search?low=${low}&high=${high}&location=${location}&keyword=${keyword}&userid=${userId}`;
    setQuery(url);
  }



  return (
    <div className="style row">
      <select
        onChange={(e) => handleSelect(e)}
        value={location}
        className="citys form-control col-2"
      >
        <option value="city">{t("City")}</option>
        <option value="Vancouver">{t("Vancouver")}</option>
        <option value="Burnaby">{t("Burnaby")}</option>
        <option value="Richmond">{t("Richmond")}</option>
      </select>
      <InputGroup.Text className="">{t("Price")}:</InputGroup.Text>
      <FormControl
        className="price-num"
        type="number"
        value={low}
        onChange={(e) => {
          setLow(e.target.value);
        }}
      />
      <InputGroup.Text className="">-</InputGroup.Text>
      <FormControl
        className="price-num2"
        type="number"
        value={high}
        onChange={(e) => {
          setHigh(e.target.value);
        }}
      />
      <FormControl
        className="col keyword"
        placeholder={t("Keyword")}
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <Button variant="outline-secondary " onClick={() => searchByCondition()}>
        <img src={search} alt="Search" className="imgstyle" />
      </Button>

      <Button variant="outline-secondary " onClick={() => Cancel()}>
        {t("Cancel")}
      </Button>
    </div>
  );
}

SearchBar.propTypes = {
  getData: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SearchBar;
