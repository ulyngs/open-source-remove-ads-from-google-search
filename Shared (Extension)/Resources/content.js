// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // recommended videos, home page //
        // on desktop
        ads = document.querySelector('#tads');
        adsMobile = document.querySelector('div[tab-identifier="FEwhat_to_watch"]');
        
        // check for visibility
        if(request.method == "checkAds"){
            if (ads == null && adsMobile == null){
                sendResponse({text: "no ads", method: "checkAds"});
            } else if (adsMobile == null){
                if (ads.style.display === "none") {
                    sendResponse({text: "hidden", method: "checkAds"});
                } else if (ads.style.display === "block") {
                    sendResponse({text: "visible", method: "checkAds"});
                } else {
                    sendResponse({text: "hidden", method: "checkAds"});
                }
            } else {
                if (adsMobile.style.display === "none") {
                    sendResponse({text: "hidden", method: "checkAds"});
                } else if (adsMobile.style.display === "block") {
                    sendResponse({text: "visible", method: "checkAds"});
                } else {
                    sendResponse({text: "hidden", method: "checkAds"});
                }
            }
        }
        
        // change visibility
        if(request.method == "changeAds"){
            if (adsMobile == null){
                if (ads.style.display === "none") {
                    ads.style.display = "block";
                    sendResponse({text: "ads visible", method: "changeAds"});
                } else if (ads.style.display === "block") {
                    ads.style.display = "none";
                    sendResponse({text: "ads hidden", method: "changeAds"});
                } else {
                    ads.style.display = "block";
                    sendResponse({text: "ads visible", method: "changeAds"});
                }
            } else {
                if (adsMobile.style.display === "none") {
                    adsMobile.style.display = "block";
                    sendResponse({text: "ads visible", method: "changeAds"});
                } else if (adsMobile.style.display === "block") {
                    adsMobile.style.display = "none";
                    sendResponse({text: "ads hidden", method: "changeAds"});
                } else {
                    adsMobile.style.display = "block";
                    sendResponse({text: "ads visible", method: "changeAds"});
                }
            }
        }
        
    }
);


