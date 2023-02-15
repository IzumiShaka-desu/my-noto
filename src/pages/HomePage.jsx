import React from "react";
import DefaultAppBar from "../components/DefaultAppbar";
// import useState, useEffect
import { useState, useEffect } from "react";
import { getInitialData } from "../utils/utils";
import NoteCard from "../components/NoteCard";
import { Chip, Dialog, Grid, Button, TextField } from "@mui/material";
import GridListView from "../components/GridListView";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MultilineInput from "../components/MultilineInput";

export default function HomePage() {
    const [notes, setNotes] = useState([]);
    const [titleNotes, setTitleNotes] = useState('')
    const [bodyNotes, setBodyNotes] = useState('')
    const tabs = ["All", "Active", "Archived"];
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const handleArchive = (id) => {
        console.log("archive", id);
        let newNotes = notes.map((note) => {
            if (note.id === id) {
                return { ...note, archived: !note.archived };
            }
            return note;
        });
        setNotes(newNotes);
    };
    const handleDelete = (id) => {
        console.log("delete", id);
        let newNotes = notes.filter((note) => {
            return note.id !== id;
        });
        setNotes(newNotes);
    };


    const itemBuilder = (note) => {
        return (
            <div>
                <NoteCard note={note} onArchive={handleArchive} onDelete={handleDelete} />
            </div>
        );
    };

    useEffect(() => {
        // fetch("http://localhost:8000/notes")
        // load initial data from utils
        let data = getInitialData();
        setNotes(data);
    }, []);

    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };
    const getFilteredNotes = () => {
        return notes.filter((note) => {
            return note.title.includes(search) || note.body.includes(search);
        });
    };
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleSubmitForm = () => {
        // add new notes
        //  id with timestamp

        const newDate = new Date();

        const newNotes = {
            id: +newDate,
            title: titleNotes,
            body: bodyNotes,
            archived: false,
            createdAt: newDate.toISOString(),
        }
        console.log(newNotes)
        setNotes([...notes, newNotes])
        // clear input
        setTitleNotes('')
        setBodyNotes('')
        // close dialog
        setOpenDialog(false);
    }


    return (
        <div>
            <DefaultAppBar handleSearch={handleSearch} />

            <div style={{ padding: 16 }}>

                <Dialog open={openDialog} onClose={handleClose}>
                    <DialogTitle>Add New Note</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            you can add new note here
                        </DialogContentText>
                        {/* create maxlength text info and current length */}
                        <div style={{ display: "flex", marginBottom: -32, justifyContent: "space-between" }}>
                            <p></p>
                            <p style={{ fontSize: 11 }}>{titleNotes.length}/50</p>
                        </div>



                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Note Title"
                            type="text"
                            value={titleNotes}
                            onChange={(e) => {
                                if (e.target.value.length <= 50)
                                    setTitleNotes(e.target.value)
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <div style={{ display: "flex", fontSize: 12, justifyContent: "space-between" }}>
                            <p>Body Notes</p>
                            <p style={{ fontSize: 11 }}></p>
                        </div>

                        <TextareaAutosize
                            minRows={5}
                            fullWidth
                            style={{ width: 300 }}
                            // label="body notes"
                            // aria-label="body notes"
                            placeholder="fill you notes here"
                            defaultValue=""
                            label="body notes"
                            name="body"
                            value={bodyNotes}
                            onChange={(e) => setBodyNotes(e.target.value)}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {/* if title and body is filled button active else disabled */}
                        <Button onClick={handleSubmitForm} variant="contained" disabled={titleNotes.length === 0 || bodyNotes.length === 0}>Add</Button>
                    </DialogActions>
                </Dialog>
                {/* create add note button */}
                <Fab color="primary" aria-label="add" onClick={handleClickOpenDialog} variant="extended" style={{ position: "fixed", bottom: 16, right: 16 }}>
                    Add New Note <AddIcon />
                </Fab>
                {search.length > 0 ? (
                    <div>
                        <h1>Search Results</h1>
                        <p>Search results for {search}</p>
                        {getFilteredNotes().length > 0 ? (
                            <GridListView notes={getFilteredNotes()} itemBuilder={itemBuilder} />
                        ) : (<p>No results found</p>)}
                    </div>
                ) : (
                    <div>
                        <h1>Notes</h1>
                        <p>Here are your notes</p>
                        {tabs.map((tab) => {
                            if (tab === selectedTab) {
                                return (
                                    <Chip padding={16} style={{ margin: 16 }} label={tab} variant="filled" />
                                );
                            }
                            return (
                                <Chip padding={16} style={{ margin: 16 }} label={tab} onClick={() => setSelectedTab(tab)} variant="outlined" />
                            );
                        })
                        }

                        <GridListView notes={notes.filter((item) => {
                            if (selectedTab === "All") {
                                return true;
                            }
                            if (selectedTab === "Active") {
                                return !item.archived;
                            }
                            if (selectedTab === "Archived") {
                                return item.archived;
                            }
                        })}
                            itemBuilder={itemBuilder}
                        />

                    </div>

                )}

            </div>

        </div>
    );
}
