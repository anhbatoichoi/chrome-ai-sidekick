// Chrome extension background service worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('Neon AI Agent Chat extension installed');
});

// Enable side panel for all tabs
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error('Side panel error:', error));

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});