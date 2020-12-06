var index;

function ChangeSinkReceiver(request, sender, sendResponse) {
    initializeWhenReady(document);
    index = request.replacement
	console.log(index);
}
browser.runtime.onMessage.addListener(ChangeSinkReceiver);

function initializeWhenReady(document) {
    console.log("Begin initialize WhenReady");

    window.addEventListener('load', () => {
        initializeNow(window.document);
    });
    if (document) {
        if (document.readyState === "complete") {
            initializeNow(document);
        } else {
            document.onreadystatechange = () => {
                if (document.readyState === "complete") {
                    initializeNow(document);
                }
            };
        }
    }
    console.log("End initialize WhenReady");
}

function initializeNow(document) {

    console.log(document.querySelector('video'));
    navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
        const audioDevices = devices.filter(device => device.kind === 'audiooutput');
        var video = document.querySelector('video');
        var p2 = new Promise(
                // Resolver-Funktion kann den Promise sowohl auflösen als auch verwerfen
                // reject the promise
                function (resolve, reject) {
            video.setSinkId(audioDevices[index].deviceId)
        });

        p2.then(
            console.log('the end'));
    })
    .catch(function (err) {
        console.log(err.name + ': ' + err.message);
    });

    var frameTags = document.getElementsByTagName("iframe");
    Array.prototype.forEach.call(frameTags, function (frame) {
        // Ignore frames we don't have permission to access (different origin).
        try {
            var childDocument = frame.contentDocument;
        } catch (e) {
            return;
        }
        initializeWhenReady(childDocument);
    });
    console.log("End initialize Now");
}
