async function sayHello() {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});  
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
            let body = document.querySelector("body"); 
            body.style.backgroundColor = "red";
            alert('Hello, World!');
        }
    });  
}
document.getElementById("myButton").addEventListener("click", sayHello);