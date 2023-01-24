const http = require('http');
//файлова сист
const fs = require('fs');
const path = require('path')
const PORT = 80;
const receiveArgs = async (req) => {
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const data = Buffer.concat(buffers).toString();
    return JSON.parse(data);
  };
const server = http.createServer(async(req, res) =>{
    
    console.log('Server request');
    console.log (req.url, req.method);

    
    if (req.method === 'POST') {
       
        const body =  await receiveArgs(req)
   //строка з фронта зчита
   //       req.on('data', function(data) {
   //       body += data.toString()}
   //   )

        res.setHeader ('Content-Type', 'application/json');
        
        res.end(
            // json to string
            JSON.stringify(
                ({
                    '/calc/': () => {
                       // const result =  Function(`'use strict'; return (${body?.data})`)(); 
                       const result = eval(body?.data)
                        console.log(result)
                        return {
                            status: 0, result,}
                    },
                    
                }[req.url])()
            )

        )
        return ;
    }

    // підтяг
    const filePath = path.join(process.cwd(), 'client', req.url === '/' ? '/index.html' : req.url);

    const fileExist = fs.existsSync(filePath);

    res.setHeader ('Content-Type', fileExist ? {'.html': "text/html", '.css':  "text/css", '.js':   "text/javascript"}[path.extname(filePath)] : 'text/html');

    res.end(
        // абс путь до файла, прочитали ы выддали у выдповыдь
        fileExist ? fs.readFileSync(filePath) : 'not found'
    )


    
})

server.listen(PORT);
