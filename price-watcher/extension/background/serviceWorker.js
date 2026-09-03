chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_WATCHLIST") {
    chrome.storage.local.get("watchlist").then((result) => {
      sendResponse(result.watchlist ?? []);
    });
  }

  return true;
});

chrome.sidePanel.setPanelBehavior({
  openPanelOnActionClick: true
});