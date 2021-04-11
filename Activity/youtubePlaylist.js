let puppeteer = require("puppeteer");
let fs = require("fs");
// no of videos done
// views done
// watch time -> get 
// list of videos -> in an excel
// initial page data get 
// handle -> loader

console.log("Before");
// let arr=document.querySelectorAll("#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer")
// let newarr=[]
// newarr.push(arr[0].innerText,arr[1].innerText)
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let newPage = await browserInstance.newPage();
        await newPage.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");

        let arr=await newPage.evaluate(consoleRunFn,"#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer");
        console.log("No. of videos"+ arr[0]);
        console.log("Views"+ arr[1]);
        let videoCount=arr[0].split(" ")[0];
        videoCount=Number(videoCount);
        let pCurrentVideoCount=await scrolltoBottom(newPage,"#video-title");
        while(videoCount-50>pCurrentVideoCount){
            pCurrentVideoCount=await scrolltoBottom(newPage,"#video-title");
        }

        let timenDurArr=await newPage.evaluate(getStats,"span.style-scope.ytd-thumbnail-overlay-time-status-renderer","#video-title");
        console.log(timenDurArr);
    } catch (err) {
        console.log(err);
    }

})();

function consoleRunFn(selector){
    let arr=document.querySelectorAll(selector)
    let newarr=[]
    newarr.push(arr[0].innerText,arr[1].innerText);
    return newarr;


}

async function scrolltoBottom(page,title){
    function getLengthConsoleFn(title){
        window.scrollBy(0,window.innerHeight);
        let titleElemArr=document.querySelectorAll(title);
        return titleElemArr.length;

    }
    return page.evaluate(getLengthConsoleFn, title);
}

function getStats(durationSelect,title){
    let dElemarr=document.querySelectorAll(durationSelect);
    let titleElemArr=document.querySelectorAll(title);

    let nameNdurArr=[];
    for(let i=0;i<dElemarr.length;i++){
        let duration=dElemarr[i].innerText;
        let title=titleElemArr[i].innerText;
        nameNdurArr.push({duration,title});
    }
    return nameNdurArr;
}
