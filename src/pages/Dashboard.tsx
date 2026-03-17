import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { Pet, Species } from '../types/pet';
import { speciesLabels } from '../types/pet';
import { PetCard } from '../components/PetCard/PetCard';
import { useEventLog } from '../hooks/useEventLog';
import { EventLog } from '../components/EventLog/EventLog';
import { fetchPets } from '../data/mockApi';

type SpeciesFilter = Species | 'all';

const Dashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>('all');
  const [isEventLogOpen, setIsEventLogOpen] = useState<boolean>(false);

  const { addEvent } = useEventLog();

  const loadPets = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPets();
      setPets(data);
      addEvent(`🚀 Загружено питомцев: ${data.length}`);
    } catch (error) {
      console.error(error);
      addEvent('❌ Не удалось загрузить список питомцев.');
    } finally {
      setIsLoading(false);
    }
  }, [addEvent]);

  useEffect(() => {
    void loadPets();
  }, [loadPets]);
  const speciesOptions = useMemo<Species[]>(
    () => Array.from(new Set(pets.map((p) => p.species))),
    [pets],
  );

  const filteredPets = useMemo(
    () =>
      speciesFilter === 'all'
        ? pets
        : pets.filter((pet) => pet.species === speciesFilter),
    [pets, speciesFilter],
  );

  const handleFilterChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const value = event.target.value as SpeciesFilter;
      setSpeciesFilter(value);
      if (value === 'all') {
        addEvent('🔎 Фильтр сброшен: отображаются все виды.');
      } else {
        const label = speciesLabels[value];
        addEvent(`🔎 Фильтр по виду: ${label}.`);
      }
    },
    [addEvent],
  );

  const handleResetFilter = useCallback(() => {
    setSpeciesFilter('all');
    addEvent('🔎 Фильтр по виду сброшен.');
  }, [addEvent]);

  const toggleEventLog = useCallback(() => {
    setIsEventLogOpen((prev) => !prev);
  }, []);

  const handlePetEvent = useCallback(
    (message: string) => {
      addEvent(message);
    },
    [addEvent],
  );

  return (
    <>
      <Box
        sx={{
          px: 3,
          pt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" component="h1">
            CyberZoo Dashboard 2077
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управляйте энергией и настроением цифровых питомцев в реальном
            времени.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="species-filter-label">Фильтр по виду</InputLabel>
            <Select<string>
              labelId="species-filter-label"
              label="Фильтр по виду"
              value={speciesFilter}
              onChange={handleFilterChange}
            >
              <MenuItem value="all">Все виды</MenuItem>
              {speciesOptions.map((species) => (
                <MenuItem key={species} value={species}>
                  {speciesLabels[species]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={handleResetFilter}
          >
            Сброс
          </Button>

          <Tooltip title="Открыть лог событий">
            <IconButton onClick={toggleEventLog}>
              <ListAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <div className="dashboard-grid">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid rgba(148,163,184,0.4)',
                }}
              >
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={10}
                  sx={{ my: 1.5, borderRadius: 999 }}
                />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="70%" />
              </Paper>
            ))
          : filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onEvent={handlePetEvent} />
            ))}
      </div>

      <EventLog open={isEventLogOpen} onClose={toggleEventLog} />
    </>
  );
};

export default Dashboard;
