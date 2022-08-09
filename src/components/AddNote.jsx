import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../feature/noteSlice";
import { editNote } from "../feature/noteSlice";
import { disableEditMode, noteEditHandler } from "../feature/noteSlice";

function AddNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const state = useSelector((state) => state.note);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.noteEdit) {
      setTitle(state.noteEdit.title);
      setText(state.noteEdit.text);
    }
  }, [state.noteEdit]);

  const saveNoteHandler = () => {
    if (title || text) {
      dispatch(addNote({ title, text }));
      resetField();
    }
  };

  const editSaveHandler = () => {
    dispatch(editNote({ id: state.noteEdit.id, title, text }));
    dispatch(disableEditMode());
    resetField();
  };

  const canselEdit = () => {
    dispatch(disableEditMode());
    dispatch(noteEditHandler(null));
    resetField();
  };

  const resetField = () => {
    setText("");
    setTitle("");
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      padding={2}
      gap={2}
    >
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="outlined-multiline-static"
        label="Text"
        multiline
        fullWidth
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {state.isEdit ? (
        <ButtonGroup fullWidth variant="contained">
          <Button
            onClick={editSaveHandler}
            fullWidth
            variant="contained"
            color="success"
          >
            Edit note
          </Button>
          <Button
            onClick={canselEdit}
            fullWidth
            variant="contained"
            color="error"
          >
            Cansel
          </Button>
        </ButtonGroup>
      ) : (
        <Button
          onClick={saveNoteHandler}
          fullWidth
          variant="contained"
          color="primary"
        >
          Save note
        </Button>
      )}
    </Grid>
  );
}

export default AddNote;
