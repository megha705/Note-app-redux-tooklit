import React, { memo } from "react";
import { Button, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const IMAGE_TYPE = /image\/(png|jpg|jpeg|gif)/i;

function FileUpload({ onImage, onfile, onReset }) {
  const handelFileUpload = (file) => {
    if (file[0].type.match(IMAGE_TYPE)) {
      onImage(file[0]);
    }
    console.log(file);
  };

  const handelChange = (e) => {
    const file = Array.from(e.target.files);
    handelFileUpload(file);
    e.target.value = null;
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files);
    console.log(file);
    handelFileUpload(file);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const styles = {
    paperContainer: {
      backgroundImage: `url(${onfile})`,
      backgroundSize: "70%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      // ...(onfile && { filter: "grayscale(100%)" }),
    },
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "120px",
        position: "relative",
        border: "0.15rem dashed #90caf9",
      }}
      style={styles.paperContainer}
    >
      {onfile ? (
        <IconButton
          onClick={() => onReset()}
          sx={{ position: "absolute", right: 5, top: 5, zIndex: 4, opacity: 1 }}
          aria-label="delete"
          size="small"
          color="error"
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      ) : null}
      <Button
        sx={{
          height: "100%",
        }}
        fullWidth
        color="primary"
        disableRipple
        component="label"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      >
        {onfile ? "" : "Upload File"}
        <input onChange={(e) => handelChange(e)} type="file" hidden />
      </Button>
    </Stack>
  );
}

export default memo(FileUpload);
