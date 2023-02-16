import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

const Filter = ({ filters, setFilter }) => {
    const handleChange = (event) => {
      const { name, checked } = event.target;
      setFilter((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    };
  
    return (
      <div className="mt-1 mb-1">
        <Box className="p-2 border rounded border-gray-500">
          <div className="flex flex-col border-b border-gray-500 px-4 py-3">
            <Typography color="primary.light" gutterBottom variant="h6">
              Condição
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={filters.resolvido} onChange={handleChange} name="resolvido" />}
              label="Resolvido"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.naoResolvido} onChange={handleChange} name="naoResolvido" />}
              label="Não Resolvido"
            />
          </div>
          <div className="flex flex-col pt-5 px-4 pb-2">
            <Typography color="primary.light" gutterBottom variant="h6">
              Dificuldade
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={filters.Iniciante} onChange={handleChange} name="Iniciante" />}
              label="Iniciante"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.Fácil} onChange={handleChange} name="Fácil" />}
              label="Fácil"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.Médio} onChange={handleChange} name="Médio" />}
              label="Médio"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.Difícil} onChange={handleChange} name="Difícil" />}
              label="Difícil"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.Expert} onChange={handleChange} name="Expert" />}
              label="Expert"
            />
          </div>
        </Box>
      </div>
    );
  };

export default Filter;