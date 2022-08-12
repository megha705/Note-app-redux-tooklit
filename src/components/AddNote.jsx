import React, { useCallback, useEffect, useState } from "react";
import { Grid, TextField, Button, ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../feature/noteSlice";
import { editNote } from "../feature/noteSlice";
import { disableEditMode, noteEditHandler } from "../feature/noteSlice";
import { useSnackbar } from "notistack";
import FileUpload from "./FileUpload";

function AddNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const state = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.noteEdit) {
      setTitle(state.noteEdit.title);
      setText(state.noteEdit.text);
      setImage(state.noteEdit.image);
    }
  }, [state.noteEdit]);

  const saveNoteHandler = () => {
    if (title || text || image) {
      dispatch(addNote({ title, text, image }));
      enqueueSnackbar("Added successfully", { variant: "success" });
      resetField();
    }
  };

  const editSaveHandler = () => {
    dispatch(editNote({ id: state.noteEdit.id, title, text, image }));
    enqueueSnackbar("Edited successfully", { variant: "success" });
    dispatch(disableEditMode());
    resetField();
  };

  const canselEdit = () => {
    dispatch(disableEditMode());
    dispatch(noteEditHandler(null));
    resetField();
  };

  const convertImageToStringBase = useCallback((file) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const { result } = e.target;
      if (result) {
        setImage(result);
      }
    };
    fileReader.readAsDataURL(file);
  }, []);

  const resetImage = useCallback(() => {
    setImage("");
  }, []);

  const resetField = () => {
    setText("");
    setTitle("");
    setImage("");
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
      <FileUpload
        onImage={convertImageToStringBase}
        onfile={image}
        onReset={resetImage}
      />
      {state.isEdit ? (
        <ButtonGroup fullWidth variant="contained">
          <Button
            onClick={editSaveHandler}
            fullWidth
            variant="contained"
            color="success"
            disabled={
              (state.noteEdit && state.noteEdit.text) === text &&
              (state.noteEdit && state.noteEdit.title) === title &&
              (state.noteEdit && state.noteEdit.image) === image
            }
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
