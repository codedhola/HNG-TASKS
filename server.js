// HNG INTERNSHIP FIRST TASK

const http = require("http");
const PORT =  process.env.PORT || 80;

const server = http.createServer((request, response) => {
    if(request.method === "GET" && request.url == "/"){
        const hola = {
            "slackUsername": "coded hola",
            "backend": true,
            "age": 22,
            "bio": "Building from scratch"
        };
        response.writeHead(200, { "statusMessage": "success", 'Content-Type': 'application/json'});
        response.end(JSON.stringify(hola));
    }else{
        response.writeHead(404, { "statusMessage": "failed", 'Content-Type': 'text/plain'});
        response.end("Illegal route... please navigate to 'GET' '/' for homepage");
    }
});
server.listen(PORT, () => console.log(`Server Running successfully on port ${PORT}`));
