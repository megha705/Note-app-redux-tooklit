import React, { useContext } from "react";
import { Grid, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../feature/noteSlice";
import { NoteContext } from "./ContextProvider";

function NoteItem(props) {
  const { enableEditMode, noteEditHandeler } = useContext(NoteContext);
  const state = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const editHandler = (id) => {
    const findNote = state.notes.find((note) => note.id === id);
    noteEditHandeler(findNote);
    enableEditMode();
  };

  const { title, text, id } = props;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));
  return (
    <Grid item xs={12} md={6} style={{ padding: "10px" }}>
      <Item style={{ position: "relative", overflow: "hidden" }}>
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <Typography variant="subtitle1" mb={2}>
          {text}
        </Typography>
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => editHandler(id)}
            variant="contained"
            color="success"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => dispatch(deleteNote({ id }))}
            variant="contained"
            color="error"
            size="small"
          >
            Delete
          </Button>
        </Stack>
      </Item>
    </Grid>
  );
}

export default NoteItem;
