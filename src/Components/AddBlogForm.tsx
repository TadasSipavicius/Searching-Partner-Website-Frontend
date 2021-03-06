import { Container, Dialog, DialogActions, DialogTitle, InputLabel, TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router';
import React, { useState } from 'react';
import Axios from 'axios';

export default function AddBlogForm(){

    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL!;
    const { user } = useAuth0();
    const history = useHistory();

    const handleTitleOnChange = (e) =>{
        setBlogTitle(e.target.value);
    }
    const handleTextOnChange = (e) =>{
        setBlogText(e.target.value);
    }

    const handleOnCloseDialog = () =>{
        setIsOpen(false);
    }

    const redirectToBlogPage = () =>{
        history.push('/blog');
    }

    const onSubmitClick = async () =>{
        await Axios.post(`${API_URL}/blog/insert`, {
            blogTitle: blogTitle,
            blogText: blogText,
            user_id: user?.sub
        })
        setIsOpen(true);
    }
    return(
        <Container>
            <form>
                <InputLabel>Blog title:</InputLabel>
                <TextField 
                label="Title" 
                variant="outlined"
                error={blogTitle === ""}
                helperText={blogTitle === "" ? 'Empty!' : ''} 
                required 
                fullWidth 
                onChange={handleTitleOnChange}
                />
                <InputLabel>Blog Text:</InputLabel>
                <TextField 
                label="Blog whole text"
                variant="outlined"
                error={blogText === ""}
                helperText={blogText === "" ? 'Empty!' : ''} 
                multiline
                rows={20}
                required
                fullWidth
                onChange={handleTextOnChange}
                />

                {(blogTitle && blogText) === "" ? (
                    <Button variant="outlined" disabled>Submit Form</Button>
                ) : (
                    <Button variant="outlined" onClick={onSubmitClick}>
                        Submit Form
                    </Button>
                )}

                <Dialog 
                    open={isOpen}
                    onClose={handleOnCloseDialog}
                >
                    <DialogTitle>
                        Insert is Completed. Get back to Blog page?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={redirectToBlogPage}>Yes</Button>
                        <Button onClick={handleOnCloseDialog}>No</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </Container>
    )
}