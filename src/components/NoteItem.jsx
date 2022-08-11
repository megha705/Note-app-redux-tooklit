import React from "react";
import { Grid, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../feature/noteSlice";
import { enableEditMode, noteEditHandler } from "../feature/noteSlice";

function NoteItem(props) {
  const state = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const editHandler = (id) => {
    const findNote = state.notes.find((note) => note.id === id);
    dispatch(noteEditHandler(findNote));
    dispatch(enableEditMode());
    window.scrollTo(0, 0);
  };

  const { title, text, id, date, time } = props;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1.8),
    color: theme.palette.text.secondary,
  }));
  return (
    <Grid item xs={12} md={state.column} style={{ padding: "10px" }}>
      <Item style={{ position: "relative", overflow: "hidden" }}>
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <Typography variant="subtitle1" mb={2}>
          {text}
        </Typography>
        <Stack
          style={{
            borderTop: "1px solid rgba(255,255,255,.2)",
            paddingTop: "8px",
          }}
          direction="row"
          justifyContent="space-between"
        >
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
              disabled={state.isEdit}
            >
              Delete
            </Button>
          </Stack>
          <Stack>
            <Typography variant="caption">{date}</Typography>
            <Typography variant="caption">{time}</Typography>
          </Stack>
        </Stack>
      </Item>
    </Grid>
  );
}

export default NoteItem;
