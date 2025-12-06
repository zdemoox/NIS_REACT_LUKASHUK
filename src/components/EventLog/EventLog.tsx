import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEventLog } from '../../hooks/useEventLog';

interface EventLogProps {
  open: boolean;
  onClose: () => void;
}

export const EventLog: React.FC<EventLogProps> = ({ open, onClose }) => {
  const { events, clearEvents } = useEventLog();

  const handleClear = () => {
    clearEvents();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 360,
          bgcolor: 'background.default',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        role="presentation"
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="h6">Лог событий</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              startIcon={<DeleteSweepIcon />}
              onClick={handleClear}
              disabled={events.length === 0}
            >
              Очистить
            </Button>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        {/* Список событий */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {events.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ px: 2, py: 2 }}
            >
              Событий пока нет. Взаимодействуйте с питомцами, чтобы заполнить
              лог.
            </Typography>
          ) : (
            <List dense>
              {events.map((event, index) => (
                <ListItem
                  key={index}
                  sx={{
                    alignItems: 'flex-start',
                    py: 0.6,
                  }}
                >
                  <ListItemText primary={event} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
