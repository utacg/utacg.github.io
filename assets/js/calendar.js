document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'timeGrid'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }
    });

    let event = $.getJSON("/assets/data/events.json", () => {
        const events = JSON.parse(event.responseText)["events"];
        for (let i = 0; i < events.length; i++) {
            calendar.addEvent(events[i]);
        }
    });

    calendar.on("eventClick", (info) => {
        info.jsEvent.preventDefault();
        generate_popup(info);
    })

    calendar.on("eventMouseEnter", (info) => {
    })

    calendar.on("eventMouseLeave", (info) => {
        //$("#event-detail").remove();
    })

    calendar.render();
});

const generate_popup = (info) => {
    let pop_up = "";
    if (!info.event.allDay) {
        const start_time = info.event.start.getHours() + ":" + (info.event.start.getMinutes() < 10 ? "0" + info.event.start.getMinutes() : info.event.start.getMinutes());
        const end_time = info.event.end.getHours() + ":" + (info.event.end.getMinutes() < 10 ? "0" + info.event.end.getMinutes() : info.event.end.getMinutes());
        let x = $(info.el).parent().position();
        let test = $(info.el).parents(".fc-row").position();
        pop_up = `
        <div id="event-detail" style="top: ${x.top + test.top + 24 - 10}px; left: ${x.left - 15}px">
            <div id="mdiv" class="mt-1 mr-1">
                <div class="mdiv">
                    <div class="md"></div>
                </div>
            </div>
            <p>Details</p>
            <p>start time: ${start_time}</p>
            <p>end time: ${end_time}</p>
        </div>`;
    }
    else {
        let x = $(info.el).parent().position();
        let test = $(info.el).parents(".fc-row").position();
        pop_up = `
        <div id="event-detail" style="top: ${x.top + test.top + 24 - 10}px; left: ${x.left - 15}px">
            <div id="mdiv" class="mt-1 mr-1">
                <div class="mdiv">
                    <div class="md"></div>
                </div>
            </div>
            <p>Details</p>
            <p>time: All Day</p>
        </div>`;
    }
    const target = $(info.el).parents(".fc-view-container");
    $(pop_up).appendTo(target);
    $("#event-detail #mdiv").on("click", (e) => {
        console.log("click");
        console.log(e);
        $(e.target).parents("#event-detail").remove();
    });
}