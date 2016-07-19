# Techbridge for Girls – Hackathon Project

## Summary
Create a web app that will help guide Techbridge Girls to STEM career options and connect
them with role models in STEM related fields. For the hackathon we’re focused on the initial
flow of the application with the expectation that the rest of the application will be completed at
a later time after we hand off the project.

##Basic Flow (4 screens)
![application flow](https://github.com/techbridgeforgirls/techbridge/master/wiki/appFlow.jpg?token=AAA13-eAlPJLxbIgYD_LXesjbOMiAowjks5Xj6wFwA%3D%3D)

##Summary of Work
1. Create web app supporting the 4 screens shown above. This includes navigation as well
as api calls for fetching various data.

    1. **“What do you love” page** – This page allows user to select interests from a
number of different categories.
    2. **“I could be…” page** – This page will use the interests the user provided on the
previous page to display some career options. We will use the interests to find
the top 4 careers with the highest match based on the provided data set.
    3. **“Career” page** – This page will display information about the selected career. It
will also show up to 2 professionals who act as mentors for this career. This data
is still being populated and may not be ready in time.
    4. **“Mentor” page** – This page will display information for one of the TechBridge
mentors displayed on the previous page. This data is still being populated as
well.

2. Create api to supply all of the data needed by the web application. This will include a
number of different endpoints for each of the pages described above.

3. Populate database, and make use of database, using data provided by TechBridge. Work
is still being done to provide all of the data needed for the app. If data can’t be provided
we will make use of placeholder data which can be replaced later (after hackathon).

4. Deploy application to Heroku.
