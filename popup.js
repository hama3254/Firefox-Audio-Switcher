
document.getElementById('btn_settings').addEventListener('click', () => {
    browser.tabs.create({
        url: browser.extension.getURL('settings.html')
    });
});

function InjectJS() {
    var radio_btn = document.getElementsByClassName("option-input radio");
    //alert(radio_btn[0].value)

    for (i = 0; i < radio_btn.length; i++) {
        if (radio_btn[i].checked) {
            //alert(radio_btn[i].value);
            var selectedDevice = radio_btn[i].value;
            browser.tabs.executeScript({
                code: "navigator.mediaDevices.enumerateDevices().then(function(devices){const audioDevices=devices.filter(device=>device.kind==='audiooutput');const audioDevicesUse=devices.filter(device=>device.label==='" + selectedDevice + "');var video=document.querySelector('video');var p2=new Promise(function(resolve,reject){video.setSinkId(audioDevicesUse[0].deviceId)});p2.then(console.log('the end'))}).catch(function(err){console.log(err.name+': '+err.message)});"
           //multi line code at the end as comment

 });
           
        }
    }
window.close()
}

navigator.mediaDevices.getUserMedia({
    audio: true
})
.then(function (stream) {
    console.log('You let me use your mic!')
    document.getElementById("btn_settings").hidden = true;
    var h2 = document.createElement('h2');
    h2.id = 'bulgy-radios-label';
    h2.innerHTML = 'Select a device';
    document.getElementById('frame2').appendChild(h2);

    navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
        const audioDevices = devices.filter(device => device.kind === 'audiooutput');
        console.log(audioDevices);
        var container = document.getElementById('frame2');

        var i;
        for (i = 0; i < audioDevices.length; i++) {

            var radiobox = document.createElement('input');
            radiobox.type = 'radio';
            radiobox.id = 'Audio' + i;
            radiobox.value = audioDevices[i].label;

            radiobox.className = 'option-input radio';
            radiobox.onclick = InjectJS;
            var label = document.createElement('label')
                label.htmlFor = 'Audio' + i;
            var description = document.createTextNode(audioDevices[i].label);
            label.appendChild(description);

            var vbNewLine = document.createElement('br')

                container.appendChild(radiobox);
            container.appendChild(label);
            container.appendChild(vbNewLine);
        }

    })
    .catch(function (err) {
        console.log(err.name + ': ' + err.message);
    });
})
.catch(function (err) {
    console.log('No mic for you!')
    document.getElementById("btn_settings").hidden = false;
    var h2 = document.createElement('h2');
    h2.id = 'bulgy-radios-label';
    h2.innerHTML = 'Please open the settings';

    document.getElementById('frame2').appendChild(h2);
});


/*

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
 	const audioDevices = devices.filter(device => device.kind === 'audiooutput');
	const audioDevicesUse = devices.filter(device => device.label=== '" + selectedDevice + "');
	var video = document.querySelector('video');
	var p2 = new Promise(
    // Resolver-Funktion kann den Promise sowohl auflösen als auch verwerfen
    // reject the promise
    function(resolve, reject) {       
      video.setSinkId(audioDevicesUse[0].deviceId)
    });

  p2.then(
	console.log('the end')
  
   );
})
.catch(function(err) {
  console.log(err.name + ': ' + err.message);
}); 

*/