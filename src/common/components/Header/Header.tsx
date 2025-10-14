import { containerSx } from '@/common/styles/container.styles';
import { AppBar, Container, IconButton, Switch, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';
import { NavButton } from '../NavButton/NavButton';
import { getTheme } from '@/common/theme/theme';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import {
  changeThemeModeAC,
  selectStatus,
  selectThemeMode,
} from '@/app/app-slice';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';

export const Header = () => {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectStatus);
  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({ themeMode: themeMode === 'dark' ? 'light' : 'dark' }),
    );
  };

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar>
        <Container maxWidth="lg" sx={containerSx}>
          <IconButton color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  );
};
