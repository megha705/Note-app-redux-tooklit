import { configureStore } from "@reduxjs/toolkit";
import noteReuser from "../feature/noteSlice";

const store = configureStore({
    reducer: {
        note: noteReuser
    }
})

export default store