import React from "react";
import AddNote from "./AddNote";
import { Grid, Typography } from "@mui/material";
import Notes from "./Notes";
import SearchBar from "./SearchBar";

function NoteList() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      padding={{ xs: "16px", md: "32px" }}
    >
      <Typography mt={1} variant="h4">
        Note App
      </Typography>
      <Grid
        container
        marginTop={2}
        direction={{ xs: "column-reverse", sm: "row" }}
      >
        <Grid item paddingTop={{ xs: "16px" }} xs={6} md={8}>
          <SearchBar />
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
