import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotes = createAsyncThunk("note/getNotes",
    async () => {
        try {
            const response = await axios.get('/notes');
            return response.data
        } catch (error) {
            console.log(error.message);
        }
    }
)

export const addNote = createAsyncThunk('note/addNote',
    async (payload) => {
        const response = await axios.post('/notes', {
            id: Date.now(),
            title: payload.title,
            text: payload.text,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString('en-US'),
            image: payload.image
        })
        return response.data
    }
)

export const editNote = createAsyncThunk('note/editNote',
    async (payload) => {
        const response = await axios.put(`/notes/${payload.id}`, {
            title: payload.title,
            text: payload.text,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString('en-US'),
            image: payload.image
        })
        return response.data
    }
)

export const deleteNote = createAsyncThunk('note/deleteNote',
    async (payload) => {
        await axios.delete(`/notes/${payload.id}`)
        return { id: payload.id }
    }
)

export const findNoteByTitle = createAsyncThunk('note/findNoteByTitle',
    async ({ title }) => {
        console.log(title)
        const response = await axios.get(`/notes?q=${title}`)
        return response.data
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
            console.log(action)
            state.notes = state.notes.filter((note) => note.id !== action.payload.id)
        },
        [findNoteByTitle.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.notes = action.payload
        }
    }
})

export default noteSlice.reducer
export const { enableEditMode,
    disableEditMode,
    noteEditHandler, changeColumns } = noteSlice.actions