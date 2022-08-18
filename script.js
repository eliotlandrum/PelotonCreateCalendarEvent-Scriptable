// FILL IN THESE VARIABLES WITH YOUR INFO //
const calendarName = "Home"; // your calendar name
const username = ""; // can be email or Leaderboard name
const password = "";
// ***************** //

// https://app.swaggerhub.com/apis/DovOps/peloton-unofficial-api/0.3.1#/
const pelotonApi = "https://api.onepeloton.com";

const sessionId = getSessionId(username,password);

createCalendarItem(String(args.urls));

async function createCalendarItem(inviteUrl) {
  try {
    const { rideId, reservationId } = getRideAndReservationIds(inviteUrl);
    const rideInfo = await getRideInfo(rideId);
    const reservationInfo = await getReservationInfo(reservationId);

    const description =
      rideInfo.description + "\n\nInvitation URL: " + inviteUrl;

    let event = new CalendarEvent();
    event.title = rideInfo.title;
    event.startDate = new Date(reservationInfo.scheduled_start_time * 1000);
    event.endDate = new Date(
      (reservationInfo.scheduled_start_time + rideInfo.duration) * 1000
    );
    event.notes = description;

    event.calendar = await Calendar.forEventsByTitle(calendarName);
    // this could popup the calendar event for modifications if the user wants to before creating the event
    //await event.presentEdit();
    event.save();

    const alert = new Alert();
    alert.message = "Event Created";
    alert.addAction("OK");
    await alert.presentAlert();

    console.log(
      "Created Event: " +
        event.title +
        ", start time: " +
        event.startDate.toString() +
        ", ID: " +
        event.identifier
    );
  } catch (e) {
    const alert = new Alert();
    alert.message = e.message;
    alert.addAction("OK");
    await alert.presentAlert();
    console.log(e.message);
  }
}

// return rideId and reservationId
function getRideAndReservationIds(url) {
  const rideId = url.split("/")[5];
  const reservationId = url
    .split("/")[6]
    .slice(0, url.split("/")[6].lastIndexOf("?"));

  console.log("rideId: " + rideId + ", reservationId: " + reservationId);
  return { rideId, reservationId };
}

// authorize with the Peloton app and get a session ID
async function getSessionId(user, pass) {
  return await postToApi(
    "/auth/login",
    {
      username_or_email: user,
      password: pass,
    }
  ).session_id;
}

async function getRideInfo(rideId) {
  return await getFromApi(
    "/api/ride/" + rideId + "/details?stream_source=multichannel"
  ).ride;
}

async function getReservationInfo(reservationId) {
  return await getFromApi("/api/peloton/" + reservationId);
}

async function postToApi(endpoint, payload) {
  const request = new Request(pelotonApi + endpoint);
  request.method = "POST";
  request.body = JSON.stringify(payload);
  request.headers = { "Content-Type": "application/json;charset=UTF-8" };

  const response = await request.loadJSON();
  console.log(response);
  return response;
}

async function getFromApi(endpoint) {
  const request = new Request(pelotonApi + endpoint);
  request.method = "GET";
  request.headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Cookie": "peloton_session_id=" + sessionId,
  };

  const response = await request.loadJSON();
  console.log(response);
  return response;
}