chrome.runtime.onInstalled.addListener(function(message) {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("Extension Initialized");
    });
  });

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  var url = tab.url;
  if (!url.match(/.*mangadex.org\/chapter.*1$/s) || changeinfo.status != "complete") return;
  
  
  var id = url.match(/(?<=.*mangadex.org\/chapter\/)([0-9]*)(?=\/*.*)/s);
  if (!id) {
    console.log("Error somewhere");
    return;
  }
  id = id[0];
  console.log(id);

  fetch('https://mangadex.org/api/v2/chapter/'+id)
    .then( (response) => {
      if (response.status !== 200) {
        console.log("Error")
        return;
      }
      response.json().then(
        (data) => {
          var chapterinfo = {
            "mangatitle": data["data"]["mangaTitle"],
            "chapter": data["data"]["chapter"],
            "id": id
          }
          chrome.storage.local.set({[data["data"]["mangaId"]]: chapterinfo}, () => {
            console.log(data);
          })
        }

      )
    })
});