// HNG: SECOND TASK
const http = require("http")
const PORT =  process.env.PORT || 8080

function handleCalc(operation, intX, intY){
    let solve;
    
    if(operation.match(/(addition|add|plus|\+)/i)){
        solve = Number(intX) + Number(intY)
    }
    if(operation.match(/(subtraction|subtract|minus|\-)/i)){
        solve = Number(intX) - Number(intY)
    }
    if(operation.match(/(multiplication|multiply|times|product|\*)/i)){
        solve = Number(intX) * Number(intY)
    }
    return solve
}

function getOperator(operation){
    let operator;
    if(operation.match(/(addition|add|plus|\+)/i)){
        operator = "addition"
    }
    if(operation.match(/(subtraction|subtract|minus|\+)/i)){
        operator = "subtraction"
    }
    if(operation.match(/(multiplication|multiply|times|product|\*)/i)){
        operator = "multiplication"
    }
    return operator;
}

function handleValidation(val, res){
    if(val.operation_type === undefined || val.operation_type === ""){
        return res.writeHead(400, { "statusMessage": "failed", 'Content-Type': 'application/json'})
    
        .end(JSON.stringify({
            error: "Operating_type requred"
        }))
    }

    if(val.x === undefined || val.x === "" || typeof(val.x) != "number"){
        return res.writeHead(400, { "statusMessage": "failed", 'Content-Type': 'application/json'})
    
        .end(JSON.stringify({
            error: "x integer is requre d and must be a valid int type"
        }))
    }

    if(val.y === undefined || val.y === "" || typeof(val.y) !== "number"){
        return res.writeHead(400, { "statusMessage": "failed", 'Content-Type': 'application/json'})
    
        .end(JSON.stringify({
            error: "y integer is requred and must be a valid int type"
        }))
    }
}

function inputData(req, res){
    let data = "";
    let result, operator;
    try {

        req.on("data", (chunk) => {
            data += chunk.toString()
            const objData = JSON.parse(data);
            handleValidation(objData, res)
            const { operation_type: operationType, x: intX, y: intY } = objData;
            result = handleCalc(operationType, intX, intY)
            operator = getOperator(operationType);
            console.log(operator)
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
    }catch(err){
        console.log(err)
        
    }
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
