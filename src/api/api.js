import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/notes",
})

export const getNotesApi = async () => {
    try {
        const response = await api.get("")
        return response.data
    } catch (err) {
        throw err.message
    }
}

export const addNoteApi = async (note) => {
    try {
        const response = await api.post("", {
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
        const response = await api.put(`/${note.id}`, {
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
        await api.delete(`/${note.id}`)
    } catch (err) {
        console.log(err.message)
    }
}

export const searchNoteApi = async (title) => {
    try {
        const response = await api.get(`?q=${title}`)
        return response.data
    } catch (err) {
        throw err.message
    }
}