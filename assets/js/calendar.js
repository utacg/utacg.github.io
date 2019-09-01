document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid']
    });

    let event = $.getJSON("/assets/data/events.json", () => {
        const events = JSON.parse(event.responseText)["events"];
        for (let i = 0; i < events.length; i++) {
            calendar.addEvent(events[i]);
        }
    });

    calendar.on("eventClick", (info) => {
        info.jsEvent.preventDefault();
    })

    calendar.on("eventMouseEnter", (info) => {
        let pop_up = "";
        if (!info.event.allDay) {
            const start_time = info.event.start.getHours() + ":" + (info.event.start.getMinutes() < 10 ? "0" + info.event.start.getMinutes() : info.event.start.getMinutes());
            const end_time = info.event.end.getHours() + ":" + (info.event.end.getMinutes() < 10 ? "0" + info.event.end.getMinutes() : info.event.end.getMinutes());
            pop_up = `
            <div id="event-detail">
                <p>Details</p>
                <p>start time: ${start_time}</p>
                <p>end time: ${end_time}</p>
                <div class="text-center">
                <p class="event-link">Click for details</p>
                </div>
            </div>`;
        }
        else {
            pop_up = `
            <div id="event-detail">
                <p>Details</p>
                <div class="text-center">
                <p class="event-link">Click for details</p>
                </div>
            </div>`;
        }
        $(pop_up).appendTo(info.el);
    })

    calendar.on("eventMouseLeave", (info) => {
        $("#event-detail").remove();
    })
    calendar.render();
});