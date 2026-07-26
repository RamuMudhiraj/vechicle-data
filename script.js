const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.getElementById("vehicleForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let vehicleno = document.getElementById("vehicleno").value;
    let vehiclename = document.getElementById("vehiclename").value;
    let location = document.getElementById("location").value;

    let type = document.querySelector('input[name="type"]:checked').value;

    // Get existing data
    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    // Generate automatic Serial Number
    let slno = vehicles.length + 1;

    let vehicle = {
        slno: slno,
        vehicleno: vehicleno,
        vehiclename: vehiclename,
        type: type,
        location: location
    };

    vehicles.push(vehicle);

    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    alert("Data Saved Successfully!");

    document.getElementById("vehicleForm").reset();

});
