import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findNoteByTitle, getNotes } from "../feature/noteSlice";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.note);

  const searchChangeHandler = (e) => {
    setSearchText(e.target.value);
  };

  const searchHandler = () => {
    if (searchText) {
      dispatch(findNoteByTitle({ title: searchText }));
      setIsSearched(true);
    }
  };

  const getNotesBeforeSearch = () => {
    dispatch(getNotes());
    setIsSearched(false);
    setSearchText("");
  };
  return (
    <Grid container alignItems="center" justifyContent="center" paddingX="16px">
      <Paper
        component="div"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Notes"
          value={searchText}
          onChange={(e) => searchChangeHandler(e)}
          disabled={!state.notes.length}
        />
        {isSearched ? (
          <IconButton
            onClick={getNotesBeforeSearch}
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            disabled={!state.notes.length}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={searchHandler}
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            disabled={!state.notes.length}
          >
            <SearchIcon />
          </IconButton>
        )}
      </Paper>
    </Grid>
  );
}

export default SearchBar;
