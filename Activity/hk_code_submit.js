let puppeteer=require("puppeteer");
let {codes}=require("./codes");

let gTab;
console.log("Before");
let browerWillBeOpened=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
});
browerWillBeOpened.then(function(browerInstance){
    let newTabPromise=browerInstance.newPage();
    return newTabPromise;
}).then(function(newTab){
    let newPagePromise=newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    gTab=newTab;
    return newPagePromise;
}).then(function(){
    let email=gTab.type("#input-1","bilotoc369@aramidth.com",{delay:200});
    return email;
}).then(function(){
    let password=gTab.type("#input-2","vipulG@",{delay:200});
    return password;
}).then(function(){
    let clickPromise=gTab.click("button[data-analytics='LoginPassword']");
    return clickPromise;
}).then(function(){
    let IPKitPromise=waitAndClick(".card-content h3[title='Interview Preparation Kit']");
    return IPKitPromise;
}).then(function(){
    let warmUpPromise=waitAndClick("a[data-attr1='warmup']");
    return warmUpPromise;   
}).then(function(){
    let url=gTab.url();
    return url;
}).then(function(url){
    let quesObj=codes[0];
    questionSolver(url,quesObj.qCode,quesObj.qName);
}).catch(function(err){
    console.log(err);
})

function waitAndClick(selector){
    return new Promise(function(resolve,reject){
    let selectorPromise= gTab.waitForSelector(selector,{visible:true});
    selectorPromise.then(function(){
        let clickPromise=gTab.click(selector);
        return clickPromise;
    }).then(function(){
        resolve();
    }).catch(function(err){
        reject(err);
    });
});
}

function questionSolver(moduleUrl,code,qName){
    return new Promise(function(resolve,reject){

        let reachPageUrlPromise=gTab.goto(moduleUrl);

        reachPageUrlPromise.then(function(){
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

            let pageClickPromise=gTab.evaluate(browerconsolerun,qName);
            return pageClickPromise;
        }).then(function(){
            let clickRightPromise=waitAndClick(".custom-checkbox.inline");
            return clickRightPromise;
        }).then(function(){
            let codeTypePromise=gTab.type(".custominput",code);
            return codeTypePromise;
        }).then(function(){
            let controlSelectPromise=gTab.keyboard.down("Control");
            return controlSelectPromise;
        }).then(function(){
            let selectAllPromise=gTab.keyboard.press("A");
            return selectAllPromise;
        }).then(function(){
            let copyPromise=gTab.keyboard.press("X");
            return copyPromise;
        }).then(function(){
            let pointerAtEditorPromise=waitAndClick(".monaco-editor.no-user-select.vs");
            return pointerAtEditorPromise;
        }).then(function(){
            let aselectAllPromise=gTab.keyboard.press("A");
            return aselectAllPromise;
        }).then(function(){
            let removePromise=gTab.keyboard.press("V");
            return removePromise;
        }).then(function(){
            let removeControlPromise=gTab.keyboard.up("Control");
            return removeControlPromise;
        }).then(function(){
            let submitPromise=waitAndClick(".pull-right.btn.btn-primary.hr-monaco-submit");
            return submitPromise;
        }).then(function(){
            resolve();
        })

    })
}

console.log("After");