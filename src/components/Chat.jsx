import React, {useContext, useState} from 'react';
import {Context} from "../main.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import { collection, orderBy, query, addDoc, serverTimestamp } from "firebase/firestore";
import Loader from "./Loader.jsx";
import {useCollectionData} from "react-firebase-hooks/firestore";

const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('')

    const messagesRef = collection(firestore, 'messages')
    const messagesQuery = query(messagesRef, orderBy('createdAt'))

    const [messages, loading] = useCollectionData(messagesQuery)

    const sendMessage = async () => {
        await addDoc(messagesRef,{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: serverTimestamp()
        })
        setValue('')
    }

    if(loading) {
        return <Loader/>
    }

    return (
        <Container>
            <Grid container justifyContent={"center"} style={{height: window.innerHeight - 50, marginTop:20}} >
                <div style={{width: '80%', height:'60vh', border: '1px solid gray', overflowY: 'auto'}}>
                    {messages.map(message =>
                        <div style={{margin:10,
                                    border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                                    marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                    width: 'fit-content',
                                    padding: 5
                        }}>
                            <Grid container>
                                <Avatar src={message.photoURL} />
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                <Grid
                    container
                    direction={'column'}
                    alignItems={'flex-end'}
                    style={{width:'80%'}}
                >
                    <TextField
                        fullWidth maxRows={2}
                               variant={'outlined'}
                               value={value}
                               onChange={(e) => setValue(e.target.value)} />
                    <Button onClick={sendMessage} style={{marginTop:20}} variant={'outlined'}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;