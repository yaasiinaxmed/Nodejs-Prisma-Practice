import server from "./api/server.js";

const port = 4378

server.listen(port, () => console.log(`Server listening port on ${port}`))