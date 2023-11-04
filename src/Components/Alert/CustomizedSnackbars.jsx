import PropTypes from 'prop-types';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from './Alert';

export default function CustomizedSnackbars({ message, severity, open, anchorOrigin }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={ 2 } sx={ { width: '100%' } }>
      <Snackbar
        anchorOrigin={ anchorOrigin }
        open={ open }
        onClose={ handleClose }
      >
        <Alert onClose={ handleClose } severity={ severity } sx={ { width: '100%' } }>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

CustomizedSnackbars.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  anchorOrigin: PropTypes.shape().isRequired,
};
