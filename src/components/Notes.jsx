import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import NoteItem from "./NoteItem";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../feature/noteSlice";
import Skelton from "./Skelton";

function Notes() {
  const state = useSelector((state) => state.note);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  return (
    <Grid
      container
      rowSpacing={1}
      style={{ overflowY: "auto", maxHeight: "450px", marginTop: "16px" }}
    >
      {state.error && <Typography variant="h5">{state.error}</Typography>}
      {state.loading && <Skelton />}
      {!state.loading && state.notes.length
        ? state.notes.map((note) => <NoteItem key={note.id} {...note} />)
        : null}
    </Grid>
  );
}

export default Notes;
