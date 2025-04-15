import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useCreateTaskMutation, useGetAuthUserQuery } from "@/state/api";

interface NewTaskModalProps {
    open: boolean;
    onClose: () => void;
    projectId?: number;
    id?: number;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({
    open,
    onClose,
    projectId,
    id,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");
    const [priority, setPriority] = useState("LOW");
    const [points, setPoints] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const { data: currentUser } = useGetAuthUserQuery();
    const [createTask] = useCreateTaskMutation();

    const handleSubmit = async () => {
        if (!title || !currentUser?.userId || !(id !== null || projectId)) return;

        await createTask({
            title,
            description,
            status,
            priority,
            points,
            projectId: projectId || id,
            authorUserId: currentUser.userId,
            startDate: startDate || undefined,
            dueDate: dueDate || undefined,
            tags,
        });

        handleClose();
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setStatus("TODO");
        setPriority("LOW");
        setPoints(1);
        setStartDate("");
        setDueDate("");
        setTags([]);
        onClose();
    };

    const isSubmitDisabled = () => {
        return !title || !currentUser?.userId || !(id !== null || projectId);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="TODO">To Do</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="DONE">Done</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={priority}
                        label="Priority"
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <MenuItem value="LOW">Low</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="HIGH">High</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Points"
                    type="number"
                    fullWidth
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                />
                <TextField
                    margin="dense"
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Due Date"
                    type="date"
                    fullWidth
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Tags (comma separated)"
                    fullWidth
                    value={tags.join(", ")}
                    onChange={(e) =>
                        setTags(
                            e.target.value.split(",").map((tag) => tag.trim())
                        )
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled()}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewTaskModal;