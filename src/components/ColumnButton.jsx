import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewColumnSharpIcon from "@mui/icons-material/ViewColumnSharp";
import { useDispatch, useSelector } from "react-redux";
import { changeColumns } from "../feature/noteSlice";
import { Stack, Tooltip } from "@mui/material";

function ColumnButton() {
  const state = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      dispatch(changeColumns(newAlignment));
    }
  };

  return (
    <Stack display={{ xs: "none", md: "block" }}>
      <ToggleButtonGroup
        value={state.column}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <Tooltip title="Column" placement="top">
          <ToggleButton value={6} aria-label="left aligned">
            <ViewColumnSharpIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="row" placement="top">
          <ToggleButton value={12} aria-label="centered">
            <ViewColumnSharpIcon sx={{ transform: "rotate(90deg)" }} />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default ColumnButton;
