var isStarted = false;

chrome.browserAction.onClicked.addListener(
	function (tab) {
		if(!isStarted) {
			query_init();
		} else {
			query_stop();
		}	
		isStarted = !isStarted;
	}
);

chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete" && isStarted) {
        query_init();
    }
});

function query_init() {
	var params = { 
		active: true, 
		currentWindow: true 
	};
	
	chrome.tabs.query(params, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { command: "helium_init" }, function(res) {});
	});
}

function query_stop() {
	var params = { 
		active: true, 
		currentWindow: true 
	};
	
	chrome.tabs.query(params, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { command: "helium_stop" }, function(res) {});
	});
}