"use client";
import { Box, Button, Modal, ModalDialog, Stack, Typography } from "@mui/joy";

type DeleteModalProps = {
    open: boolean;
    onClose: () => void;
    onDelete: () => Promise<void>;
    title?: string;
    description?: string;
  }
  

export default function DeleteModal({
        open,
        onClose,
        onDelete,
        title = "Are you absolutely sure?",
        description = "This action cannot be undone.", 
}: DeleteModalProps){
    return(
        <Modal open={open} onClose={onClose}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={{
            maxWidth: '450px',
            width: '100%',
          }}
        >
        <Stack className="mb-2" >
          <Typography level="h3" >
            {title}
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            {description}
          </Typography>
        </Stack>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="danger" onClick={onDelete}>
              Delete
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    )
}