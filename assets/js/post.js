const addBtn = (number) => {
    const num_btn = Math.ceil(number / 5);
    const pageination = $(".site-pagination");
    $(`<button class="active">1</button>`).appendTo(pageination);
    for (let i = 0; i < 5; i++) {
        if ($(`#post_${i + 1}`).length != 0) {
            $(`#post_${i + 1}`).fadeIn(100);
        }
    }
    for (let i = 1; i < num_btn; i++) {
        const btn = `<button>${i + 1}</button>`;
        $(btn).appendTo(pageination);
    }
}

const add_btn_function = () => {
    $(".site-pagination button").on("click", (e) => {
        const post_no = (e.target.innerHTML - 1) * 5;
        const current_no = (current_active.innerHTML - 1) * 5;
        for (let i = current_no; i < current_no + 5; i++) {
            if ($(`#post_${i + 1}`).length != 0) {
                $(`#post_${i + 1}`).fadeOut(0);
            } else {
                break;
            }
        }
        let counter = 0;
        for (let i = post_no; i < post_no + 5; i++) {
            if ($(`#post_${i + 1}`).length != 0) {
                $(`#post_${i + 1}`).fadeIn(100);
                counter ++;
            } else {
                break;
            }

        }
        current_active.classList.remove("active");
        current_active = e.target;
        current_active.classList.add("active");
            setTimeout(() => {
                const coordinate = $(".page-top-section .page-info").offset();
                window.scrollTo(coordinate.top, coordinate.left);
            }, 110);
    });
}

const init = () => {
    const number = $("article").length;
    addBtn(number);
    add_btn_function();
    current_active = document.querySelector(".site-pagination button.active");
}

$(document).ready(init);