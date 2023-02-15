import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function NoteCard({ note, onArchive, onDelete }) {
  const handleArchive = () => {
    onArchive(note.id)
  }
  const handleDelete = () => {
    onDelete(note.id)
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {/* Word of the Day */}
          {note.archived ? "Archived" : "Active"}
        </Typography>
        <Typography variant="h5" component="div">
          {note.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {note.createdAt}
        </Typography>
        <Typography variant="body2">
          {note.body}
        </Typography>
      </CardContent>
      <CardActions >
        {/* create archive button and delete button align spacebeetwen */}
        {/* <div>
          <Button size="small">Archive</Button>
          <Button size="small">Delete</Button>
        </div> */}

        <Grid container padding={4} spacing={2}>
          <Grid item xs={6}>
            <Button size="small" variant="outlined" onClick={handleArchive} color={note.archived ? 'primary' : 'warning'}>{note.archived ? "Unarchive" : "Archive"}</Button>
          </Grid>
          <Grid item xs={6}>
            <Button size="small" variant="outlined" onClick={handleDelete} color='error'>Delete</Button>
          </Grid>

        </Grid>


      </CardActions>
    </Card>
  );
}