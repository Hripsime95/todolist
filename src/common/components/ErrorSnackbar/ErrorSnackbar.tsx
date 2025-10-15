import { SyntheticEvent, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { setAppErrorAC, selectAppError } from '@/app/app-slice';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError);
  const dispatch = useAppDispatch();

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAppErrorAC({ error: null }));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};
