import { useState, useCallback } from 'react';

export const useModal = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const showContentDialog = useCallback((title, content) => {
    setDialogTitle(title);
    setDialogContent(content);
    setShowDialog(true);
  }, []);

  const closeDialog = useCallback(() => setShowDialog(false), []);

  return {
    showDialog,
    dialogTitle,
    dialogContent,
    showContentDialog,
    closeDialog
  };
}; 