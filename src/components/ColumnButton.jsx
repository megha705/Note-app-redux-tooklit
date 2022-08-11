import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewColumnSharpIcon from "@mui/icons-material/ViewColumnSharp";
import { useDispatch, useSelector } from "react-redux";
import { changeColumns } from "../feature/noteSlice";
import { Stack } from "@mui/material";

function ColumnButton() {
  const state = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const handleAlignment = (event, newAlignment) => {
    dispatch(changeColumns(newAlignment));
  };

  return (
    <Stack display={{ xs: "none", md: "block" }}>
      <ToggleButtonGroup
        value={state.column}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value={6} aria-label="left aligned">
          <ViewColumnSharpIcon />
        </ToggleButton>
        <ToggleButton value={12} aria-label="centered">
          <ViewColumnSharpIcon sx={{ transform: "rotate(90deg)" }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default ColumnButton;
