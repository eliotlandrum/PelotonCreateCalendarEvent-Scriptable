// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: bicycle; share-sheet-inputs: url;

// Peloton Create Calendar Event Scriptable
// Requires the free Scriptable App available from the iOS App Store
// Created by Eliot Landrum <eliot@landrum.cx> #pocketmonster
// 
// To install: 
//   1) Download the Scriptable app.
//   2) From your iPhone or iPad, save this file to your iCloud Drive > Scriptable folder.
//		- Use Safari, not Google Chrome
//      - From the GitHub website with this file visible, if you are on your phone you may see a "...",
//        tap that and then when you see "View raw" or "Raw" buttons, tap and hold until you see a popup menu and preview.
//        Now, tap "Download Linked File". If you don't see
//      - In the Files app, you need to move the downloaded file from On My iPhone > Downloads to iCloud Drive > Scriptable.
//   3) In Scriptable, click the "..." at the top right of the tile for Create Peloton Event.
//   4) Edit the variables below with your user information (this information is NOT sent anywhere besides the Peloton API).
//
// To run:
//   1) In the Peloton app, schedule a new class -- either Live/Encore or an ondemand schedule it.
//   2) From the class details page that says "you're in", tap the share button at the top right.
//   3) Find "Run Script" with the { } icon in the list and tap that.
//   4) Tap the "Create Peloton Event" tile. The first time it runs, it will need to get access to your calendar. Tap OK for this.
//   5) If it was successful, you will see "Event Created".
//
//   NOTE: if you see an error the first time you run about not being able to find a calendar,
//         force quit both Scriptable and Peloton and try again. This has to do with permissions not refreshing to see the calendars.
//
// That's it! Let me know what you think! See you on the leaderboard!
// ***************** //

// FILL IN THESE VARIABLES WITH YOUR INFO //
const calendarName = "Home"; // use the name that you see in the Apple Calendar App
const username = ""; // can be email for Peloton account or Leaderboard name
const password = ""; // Peloton password
// ***************** //

// Release History
//
// 1.0 - 2022-08-19 - First release! It works!
// 1.1 - 2022-08-30 - Add instructor name to title
// 1.2 - 2022-08-30 - Handle trying to run from Scriptable directly
//
// ***************** //

// ❤ https://app.swaggerhub.com/apis/DovOps/peloton-unofficial-api/0.3.1#/
const pelotonApi = "https://api.onepeloton.com";

const sessionId = await getSessionId(username,password);

await createCalendarItem(String(args.urls));

Script.complete()

async function createCalendarItem(inviteUrl){
  try {    
	if (!inviteUrl) {
		const alert = new Alert();
		alert.message = "Don't run this in Scriptable, boo! Go back and read the README. Run the script from within the Peloton app.";
		alert.addAction("OK");
		await alert.presentAlert();
		return;

	}
    const {rideId, reservationId} = getRideAndReservationIds(inviteUrl);

    const rideInfo = await getRideInfo(rideId);
    const reservationInfo = await getReservationInfo(reservationId);

    //const description = "<p>" + rideInfo.description + "</p><p><a href='"+inviteUrl+"'>Join Class</a></p>";
    const description = rideInfo.description + "\n\nInvitation URL: " + inviteUrl;

	let event = new CalendarEvent();
	event.title = rideInfo.title + " with " + rideInfo.instructor.name;
	event.startDate = new Date(reservationInfo.scheduled_start_time * 1000);
	event.endDate = new Date((reservationInfo.scheduled_start_time + rideInfo.duration) * 1000);
	event.notes = description;
	event.URL = inviteUrl;

	event.calendar = await Calendar.forEventsByTitle(calendarName);
	//await event.presentEdit();
	event.save();

	const alert = new Alert();
	alert.message = "Event Created";
	alert.addAction("OK");
	await alert.presentAlert();

	console.log("Created Event: "+event.title+", start time: "+event.startDate.toString()+", ID: "+event.identifier);
  } catch (e) {
   	const alert = new Alert();
	alert.message = e.message;
	alert.addAction("OK");
	await alert.presentAlert();
    logError(e.message);
  }
}

// return rideId and reservationId
function getRideAndReservationIds(url){
	const rideId = url.split('/')[5];
		const reservationId = url.split('/')[6].slice(0, url.split('/')[6].lastIndexOf("?"));
	  
		console.log("rideId: "+ rideId + ", reservationId: " + reservationId);
	  
		return {rideId, reservationId};
}

// authorize with the Peloton app and get a session ID
async function getSessionId(user,pass){
  const session = await postToApi("/auth/login",
    {"username_or_email": user,
    "password": pass }
    );
  return session.session_id;
}

async function getRideInfo(rideId) {
  const rideDetails = await getFromApi("/api/ride/"+rideId+"/details?stream_source=multichannel"); 
  return rideDetails.ride;
}

async function getReservationInfo(reservationId) {
  return await getFromApi("/api/peloton/" + reservationId)
}

async function postToApi(endpoint,payload){   
	const request = new Request(pelotonApi + endpoint);
	request.method = "POST";
	request.body = JSON.stringify(payload);
	request.headers = {"Content-Type": "application/json;charset=UTF-8"};
	
	const response = await request.loadJSON();
	console.log(response);
	return response;
}

// wrap around the UrlFetchApp.fetch to be able to GET content
async function getFromApi(endpoint){   
/*  	if (!sessionId) {
    console.log(endpoint)
    	sessionId = await getSessionId(username,password)
	}*/

	const request = new Request(pelotonApi + endpoint);
	request.method = "GET";
	request.headers = {"Content-Type": "application/json;charset=UTF-8",
      "Cookie": "peloton_session_id=" + sessionId};
      
    const response = await request.loadJSON();
    console.log(response);
	return response;
}



 
