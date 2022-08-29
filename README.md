# Peloton Create Calendar Event Scriptable

Requires the free [Scriptable App](https://scriptable.app/) available from the iOS App Store.

Created by Eliot Landrum <eliot@landrum.cx> #pocketmonster

## Installation

1) [Download the Scriptable app](https://apps.apple.com/us/app/scriptable/id1405459188) from the App Store.
2) From your iPhone or iPad, save the script file to your iCloud Drive > Scriptable folder. If you have a Mac
    with the same iCloud account, this might be a little easier to do from there.
    1) From the GitHub website with the [script file](https://github.com/eliotlandrum/PelotonCreateCalendarEvent-Scriptable/blob/main/Create%20Peloton%20Event.js)
        visible, if you are on your phone you may see a "...", tap that and then when you see "View raw" or "Raw" buttons.
        ![View Raw Button](/images/setup-01.png?raw=true)
    2) Tap and hold until you see a popup menu and preview. Tap "Download Linked File".
        ![File Preview](/images/setup-02.png?raw=true)
    3) At the top of the browser, tap the little blue download button and then Downloads.
        ![Go to Downloads](/images/setup-03.png?raw=true)  
    4) Tap the spyglass to go to the file in your downloads.  
        ![Downloads](/images/setup-04.png?raw=true)            
    5) Tap the file icon.
        ![Downloads](/images/setup-05.png?raw=true)                
    6) Tap on "Move" in the menu.
        ![File Menu](/images/setup-06.png?raw=true)                            
    7) Select "Scriptable" under "iCloud Drive" and then the Move or Copy button at the top right.        
        ![Folder Selection](/images/setup-07.png?raw=true)                                
3) Now, open Scriptable and tap the "..." at the top right of the tile for Create Peloton Event.
    ![Scriptable Main Screen](/images/setup-08.png?raw=true)                                
4) Edit the variables with your user information (this information is NOT sent anywhere besides the Peloton API)
    and then tap Done. Take care to keep the quotes around your info.
    ![Script editor](/images/setup-09.png?raw=true)                                

## How to Run

1) In the Peloton app, schedule a new class -- either Live/Encore or an on-demand.
    ![Peloton Scheduled Classes](/images/run-01.png?raw=true) 
2) From the class details page that says "you're in", tap the share button at the top right.
    ![Peloton Scheduled Class Details](/images/run-02.png?raw=true) 
3) Find "Run Script" with the { } icon in the list and tap that.
    ![Share Pane](/images/run-03.png?raw=true) 
4) Tap the "Create Peloton Event" tile.  
    ![Scriptable Scripts](/images/run-04.png?raw=true) 
5) The *first time* you run this script, grant calendar permissions and then
   force quit both Scriptable and Peloton apps and share the class to the script again.
   If you get a message about not finding the calendar, be sure to check the calendar permissions in 
   system Settings under Scriptable and then restarting both applications.
6) If it was successful, you will see "Event Created". Tap OK and then check your calendar!
    ![Scriptable Scripts](/images/run-05.png?raw=true) 
    ![Scriptable Scripts](/images/run-06.png?raw=true)     

## Known Limitations / Issues
- If the calendar you are adding to is a Google calendar, then your default alerts will be added. Otherwise, unfortunately,
    Scriptable doesn't currently support adding an alert to the calendar item. You'll have to manually modify the event
    after it's added to add the reminder alert.
- Some of the classes start at :59 instead of :00 for some reason. I'm looking into why.

That's it! Let me know what you think! See you on the leaderboard!
