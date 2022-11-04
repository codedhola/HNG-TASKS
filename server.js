// HNG: SECOND TASK
const http = require("http")
const PORT =  process.env.PORT || 8080

function handleCalc(operation, intX, intY){
    let solve;
    if(operation === "addition"){
        solve = Number(intX) + Number(intY)
    }
    if(operation === "subtraction"){
        solve = Number(intX) - Number(intY)
    }
    if(operation === "multiplication"){
        solve = Number(intX) * Number(intY)
    }
    return solve
}


function inputData(req, res){
    let data = "";
    let result, operator;
    req.on("data", (chunk) => {
        data += chunk.toString()
        const objData = JSON.parse(data);
        const { operation_type: operationType, x: intX, y: intY } = objData;
        operator = operationType;
        result = handleCalc(operationType, intX, intY)
    })
    req.on("end", () => {
    data = JSON.parse(data)
    res.writeHead(200, { "statusMessage": "success", 'Content-Type': 'application/json'})
    
    res.end(JSON.stringify({
        slackUsername: "coded hola", 
        result: Number(result),
        operation_type: operator
    }))
    })
}


const server = http.createServer((request, response) => {
    if(request.method === "POST" && request.url == "/"){
        inputData(request, response)
    }else{
        response.writeHead(404, { "statusMessage": "Not Found", 'Content-Type': 'application/json'});
        response.end(JSON.stringify({
            status: "error",
            messge: "Illegal route... please navigate to 'GET' '/' for homepage"
        }))
    }
});
server.listen(PORT, () => console.log(`Server Running successfully on port ${PORT}`))
