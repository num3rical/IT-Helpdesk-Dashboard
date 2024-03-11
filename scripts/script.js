$(function() { 
    
    let tickets = [];

    let ascending = true;
    
    // Adds a ticket to the tickets array
    function addTicket(status, openDate, priority, title, author, category, assignee, description, image) {
        if (image) {
            // removes :C:\fakepath\
            image = image.substring(12);
            image = "media\\" + image;
        }

        let ticket = {
            id: tickets.length + 1,
            status: status,
            openDate: openDate,
            priority: priority,
            title: title,
            author: author,
            category: category,
            assignee: assignee,
            description: description,
            image: image
        }

        tickets.push(ticket);
    };

    /* 
        * Iterates through tickets and adds a row to the table for each.
        * Ticket priority fields are colored.
        * Closed tickets are given .ticket-closed 
        * Closed tickets are hidden if #showClosed isn't checked
    */
    function populateTable(arr) {
        $("tbody").html("");
        for (let i = 0; i < arr.length; i++) {
            let ticket = arr[i];

            let priorityClass = "";
            let ticketClass = "";

            if (ticket.priority === "Low") priorityClass = "ticket-green";
            if (ticket.priority === "Medium") priorityClass = "ticket-yellow";
            else if (ticket.priority === "High") priorityClass = "ticket-red";

            if (ticket.status === "Closed") {
                ticketClass = "ticket-closed";
                if (!$("#showClosed").is(":checked") ) ticketClass += " d-none";
            }

            $("tbody").append(`
                <tr class="${ticketClass}">
                    <td class="field-id">${ticket.id}</td>
                    <td class="field-status">${ticket.status}</td>
                    <td class="field-date">${ticket.openDate}</td>
                    <td class="field-priority ${priorityClass}">${ticket.priority}</td>
                    <td class="field-title">${ticket.title}</td>
                    <td class="field-author">${ticket.author}</td>
                    <td class="field-category">${ticket.category}</td>
                    <td class="field-assignee">${ticket.assignee}</td>
                    <td>
                        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#ticketModal">View Ticket</button>
                    </td>
                </tr>
            `);
        }
    };

    // Sorts arr by id and populates the table.
    function sortTable(arr, ascending) {
        arr.sort((a, b) => {
            if (ascending) return parseInt(a.id) - parseInt(b.id);
            else return parseInt(b.id) - parseInt(a.id);
        });

        populateTable(arr);    
    }

    // Sorts arr by date and populates the table.
    function sortTableDate(arr, ascending) {
        arr.sort((a, b) => {
            if (ascending) return new Date(a.openDate) - new Date(b.openDate);
            else return new Date(b.openDate) - new Date(a.openDate);
        });

        populateTable(arr);    
    }

    // Sorts arr by status and populates the table.
    function sortTableStatus(arr, ascending) {
        const sortOrder = {
            "New": 1,
            "In Progress": 2,
            "Closed": 3
        }

        arr.sort((a, b) => {
            if (ascending) return sortOrder[a.status] - sortOrder[b.status];
            else return sortOrder[b.status] - sortOrder[a.status];
        });

        populateTable(arr);    
    }

    // Sorts arr by priority and populates the table.
    function sortTablePriority(arr, ascending) {
        const sortOrder = {
            "Low": 1,
            "Medium": 2,
            "High": 3
        }

        arr.sort((a, b) => {
            if (ascending) return sortOrder[a.priority] - sortOrder[b.priority];
            else return sortOrder[b.priority] - sortOrder[a.priority];
        });

        populateTable(arr);    
    }

    function resetSortClasses() {
        $("table a").each(function() {
            $(this).removeClass("sort-active");
        });
    };

    $("#sortID").on("click", function() {
        ascending = !ascending;
        sortTable(tickets, ascending);
        
        resetSortClasses();
        $("#sortID").addClass("sort-active");
    });

    $("#sortDate").on("click", function() {
        ascending = !ascending;
        sortTableDate(tickets, ascending);

        resetSortClasses();
        $("#sortDate").addClass("sort-active");
    });

    $("#sortStatus").on("click", function() {
        ascending = !ascending;
        sortTableStatus(tickets, ascending);

        resetSortClasses();
        $("#sortStatus").addClass("sort-active");
    });

    $("#sortPriority").on("click", function() {
        ascending = !ascending;
        sortTablePriority(tickets, ascending);

        resetSortClasses();
        $("#sortPriority").addClass("sort-active");
    });

    // Filters rows on the table by title. Filtered by input in #filterTickets
    $("#filterTickets").keyup(function() {
        $("tbody tr").each(function(index, obj) {
            let ticketTitle = $(this).find(".field-title");
            if ((ticketTitle.text().toUpperCase().includes($("#filterTickets").val().toUpperCase()))) {
                $(obj).removeClass("d-none");
            }
            else {
                $(obj).addClass("d-none");
            }
        });
    });

    // Whenever a ticketModal is shown, use data from ticket to fill information
    $("#ticketModal").on("shown.bs.modal", function (event) { 
        const button = event.relatedTarget;
        const curr = $(button).closest("tr"); //current ticket (row)

        // gets the ticket obj from the tickets array based on the id field in the table
        let ticketObj = tickets.find((element) => element.id === parseInt(curr.find(".field-id").text()))
        
        $(".modal-title").text(curr.find(".field-title").text());
        $("#modalDate").text(curr.find(".field-date").text());
        $("#modalAuthor").text(curr.find(".field-author").text());
        $("#modalStatus").text(curr.find(".field-status").text());
        $("#modalPriority").text(curr.find(".field-priority").text());
        $("#modalCategory").text(curr.find(".field-category").text());
        $("#modalAssignee").text(curr.find(".field-assignee").text());
        $("#modalDescription").val(ticketObj.description);
        $("#modalPicture").attr("src", ticketObj.image);
    }); 
    
    $("#showClosed").on("click", function() {
        $(".ticket-closed").each(function(index, obj) {
            if ($("#showClosed").is(":checked")) {
                $(obj).removeClass("d-none");
            }
            else {
                $(obj).addClass("d-none");
            };
        });
    });
    
    $("#submitTicket").on("click", function() {
        addTicket("New", "2024-02-21", $("#inputPriority").val(), $("#inputTitle").val(), "Admin", $("#inputCategory").val(), "None", $("#inputDescription").val(), $("#inputPicture").val());
        populateTable(tickets);
    });

    /* 
        * Below calls to addTicket() were generated using ChatGPT 3.5.
        *
        * Prompt:
        * Create 12 calls to the function addTicket(status, openDate, priority, title, author, category, assignee), 
        * which creates a support ticket in an IT helpdesk for a retail store. Pick random, nearby dates. status can be either "New", 
        * "In Progress", or "Closed". priority can be either "Low", "Medium", or "High". The assignee should be one person.
    */

    addTicket("Closed", "2024-02-22", "High", "Network connectivity problem", "Alex Johnson", "Networking", "Charlie Brown")
    addTicket("New", "2024-02-18", "Low", "Printer not working", "John Doe", "Hardware", "Alice Smith")
    addTicket("In Progress", "2024-02-20", "Medium", "Software installation issue", "Jane Doe", "Software", "Bob Johnson")
    addTicket("New", "2024-02-25", "Medium", "Email configuration problem", "Eva White", "Email", "David Green")
    addTicket("In Progress", "2024-02-28", "Low", "Security software update required", "Frank Black", "Security", "Grace Davis")
    addTicket("Closed", "2024-03-03", "High", "POS system error", "Henry Gray", "Point of Sale", "Isabel Martinez")
    addTicket("In Progress", "2024-03-12", "Medium", "Account access issue", "Liam Brown", "Accounts", "Mary Robinson")
    addTicket("New", "2024-03-08", "Low", "Monitor flickering", "Jack Wilson", "Hardware", "Kelly Thompson")
    addTicket("Closed", "2024-03-16", "High", "Server outage", "Nina Taylor", "Infrastructure", "Oliver Miller")
    addTicket("New", "2024-03-21", "Medium", "Software crash", "Paul Anderson", "Software", "Quinn Turner")
    addTicket("In Progress", "2024-03-26", "Low", "Printer paper jam", "Rachel Baker", "Hardware", "Samuel Adams")
    addTicket("Closed", "2024-04-01", "High", "Data backup failure", "Tina Campbell", "Backup", "Victor White")

    populateTable(tickets);
});
