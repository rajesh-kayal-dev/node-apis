import React, {useEffect, useMemo, useState} from 'react';
import {io} from 'socket.io-client'
import {Button, Container, Stack, TextField, Typography} from "@mui/material";

const App = () => {
   // const socket = io(import.meta.env.VITE_SERVER);

    const socket = useMemo(()=> io(import.meta.env.VITE_SERVER),[])

    const [message, setMessage] = useState("")
    const [room, setRoom] = useState("")
    const [socketId, setSocketId] = useState()
    const [messages, setMessages] = useState([])
    console.log(messages)

    const handelSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", {message, room})
        setMessage("")
    }

    useEffect(()=>{
        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("connected  ",  socket.id);
        })

        socket.on("receive-message", (data) => {
            console.log(data);
            setMessages((messages)=> [...messages, data]);
        })

        return () => {
            socket.disconnect();
        }

    },[])
    return (
        <Container maxWidth="xs">
            <Typography variant="h6" component="div" gutterBottom>
                Welcome to Chat - {socketId}
            </Typography>


            <form onSubmit={handelSubmit}>
                <TextField value={message}
                          onChange={(e)=> setMessage(e.target.value)}
                           id="outlined-basic"
                           label={"Outlined"}
                           variant="outlined" />
                <TextField value={room}
                          onChange={(e)=> setRoom(e.target.value)}
                           id="outlined-basic"
                           label={"Room"}
                           variant="outlined" />

                <Button type={"submit"} variant="contained" color="primary" >Send</Button>

            </form>

            <Stack>
                {
                    messages.map((message, idx) => (
                        <Typography key={idx} variant={"h6"} component="div" gutterBottom>
                            {message}
                        </Typography>
                    ))
                }
            </Stack>
        </Container>
    );
};

export default App;