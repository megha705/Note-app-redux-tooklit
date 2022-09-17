import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
})

export const getNotesApi = async () => {
    try {
        const response = await api.get("/notes")
        return response.data
    } catch (err) {
        throw err.message
    }
}

export const addNoteApi = async (note) => {
    try {
        const response = await api.post("/notes", {
            id: Date.now(),
            title: note.title,
            text: note.text,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString('en-US'),
            image: note.image
        })
        return response.data
    } catch (err) {
        throw err.message
    }
}

export const editNoteApi = async (note) => {
    try {
        const response = await api.put(`/notes/${note.id}`, {
            title: note.title,
            text: note.text,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString('en-US'),
            image: note.image
        })
        return response.data
    } catch (err) {
        throw err.message
    }
}

export const deleteNoteApi = async (note) => {
    try {
        await api.delete(`/notes/${note.id}`)
    } catch (err) {
        console.log(err.message)
    }
}

export const searchNoteApi = async (title) => {
    try {
        const response = await api.get(`notes?q=${title}`)
        return response.data
    } catch (err) {
        throw err.message
    }
}