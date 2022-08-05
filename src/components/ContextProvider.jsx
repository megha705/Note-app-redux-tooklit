import { createContext, useState } from "react";

export const NoteContext = createContext();

function ContextProvider({ children }) {
  const [isEdit, setIsEdit] = useState(false);
  const [noteEdit, setNoteEdit] = useState(null);

  const enableEditMode = () => {
    setIsEdit(true);
  };

  const disableEditMode = () => {
    setIsEdit(false);
  };

  const noteEditHandeler = (note) => {
    setNoteEdit(note);
  };

  return (
    <NoteContext.Provider
      value={{
        isEdit,
        noteEdit,
        enableEditMode,
        disableEditMode,
        noteEditHandeler,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default ContextProvider;
