import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../common/theme/theme';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectThemeMode } from './app-slice';
import { ErrorSnackbar, Header } from '@/common/components';
import { Routing } from '@/common/routing';

function App() {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
}

export default App;
