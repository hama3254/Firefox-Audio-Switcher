
document.getElementById('btn_permission').onclick = async function() {

navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
      })
      .catch(function(err) {
        console.log('No mic for you!')
		
	var h3 = document.createElement('h3');
    h3.id = 'bulgy-radios-label';
    h3.innerHTML = "<br>It looks like you denied the acces to the microphone.<br>That's ok, you can still use the Plugin but i can not display the device names";
    document.getElementById('frame2').appendChild(h3);
	
	var h3_1 = document.createElement('a');
    h3_1.id = 'linkclass';
	h3_1.className = 'linkclass';
    h3_1.innerHTML = '<br>To quote from the developer site:<br>"For security reasons, the label is always an empty string ("")<br> if the user has not obtained permission to use at least one media device,<br> either by starting a stream from the microphone or camera, or by persistent permissions being granted."';
	h3_1.href = "https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/label";
   document.getElementById('frame2').appendChild(h3_1);
     
	var h3_2 = document.createElement('h3');
    h3_2.id = 'bulgy-radios-label';
    h3_2.innerHTML = '<br>You can reverse this action on any time.';
    document.getElementById('frame2').appendChild(h3_2);
	
	var img = document.createElement("img");
	img.src = "/images/FAQ1.png";
	document.getElementById('frame2').appendChild(img);
	
	 });


}