document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.querySelector("#calendar");


    let calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid', 'timeGrid'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: "zh-cn"
    });

    let event = $.getJSON("/assets/data/events.json", () => {
        calendar.addEventSource(JSON.parse(event.responseText));
    });

    calendar.on("eventClick", (info) => {
        info.jsEvent.preventDefault();
        if(info.view.type != "dayGridMonth") return;
        generate_popup(info);
    })
    calendar.render();
});

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
        console.log("click");
        console.log(e);
        $(e.target).parents("#event-detail").remove();
    });
}