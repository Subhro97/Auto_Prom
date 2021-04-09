let puppeteer=require("puppeteer");
let {codes}=require("./codes");

console.log("Before");
(async function fn(){
    try{
      let browerInstance = await puppeteer.launch({
               headless:false,
               defaultViewport:null,
               args:["--start-maximized"]
         });
    let newTab= await browerInstance.newPage();
    await newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    await newTab.type("#input-1","bilotoc369@aramidth.com",{delay:200});
    await newTab.type("#input-2","vipulG@",{delay:200});
    await newTab.click("button[data-analytics='LoginPassword']");
    await waitAndClick(".card-content h3[title='Interview Preparation Kit']",newTab);
    await waitAndClick("a[data-attr1='warmup']",newTab);
    let url=newTab.url();
    for(let i=0;i<codes.length;i++){
        await questionSolver(url,codes[i].soln,codes[i].qName,newTab);
     }
    console.log("All questions solved");
}
catch(err){
    console.log(err);
}
})();

async function waitAndClick(selector,gTab){
    await  gTab.waitForSelector(selector,{visible:true});
    let clickPromise=gTab.click(selector);
    return clickPromise;
}

async function questionSolver(moduleUrl,code,qName,gTab){

        await gTab.goto(moduleUrl);
            function browerconsolerun(qName){
                let allH4Elem=document.querySelectorAll("h4");
                let tArr=[];
                for(let i=0;i<allH4Elem.length;i++){
                   let myQues= allH4Elem[i].innerText.split("\n")[0];
                   tArr.push(myQues);
                }
                let idx=tArr.indexOf(qName);
                allH4Elem[idx].click();
            }

            await gTab.evaluate(browerconsolerun,qName);
            await waitAndClick(".custom-checkbox.inline",gTab);
            await gTab.type(".custominput",code);
            await gTab.keyboard.down("Control");
            await gTab.keyboard.press("A");
            await gTab.keyboard.press("X");
            await waitAndClick(".monaco-editor.no-user-select.vs",gTab);
            await gTab.keyboard.press("A");
            await gTab.keyboard.press("V");
            await gTab.keyboard.up("Control");
            await waitAndClick(".pull-right.btn.btn-primary.hr-monaco-submit",gTab);
}

console.log("After");