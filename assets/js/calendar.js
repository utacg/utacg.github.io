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

    // calendar.on("eventClick", (info) => {
    //     info.jsEvent.preventDefault();
    //     if ($("#event-detail").length != 0) {
    //         info.el.style.borderColor = "transparent";
    //         $("#event-detail").remove();
    //         return;
    //     }
    //     info.el.style.borderColor = 'salmon';
    //     let pop_up = "";
    //     if (!info.event.allDay) {
    //         const start_time = info.event.start.getHours() + ":" + (info.event.start.getMinutes() < 10 ? "0" + info.event.start.getMinutes() : info.event.start.getMinutes());
    //         const end_time = info.event.end.getHours() + ":" + (info.event.end.getMinutes() < 10 ? "0" + info.event.end.getMinutes() : info.event.end.getMinutes());
    //         pop_up = `
    //         <div id="event-detail">
    //             <p>Details</p>
    //             <p>start time: ${start_time}</p>
    //             <p>end time: ${end_time}</p>
    //             <div class="text-center">
    //             <a class="event-link" href="${info.event.url}">links</a>
    //             </div>
    //         </div>`;
    //     }
    //     else {
    //         pop_up = `
    //         <div id="event-detail">
    //             <p>Details</p>
    //             <div class="text-center">
    //             <a class="event-link">links</a>
    //             </div>
    //         </div>`;
    //     }
    //     $("#event-detail a").on("click", () => {
    //         window.open("info.event.url")
    //     })
    //     $(pop_up).appendTo(info.el);   
    // })

    calendar.on("eventMouseEnter", (info) => {
        info.el.style.borderColor = 'salmon';
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
                <a class="event-link" href="${info.event.url}">links</a>
                </div>
            </div>`;
        }
        else {
            pop_up = `
            <div id="event-detail">
                <p>Details</p>
                <div class="text-center">
                <a class="event-link" href="${info.event.url}">links</a>
                </div>
            </div>`;
        }
        $("#event-detail a").on("click", () => {
            window.open("info.event.url")
        })
        $(pop_up).appendTo(info.el);
    })

    calendar.on("eventMouseLeave", (info) => {
        info.el.style.borderColor = "transparent";
        $("#event-detail").remove();
    })
    calendar.render();
});