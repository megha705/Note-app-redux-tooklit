import NoteList from './components/NoteList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ContextProvider from './components/ContextProvider';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NoteList />
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
