
var lastDownloadId;

browser.commands.onCommand.addListener(command => processCommand(command));
browser.browserAction.onClicked.addListener(tab => processAction(tab));

browser.downloads.onChanged.addListener(downloadDelta => {
  lastDownloadId = downloadDelta.id;
});

// ----------------------------------------------------

// Not implemented in Firefox yet
function processCommand(commandId) {
  switch(commandId) {
    case 'open-last-download':
      openLastDownload();
      break;
  }
}

function processAction(tab) {
  openLastDownload();
}

function openLastDownload() {
  console.log('openLastDownload()');
  
  browser.downloads.open(lastDownloadId)
    .then(() => {
      console.log('File opened, id:', lastDownloadId);
    })
    .catch(error => {
      console.error('openLastDownload error:', error);
    });
}
