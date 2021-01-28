document.addEventListener('DOMContentLoaded', function() {
    var div = document.getElementById('Info');

    chrome.storage.local.get(null, manga => {

        for (key in manga){
            var data = manga[key];
            var line = document.createElement("button");
            line.innerHTML = data["mangatitle"] + ": Chapter " + data["chapter"];
            line.name = data["id"];
            line.addEventListener("click", (event) => {
                chrome.tabs.create({active: true, url: "https://mangadex.org/chapter/" + event.target.name});
            })
            div.appendChild(line);
        }

    })


});