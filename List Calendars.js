// Console log all of the calendar titles that are on the device
// Run this from within Scriptable and pop open the Log on the bottom of the screen to see the results

let calendars = await Calendar.forEvents();

calendars.forEach(c => {
  console.log(c.title);
});

Script.complete()
