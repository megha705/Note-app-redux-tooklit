import React, { useState, memo } from "react";
import { Button } from "@mui/material";

const IMAGE_TYPE = /image\/(png|jpg|jpeg|gif)/i;

function FileUpload({ onImage }) {
  const [fileUpload, setFileUpload] = useState([]);
  const handelFileUpload = (e) => {
    const file = Array.from(e.target.files);
    setFileUpload(file);
    onImage(file[0]);
  };

  return (
    <Button
      fullWidth
      sx={{ height: "100px", border: "2px dashed" }}
      variant="outlined"
      disableRipple
      component="label"
    >
      Upload File
      <input onChange={handelFileUpload} type="file" hidden />
    </Button>
  );
}

export default memo(FileUpload);
