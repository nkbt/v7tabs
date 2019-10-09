chrome.runtime.onInstalled.addListener(function(d) {
	let s = {'mmc': false, 'dbc': false, 'ws': false, 'toti': false, 'wheel': false, 'sessions': false, 'zoom': 100, 'single': true, 't': 'tl.css', 'scope': 'per-origin' }

	if (d.reason === 'install')
		chrome.storage.local.set({ 'savedSettings': s }, function() {
//			chrome.tabs.create({ url: 'options.html' });
		});

	if (d.reason === 'update') {
		chrome.storage.local.get('savedSettings', function(r) {
			let ts = r.savedSettings;
			if (ts.t == undefined) ts.t = 'tl.css';
			if (ts.scope == undefined) ts.scope = 'per-origin';
			ts.zoom = ~~ts.zoom;

			chrome.storage.local.set({ 'savedSettings': ts }, function() {
//				chrome.tabs.create({ url: 'options.html#update' });
			});

			chrome.runtime.sendMessage({ 't': 'x' });
		});
	}
});
