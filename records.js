const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search");
const vehicleFilter = document.getElementById("vehicleFilter");
const brandFilter = document.getElementById("brandFilter");
const modelFilter = document.getElementById("modelFilter");

function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles")) || [];
}

function populateFilters(vehicles) {
    const brands = [...new Set(vehicles.map(v => v.brand))].sort();
    const models = [...new Set(vehicles.map(v => v.model))].sort();

    brandFilter.innerHTML = '<option value="All">All Brands</option>';
    modelFilter.innerHTML = '<option value="All">All Models</option>';

    brands.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });

    models.forEach(model => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelFilter.appendChild(option);
    });
}

function renderTable() {
    const vehicles = getVehicles();
    const searchText = searchInput.value.toLowerCase();
    const selectedType = vehicleFilter.value;
    const selectedBrand = brandFilter.value;
    const selectedModel = modelFilter.value;

    const filtered = vehicles.filter(vehicle => {
        const matchesSearch = `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(searchText);
        const matchesType = selectedType === "All" || vehicle.vehicleType === selectedType;
        const matchesBrand = selectedBrand === "All" || vehicle.brand === selectedBrand;
        const matchesModel = selectedModel === "All" || vehicle.model === selectedModel;

        return matchesSearch && matchesType && matchesBrand && matchesModel;
    });

    tableBody.innerHTML = "";

    if (filtered.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No records found</td></tr>';
        return;
    }

    filtered.forEach(vehicle => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${vehicle.slno}</td>
            <td>${vehicle.vehicleType}</td>
            <td>${vehicle.brand}</td>
            <td>${vehicle.model}</td>
            <td><button onclick="deleteVehicle(${vehicle.slno})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteVehicle(slno) {
    let vehicles = getVehicles();
    vehicles = vehicles.filter(vehicle => vehicle.slno !== slno);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    renderTable();
}

if (tableBody) {
    populateFilters(getVehicles());
    renderTable();

    [searchInput, vehicleFilter, brandFilter, modelFilter].forEach(element => {
        element.addEventListener("input", renderTable);
        element.addEventListener("change", renderTable);
    });
}
