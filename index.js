const express = require("express");
const { ExpressPeerServer } = require("peer");
const app = express();

// const httpServer = require("http").createServer(app);
const cors = require("cors");

const PORT = 9000;

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
});

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
// PEER SERVER
app.enable("trust proxy");
const peerServer = ExpressPeerServer(server, {
    path: "/",
    debug: true,
    proxied: true,
});

app.use("/peerjs", peerServer);

peerServer.on("connection", (client) => {
    console.log("Peer Conected");
    // console.log(client);
});

//API ROUTES
app.get("/", (req, res) => {
    res.status(200).send("peerjs");
});

// httpServer.listen(PORT, () => {
//     console.log("Backend server is running! port:  " + PORT);
// });
