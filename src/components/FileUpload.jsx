import React, { memo } from "react";
import { Button } from "@mui/material";

const IMAGE_TYPE = /image\/(png|jpg|jpeg|gif)/i;

function FileUpload({ onImage, onfile }) {
  const handelFileUpload = (e) => {
    const file = Array.from(e.target.files);
    if (file[0].type.match(IMAGE_TYPE)) {
      onImage(file[0]);
    }
  };

  console.log("render")

  return (
    <Button
      fullWidth
      sx={{
        height: "100px",
        border: "2px dashed",
        borderColor: onfile ? "green" : "",
      }}
      color="primary"
      disableRipple
      component="label"
    >
      Upload File
      <input onChange={handelFileUpload} type="file" hidden />
    </Button>
  );
}

export default memo(FileUpload);
