// Show / hide the full synopsis toggle function
function toggleSynopsis() {
    let more = document.getElementById("synopsisMore");
    let btn = document.getElementById("synopsisBtn");

    if (more.classList.contains("hidden")) {
        more.classList.remove("hidden");
        btn.innerHTML = "Show Less";
    } else {
        more.classList.add("hidden");
        btn.innerHTML = "Read Full Synopsis";
    }
}