(function() {
   /**
    * Check and set a global guard variable.
    * If this content script is injected into the same page again,
    * it will do nothing next time.
    */
   if (window.hasRun) {
     return;
   }
   window.hasRun = true;
   
    const googleAdsCssOn = '#tads {display: block;} #tads, #tads .CnP9N.U3A9Ac.irmCpc,.commercial-unit-mobile-top,.commercial-unit-mobile-top .v7hl4d,.commercial-unit-mobile-bottom .v7hl4d {background-color: #F2E6C3 !important;}'
    const googleAdsCssOff = '#tads {display: none;}'
   
   // generate the style elements
   var elementsThatCanBeHidden = [ "googleAds" ];
    
    // function to create style element with the specified CSS content
    function createStyleElement(some_style_id, some_css){
        if(!document.getElementById(some_style_id)){
            var styleElement = document.createElement("style");
            styleElement.id = some_style_id;
            document.head.appendChild(styleElement).innerHTML = some_css;
        } else {
            document.getElementById(some_style_id).innerHTML = some_css;
        };
    };
    
    elementsThatCanBeHidden.forEach(function (item) {
        console.log("create the styles " + item);
        var styleName = item + "Style";
        var key = item + "Status";
        
        browser.storage.sync.get(key, function(result) {
            if (result[key] == true){
                createStyleElement(styleName, eval(item + "CssOn"));
            } else {
                createStyleElement(styleName, eval(item + "CssOff"));
            };
        });
    });
    
    // let the popup ask for the current status of the elements and of the saved state
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        function checkStyleStatus(currentStyle, some_css_for_shown){
            if (currentStyle == undefined){
                sendResponse({text: "not on active tab"});
            } else if (currentStyle.innerHTML === some_css_for_shown) {
                sendResponse({text: "visible"});
            } else {
                sendResponse({text: "hidden"});
            };
        };
    
        if(request.method === "check"){
            var currentStyle = document.getElementById(request.element + "Style");
    
            checkStyleStatus(currentStyle, eval(request.element + 'CssOn'));
        };
    });
    
    // let the content script toggle elements when the popup asks for it
    function toggleHiding(some_style_id, css_shown, css_hidden, status){
        var styleElement = document.getElementById(some_style_id);
    
        if(status == true){
            styleElement.innerHTML = css_shown;
        } else {
            styleElement.innerHTML = css_hidden;
        };
    };
    
    browser.runtime.onMessage.addListener((message) => {
        // toggle hiding when popup asks
        if(message.method === "change"){
            toggleHiding(message.element + 'Style', eval(message.element + 'CssOn'), eval(message.element + 'CssOff'),  message.status);
        };
    });
})();
