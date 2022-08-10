import NoteList from './components/NoteList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <SnackbarProvider maxSnack={3} dense autoHideDuration={3000} anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NoteList />
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
