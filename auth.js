
var clientId = '386616218755-73dafidnv7j1qsl98op44jjsek5j6ak5.apps.googleusercontent.com';
var apiKey = 'AIzaSyACeDe4dmi_tTtZW6HVXDwj4yMidI5zOAM';
var scopes = 'email profile';  

var logged_in = false;
 
// Our first function is used to set the api key and
// is run once the google api is loaded in the page header. 
function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
}
 
//Gets the result after the authorization and if successful,
//it makes the api call to get the  //user's information.
function handleAuthResult(authResult) {
 
    if (authResult && !authResult.error) {
        makeApiCall();
    } 
}
  
//Make api call on button click to authorize client
function handleAuthClick(event) { 
		if(!logged_in){
			gapi.auth.authorize({ client_id: clientId, 
            scope: scopes, immediate: false }, handleAuthResult);
		}
		else {
			console.log('logged out');
			logged_in = false;
			angular.element(document.getElementById('test')).scope().user_logged_in();
			angular.element(document.getElementById('test')).scope().$apply();
			$('#googlelogin').html("Click to sign-in with Google");
			$('#user_name').text('You have been successfully logged-out!');
		}
    return false;
}
 
// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    gapi.client.load('plus', 'v1', function () {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
 
        request.execute(function (resp) {
			console.log(resp);
			$('#user_name').text('Welcome ' + resp.displayName);
			$('#googlelogin').html("Log-out");
			//$('#user_name').text(resp.emails[0].value); <-- email
			logged_in = true;
			angular.element(document.getElementById('test')).scope().user_logged_in();
			angular.element(document.getElementById('test')).scope().$apply();
			
        });
    });
}
 
$(function () {
    var authorizeButton = document.getElementById('googlelogin');
		authorizeButton.onclick = handleAuthClick;

	
})

function isLogged() {
	return logged_in;
}