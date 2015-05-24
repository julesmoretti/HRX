## GITHUB WORKFLOW

Work flow to download from git hub latest version of the HRX app and getting it up and running with all their dependencies.

Assuming you have `git`, `npm` and `bower` installed on your local machine. Otherwise read the `getting_your_machine_ready.txt`.


### FIRST TIME GETTING THE APPLICATION UP AND RUNNING

Using terminal application navigate to a directory of your chose where you would like the HRX folder to be created with all the relevant information.

Then type `git clone https://github.com/julesmoretti/HRX.git`

Then go into the newly created folder by typing `cd HRX`

Then type `npm install`, and then once that is done `bower install`.

At this point you should be able to follow the `local_workflow.txt` steps to preview the latest changes live.


### TO VIEW CHANGES FROM OTHER DEVELOPPERS

This is you have not done any changes yourself since the last time you acquired the project.

Run `git pull origin master` from Terminal within the root directory of the `HRX` app.

This will get the latest changes onto your local project.

Then follow the `local_workflow.txt` steps to preview the latest changes live.
