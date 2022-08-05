import React from "react";
import AddNote from "./AddNote";
import { Grid, Typography } from "@mui/material";
import Notes from "./Notes";

function NoteList() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      padding={4}
    >
      <Typography variant="h4">Note App</Typography>
      <Grid container marginTop={4}>
        <Grid item xs={6} md={8}>
          <Notes />
        </Grid>
        <Grid item xs={6} md={4}>
          <AddNote />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NoteList;
