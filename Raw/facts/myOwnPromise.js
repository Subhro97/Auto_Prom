let fs=require("fs");

function promisifier(filepath){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,function cb(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

let frPromise=promisifier("f1.txt");
console.log(frPromise);
frPromise.then(function(data){
    console.log("data_>"+data);
})
frPromise.catch(function(err){
    console.log(err);
})