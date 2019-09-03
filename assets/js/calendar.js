document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.querySelector("#calendar");

    //Initialize the calendar with options
    let calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'list'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth, listWeek'
        }
    });

    //Load event Source into the calendar
    addSourceToCalendar("/assets/data/events.json", calendar);

    calendar.on("eventClick", (info) => {
        info.jsEvent.preventDefault();
        if(info.view.type != "dayGridMonth") return;
        generate_popup(info);
    })
    calendar.render();

    //Added click event handler to 2 buttons
    $(".fc-listWeek-button").on("click", ()=> {
        const currentSource = calendar.getEventSourceById(1);
        currentSource.remove();
        addSourceToCalendar("/assets/data/events.json", calendar, true);
    });

    $(".fc-dayGridMonth-button").on("click", () => {
        const currentSource = calendar.getEventSourceById(1);
        currentSource.remove();
        addSourceToCalendar("/assets/data/events.json", calendar);
    });
});





// Helper Function
const addSourceToCalendar = (url, calendar, default_enabled=false) => {
    let event = $.getJSON(url, () => {
        let source_json = JSON.parse(event.responseText);
        if(default_enabled){
            delete source_json["className"];
        }
        calendar.addEventSource(source_json);
    });
}

const generate_popup = (info) => {
    let pop_up = "";
    if (!info.event.allDay) {
        const start_time = info.event.start.getHours() + ":" + (info.event.start.getMinutes() < 10 ? "0" + info.event.start.getMinutes() : info.event.start.getMinutes());
        const end_time = info.event.end.getHours() + ":" + (info.event.end.getMinutes() < 10 ? "0" + info.event.end.getMinutes() : info.event.end.getMinutes());
        let pos = $(info.el).parent().position();
        let row_pos = $(info.el).parents(".fc-row").position();
        pop_up = `
        <div id="event-detail" style="top: ${pos.top + row_pos.top + 24 - 10}px; left: ${pos.left - 15}px">
            <div id="mdiv" class="mt-1 mr-1">
                <div class="mdiv">
                    <div class="md"></div>
                </div>
            </div>
            <p class="event-title">Details</p>
            <p>Title: ${info.event.title}</p>
            <p>Start time: ${start_time}</p>
            <p>End time: ${end_time}</p>
        </div>`;
    }
    else {
        let pos = $(info.el).parent().position();
        let row_pos = $(info.el).parents(".fc-row").position();
        pop_up = `
        <div id="event-detail" style="top: ${pos.top + row_pos.top + 24 - 10}px; left: ${pos.left - 15}px">
            <div id="mdiv" class="mt-1 mr-1">
                <div class="mdiv">
                    <div class="md"></div>
                </div>
            </div>
            <p class="event-title">Details</p>
            <p>Title: ${info.event.title}</p>
            <p>Time: All Day</p>
        </div>`;
    }
    const target = $(info.el).parents(".fc-view-container");
    $(pop_up).appendTo(target);
    $("#event-detail #mdiv").on("click", (e) => {
        $(e.target).parents("#event-detail").remove();
    });
}