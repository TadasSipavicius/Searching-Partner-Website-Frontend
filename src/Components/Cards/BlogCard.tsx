import { CardActionArea, CardContent, CardMedia, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import Card from '@mui/material/Card';
import TennisImage from '../../Assets/Images/tennis_racket.jpg';

const useStyles = makeStyles( (theme: Theme) => 
    createStyles({
        card: {
            maxWidth: 300,
            minHeight: 280
        },
        description: {
            fontSize: 14
        }
    }))


export default function BlogCard(item){

    const classes = useStyles();
    const history = useHistory();

    const handleClick = () =>{
        history.push(`/blog/${item.item.id}`)
    }

    return(
        <Card sx={{ maxHeight: 405 }} className={classes.card}>
            <CardActionArea onClick={handleClick}>
            <CardMedia
                component="img"
                height="140"
                image={TennisImage}
                alt="Tennis image"
            />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.item.blog_title}
                    </Typography>
                    <Typography className={classes.description}>
                        {item.item.blog_text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}