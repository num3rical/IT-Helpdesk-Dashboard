# IT-Helpdesk-Dashboard
The front-end for an IT helpdesk dashboard. This was my midterm project in 2024 for the course Intro to Cloud Computing (ITI-200)

![Screenshot of tickets.html](https://i.imgur.com/BGq1nOY.png) ![Screenshot of monitor.html](https://i.imgur.com/oFZIXuN.png)

## Uses:
- HTML5
- CSS
- JavaScript
- jQuery
- Bootstrap

## Known Issues
- Sorting tickets after filtering resets the filter
- Scaling issues (table too small, text escaping buttons)
- Table formatting is incorrect when closed tickets are hidden
- Filtering causes closed tickets to show regardless of checkbox state
- Security vulnerability (cross site scripting) - You can inject HTML, including <script> tags,
into the title or description of a ticket.
- “New Ticket” modal shows the wrong title after viewing ticket details
