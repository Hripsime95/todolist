import { Header } from '@/common/components/Header/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../common/theme/theme';
import { selectThemeMode } from './app-selectors';
import { Main } from './Main';
import { useAppSelector } from './useAppSelector';

function App() {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
