import { selectThemeMode } from '@/app/app-slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { getTheme } from '@/common/theme';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginInputs,
  loginSchema,
} from '@/features/auth/lib/schemas/login.schema';
import { login, selectIsLoggedIn } from '@/features/auth/model/auth-slice';
import { Navigate } from 'react-router';
import { Path } from '@/common/routing';

export const Login = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);

  const theme = getTheme(themeMode);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: '', password: '', rememberMe: false },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => reset());
  };

  return (
    <Grid container justifyContent={'center'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              error={!!errors.email}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Incorrect email address',
                },
              })}
            />
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Min Length of password should be 3',
                },
              })}
            />
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={'rememberMe'}
                  control={control}
                  render={({ field: { value, ...rest } }) => (
                    <Checkbox {...rest} checked={value} />
                  )}
                />
              }
              {...register('rememberMe')}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  );
};
