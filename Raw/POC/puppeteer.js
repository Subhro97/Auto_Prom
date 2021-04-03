let puppeteer=require("puppeteer");
let browerWillBeLaunchedPromise=puppeteer.launch({
    headless:false
})

browerWillBeLaunchedPromise.then(function(browserInstance){
    let newPagePromise=browserInstance.newPage();
    newPagePromise.then(function(newPage){
        console.log("new tab opened");

        let pageWillBeOpenedPromise=newPage.goto("https://www.pepcoding.com");
        pageWillBeOpenedPromise.then(function(){
            console.log("page is opened");
        })
    })

})

browerWillBeLaunchedPromise
    .then(function (browserInstance) {
        // new tab
        let newPagePromise = browserInstance.newPage();
        return newPagePromise
    }).then(function (newPage) {
        console.log("new tab opened");
        // go to pepcoding
        let pageWillBeopenedPromise = newPage.goto("https://www.pepcoding.com");
        return pageWillBeopenedPromise;
    }).then(function () {
        console.log("page is opened");
    }).catch(function (err) {
        console.log(err);
    })