import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotesApi, addNoteApi, editNoteApi, deleteNoteApi, searchNoteApi } from "../api/api";

export const getNotes = createAsyncThunk("note/getNotes",
    async () => {
        const response = await getNotesApi();
        return response
    }
)

export const addNote = createAsyncThunk('note/addNote',
    async (payload) => {
        const response = await addNoteApi(payload)
        return response
    }
)

export const editNote = createAsyncThunk('note/editNote',
    async (payload) => {
        const response = await editNoteApi(payload)
        return response
    }
)

export const deleteNote = createAsyncThunk('note/deleteNote',
    async (payload) => {
        await deleteNoteApi(payload)
        return { id: payload.id }
    }
)

export const findNoteByTitle = createAsyncThunk('note/findNoteByTitle',
    async ({ title }) => {
        const response = await searchNoteApi(title)
        return response
    }
)

const initialState = {
    loading: false,
    notes: [],
    error: '',
    count: 2,
    isEdit: false,
    noteEdit: null,
    column: 6
}

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        enableEditMode: (state) => {
            state.isEdit = true
        },
        disableEditMode: (state) => {
            state.isEdit = false
        },
        noteEditHandler: (state, action) => {
            state.noteEdit = action.payload
        },
        changeColumns: (state, action) => {
            state.column = action.payload
        }
    },
    extraReducers: {
        [getNotes.pending]: (state) => {
            state.loading = true
        },
        [getNotes.fulfilled]: (state, action) => {
            state.loading = false
            state.notes = action.payload
            state.error = ''
        },
        [getNotes.rejected]: (state, action) => {
            state.loading = false
            state.notes = []
            state.error = action.error.message
        },
        [addNote.fulfilled]: (state, action) => {
            state.notes.push(action.payload)
        },
        [editNote.fulfilled]: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id)
            state.notes[index] = {
                ...state[index],
                ...action.payload
            }
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload.id)
        },
        [findNoteByTitle.fulfilled]: (state, action) => {
            state.notes = action.payload
        }
    }
})

export default noteSlice.reducer
export const { enableEditMode,
    disableEditMode,
    noteEditHandler, changeColumns } = noteSlice.actions