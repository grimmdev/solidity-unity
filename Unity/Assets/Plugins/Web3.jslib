mergeInto(LibraryManager.library, {

  InternalWalletAddress: function () {
    if(window && window.account)
    {
      var returnStr = window.account;
      var bufferSize = lengthBytesUTF8(returnStr) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(returnStr, buffer, bufferSize);
      return buffer;
    } else {
      var returnStr = '0x0000000000000000000000000000000000000000';
      var bufferSize = lengthBytesUTF8(returnStr) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(returnStr, buffer, bufferSize);
      return buffer;
    }
  },

  InternalCreatePicture: function(str) {
    CreatePicture(Pointer_stringify(str));
  },

  InternalOpenURL: function (url) {
     window.open(Pointer_stringify(url), "_blank");
   }

});