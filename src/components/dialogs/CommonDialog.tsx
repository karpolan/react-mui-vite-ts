import { FunctionComponent, SyntheticEvent, useCallback } from 'react';
import {
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogProps as MuiDialogProps,
} from '@mui/material';
import { AppButton } from '..';
import { AppDialogTitle } from './components';
import { useDialogMinWidth } from './utils';

interface Props extends MuiDialogProps {
  data?: unknown;
  title?: string;
  hideCancelButton?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  onConfirm?: (data: unknown) => void;
  onClose?: (event: SyntheticEvent) => void;
}

/**
 * Shows generic "Common" dialog
 * @component CommonDialog
 * @param {function} props.onConfirm - event for Confirm button, called as onConfirm(data)
 * @param {function} props.onClose - event for Close and Cancel buttons and the backdrop
 */
const CommonDialog: FunctionComponent<Props> = ({
  children = 'Children is missing...',
  open = false, // Don't show dialog by default
  data, // optional data passed to onConfirm callback
  title = 'Missing title...',
  hideCancelButton = false,
  confirmButtonText = 'Confirm',
  confirmButtonColor = 'primary',
  onConfirm,
  onClose,
  ...restOfProps
}) => {
  const paperMinWidth = useDialogMinWidth();

  const handleOnConfirm = useCallback(() => {
    if (onConfirm && typeof onConfirm === 'function') {
      onConfirm(data);
    }
  }, [data, onConfirm]);

  return (
    <MuiDialog
      aria-labelledby="form-dialog-title"
      open={open}
      PaperProps={{
        sx: {
          minWidth: paperMinWidth,
        },
      }}
      onClose={onClose}
      {...restOfProps}
    >
      <AppDialogTitle id="form-dialog-title" onClose={onClose}>
        {title}
      </AppDialogTitle>
      <MuiDialogContent sx={{ py: 1 }}>{children}</MuiDialogContent>
      <MuiDialogActions sx={{ px: 3 }}>
        {!hideCancelButton && <AppButton onClick={onClose}>Cancel</AppButton>}
        <AppButton onClick={handleOnConfirm} color={confirmButtonColor} sx={{ mr: 0 }}>
          {confirmButtonText}
        </AppButton>
      </MuiDialogActions>
    </MuiDialog>
  );
};

export default CommonDialog;
