import React from "react";
import NoteCard from "./NoteCard";
import { Grid } from "@mui/material";

export default function GridListView({ notes, spacing = 3, itemBuilder },) {
    return (

        <div>
            {/* check length of notes */}
            {notes.length === 0 ? (<div> there is no note to display</div>) :
                (<Grid container spacing={spacing}>
                    {notes.map((note) => {

                        return (
                            <Grid item xs>
                                <div>
                                    {
                                        itemBuilder ? itemBuilder(note) : <NoteCard note={note} />
                                    }
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>)}
        </div>
    );
}