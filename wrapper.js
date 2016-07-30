chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.command === "helium_init") {
			helium.init();
		} else if (request.command === "helium_stop") {
			helium.clear();
			window.document.location.reload();
		}
	}
);