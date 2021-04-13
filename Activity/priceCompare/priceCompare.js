let puppeteer = require("puppeteer");
let fs = require("fs");
let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://paytmmall.com/"];
let pName = process.argv[2];

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let details=await getListingFromAmazon(links[0], browserInstance,pName);
        let details2=await getListingFromFlipkart(links[1], browserInstance,pName);
        let details3=await getListingFromPaytmMall(links[2], browserInstance,pName);
        console.table(details);
        console.table(details2);
        console.table(details3);
    } catch (err) {
        console.log(err);
    }
})();

//  product Name,url of amazon home page
// output-> top 5 matching product -> price Name print 
async function getListingFromAmazon(link, browserInstance, pName) {

    let newTab=await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("#twotabsearchtextbox",pName,{delay:100});
    await newTab.click("#nav-search-submit-button");
    await newTab.waitForSelector(".a-price-whole",{visible:true});

    function browerconsolerun(priceSelector,nameSelector){
        let priceArr= document.querySelectorAll(priceSelector);
        let nameArr= document.querySelectorAll(nameSelector);
        let tArr=[];
        for(let i=0;i<5;i++){
            let price=priceArr[i].innerText;
            let name=nameArr[i].innerText;
           tArr.push({name,price});
        }
        return tArr;
    }
        

    return newTab.evaluate(browerconsolerun,".a-price-whole",".a-size-medium.a-color-base.a-text-normal");
    
}

async function getListingFromFlipkart(link, browserInstance, pName) {
    let newTab=await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.click("._2KpZ6l._2doB4z");
    await newTab.waitForSelector("._3704LK",{visible:true});
    await newTab.type("._3704LK",pName,{delay:100});
    await newTab.click(".L0Z3Pu");

    function consoleRunFn(pNameSelector,priceSelector){
        let priceArr=document.querySelectorAll(priceSelector);
        let pNameArr=document.querySelectorAll(pNameSelector);

        let tArr=[];
        for(let i=0;i<5;i++){
            let price=priceArr[i].innerText;
            let name=pNameArr[i].innerText;
            tArr.push({
                name,price
            })

        }
        return tArr;

    }
    await newTab.waitForSelector("._30jeq3._1_WHN1",{visible:true});
    let details=newTab.evaluate(consoleRunFn,"._4rR01T","._30jeq3._1_WHN1");
    return details;
}

async function getListingFromPaytmMall(link,browserInstance,pName){

    let newPage=await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.type("#searchInput",pName,{delay:100});
    await newPage.keyboard.press("Enter");
    await newPage.waitForSelector(".iconRupess",{visible:true});
    await newPage.waitForSelector(".UGUy",{visible:true});

    function consoleRunFn(nameSelector,priceSelector){
        let nameArr=document.querySelectorAll(nameSelector);
        let priceArr=document.querySelectorAll(priceSelector);

        let tArr=[];
        for(let i=1;i<6;i++){
            let name=nameArr[i].innerText;
            let price=priceArr[i].innerText;
            tArr.push({
                name,price
            })
        }

        return tArr;
    }
    let details=await newPage.evaluate(consoleRunFn,".UGUy","._1kMS")
    return details;

}