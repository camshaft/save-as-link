/**
 * Module dependencies
 */
var filesaver = require("filesaver");

module.exports = exports = function (blob, name) {
  var self = this
    , link = createLink();

  link.href = getObjectUrl(blob, self);
  link.download = name;
  if(click(link)) {
    self.emitAll();
  }
  else {
    self.emit("error", new Error("Unable to use the download link engine"));
  }
}

exports.ENABLED = "download" in createLink();

/**
 * Register the engine if we have support
 */
if(exports.ENABLED) {
  filesaver.engine(exports);
}

function click (link) {
  if(window.document.createEvent) {
    var evObj = window.document.createEvent("MouseEvents");
    evObj.initEvent("click", true, false);
    return link.dispatchEvent(evObj);
  }
  else if(window.document.createEventObject) {
    var evObj = window.document.createEventObject();
    return link.fireEvent('onclick', evObj);
  }
  return false;
}

function createLink () {
  return window.document.createElementNS("http://www.w3.org/1999/xhtml", "a");
}

function getObjectUrl (blob, parent) {
  var objectUrl = getUrl().createObjectURL(blob);
  parent.deletionQueue.push(objectUrl);
  return objectUrl;
}

function getUrl () {
  return window.URL || window.webkitURL || window;
}
