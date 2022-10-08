// popup.js
// https://developer.chrome.com/docs/extensions/mv3/messaging/

document.addEventListener('DOMContentLoaded', function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0].url;
        // if we're on YouTube, then set the status of the checkboxes correctly
        if (activeTab.indexOf("://www.google.com/") > -1 ){
            
            chrome.tabs.sendMessage(tabs[0].id, {method: "checkAds"}, function(response) {
                
                var adsCheckbox = document.getElementById('adsToggle');
                var adsCheckboxLabel = document.getElementById('adsToggleLabel');
                
                if(response.method === "checkAds"){
                    if(response.text === "no ads"){
                        adsCheckboxLabel.innerHTML = "No ads in results";
                        document.getElementById("adsToggle").disabled = true;
                    } else if (response.text === "visible") {
                        document.getElementById("adsToggle").disabled = false;
                        adsCheckbox.checked = true;
                    } else {
                        document.getElementById("adsToggle").disabled = false;
                        adsCheckbox.checked = false;
                    } 
                }
            });
        }
    });
    
    // assign functions to the checkboxes
    var adsCheckbox = document.getElementById('adsToggle');
    
    // make it hide/show on mac
    adsCheckbox.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "changeAds"}, function(response) {
                
                if(response.method == "changeAds"){
                    if(response.text === "ads visible"){
                        console.log("Ads are visible")
                    } else {
                        console.log("Ads are hidden")
                    }
                }
            });
          });
        }, false);
}, false);
