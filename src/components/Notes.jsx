import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import NoteItem from "./NoteItem";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../feature/noteSlice";

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
      // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ overflowY: "auto", maxHeight: "430px" }}
    >
      {state.loading && <Typography variant="h5">Loading...</Typography>}
      {state.error && <Typography variant="h5">{state.error}</Typography>}
      {state.notes.length ? (
        state.notes.map((note) => <NoteItem key={note.id} {...note} />)
      ) : (
        <Typography variant="h5">Not Note</Typography>
      )}
    </Grid>
  );
}

export default Notes;
