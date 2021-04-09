let fs=require("fs");
let arr=["../../f1.txt","../../f2.txt","../../f3.txt"];

let frP=fs.promises.readFile(arr[0]);

for(let i=1;i<arr.length;i++){
    frP=frP.then(function(data){
        console.log("Data"+data);
        return fs.promises.readFile(arr[i]);
    })
}

frP.then(function(data){
    console.log("Data"+data);
})