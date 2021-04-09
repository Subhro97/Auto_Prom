let fs=require("fs").promises;

 let frp = fs.readFile("../../f1.txt");
// frp.then(cb);
// function cb(data) {
//     console.log("content->" + data);
//     let f2rP = fs.readFile("../../f2.txt");
//     f2rP.then(cb2);
// }
// function cb2(data) {
//     console.log("content->" + data);
//     let f3rP = fs.readFile("../../f3.txt");
//     f3rP.then(cb3);
// }
// function cb3(data) {
//     console.log("content->" + data);
//}

//alternative-> then chaining becoz in above each then requires error handling

frp.then(cb).then(cb2).then(cb3).catch(function (err) {
    console.log("Inside catch");
 });
function cb(data) {
    console.log("content->" + data);
    return fs.readFile("../../f2.txt");
}
function cb2(data) {
    console.log("content->" + data);
    return fs.readFile("../../f3.txt");
}
function cb3(data) {
    console.log("content->" + data);
}

