document.addEventListener('DOMContentLoaded', function() {
    if (checkStatus()) {
        document.getElementById("status").style.color = "green";
        document.getElementById("status").innerHTML = 'OK';
        document.getElementById('actions').style.display = 'inbox';

        document.getElementById("btnDlMusic").addEventListener("click", addMusicToList, false);
        document.getElementById("btnDlVideo").addEventListener("click", addVideoToList, false);
        checkVideoURL();
    }
    else {
        document.getElementById("status").style.color = "red";
        document.getElementById("status").innerHTML = 'KO';
        document.getElementById('actions').style.display = 'none';
    }
});

function checkStatus() {    
    var xmlHttp = new XMLHttpRequest();
    try {
        xmlHttp.open( "GET", 'http://yt-dl.furnocte.fr/api/status', false );
        xmlHttp.send(null);
        if (xmlHttp.status == 200)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

function checkVideoURL() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        if (url.match('^https://www.youtube.com/watch') === null)
            activeButtons(false);
        else
            activeButtons(true);
    });
}

function activeButtons(state) {
    if (state)
        document.getElementById('actions').style.display = 'inbox';
    else
        document.getElementById('actions').style.display = 'none';
}

function addMusicToList() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        var id = url.match(/v=([A-z]|[0-9])*/)[0].slice(2);
        var xmlHttp = new XMLHttpRequest();
        try {
            xmlHttp.open( "GET", 'http://yt-dl.furnocte.fr/api/musics/' + id, false );
            xmlHttp.send(null);
            if (xmlHttp.status == 200) {
                var url = xmlHttp.responseText.slice(1, -1);
                var link = document.createElement('a');
                link.href = 'http://yt-dl.furnocte.fr' + url;
                link.setAttribute('target','_blank');

                if (link.download !== undefined) {
                    //Set HTML5 download attribute. This will prevent file from opening if supported.
                    var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
                    link.download = fileName;
                }

                //Dispatching click event.
                if (document.createEvent) {
                    var e = document.createEvent('MouseEvents');
                    e.initEvent('click', true, true);
                    link.dispatchEvent(e);
                    return true;
                }
            } else
                alert('error while retriving');
        } catch (error) {
            alert(error);
        }
    });
}

function addVideoToList() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        var id = url.match(/v=([A-z]|[0-9])*/)[0].slice(2);
        var xmlHttp = new XMLHttpRequest();
        try {
            xmlHttp.open( "GET", 'http://yt-dl.furnocte.fr/api/videos/' + id, false );
            xmlHttp.send(null);
            if (xmlHttp.status == 200) {
                var url = xmlHttp.responseText.slice(1, -1);
                var link = document.createElement('a');
                link.href = 'http://yt-dl.furnocte.fr' + url;
                link.setAttribute('target','_blank');

                if (link.download !== undefined) {
                    //Set HTML5 download attribute. This will prevent file from opening if supported.
                    var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
                    link.download = fileName;
                }

                //Dispatching click event.
                if (document.createEvent) {
                    var e = document.createEvent('MouseEvents');
                    e.initEvent('click', true, true);
                    link.dispatchEvent(e);
                    return true;
                }
            } else
                alert('error while retriving');
        } catch (error) {
            alert(error);
        }
    });
}
