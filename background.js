// background.js

// Listen for the browser action being clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    // Execute contentScript.js on the active tab when the browser action is clicked
    chrome.tabs.executeScript(tab.id, {file: 'contentScript.js'});
});