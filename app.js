// =============================
// NAVBAR
// =============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(menuBtn){
    menuBtn.addEventListener("click",()=>{
        navLinks.classList.toggle("show");
    });
}

// =============================
// ELEMENTS
// =============================

const brandInput=document.getElementById("brand");
const modelInput=document.getElementById("model");

const brandSuggestions=document.getElementById("brandSuggestions");
const modelSuggestions=document.getElementById("modelSuggestions");

const saveBtn=document.getElementById("saveBtn");
const toast=document.getElementById("toast");

// =============================
// TOAST
// =============================

function showToast(message,color="#22c55e"){

    toast.innerHTML=message;
    toast.style.background=color;
    toast.style.display="block";

    setTimeout(()=>{
        toast.style.display="none";
    },2500);

}

// =============================
// GET VEHICLE TYPE
// =============================

function getVehicleType(){

    const type=document.querySelector(
        "input[name='vehicleType']:checked"
    );

    return type ? type.value : null;

}

// =============================
// LOAD BRANDS
// =============================

function loadBrands(){

    brandSuggestions.innerHTML="";
    modelSuggestions.innerHTML="";

    brandInput.value="";
    modelInput.value="";

    const type=getVehicleType();

    if(!type) return;

    const brands=vehicleData[type];

    Object.keys(brands).forEach(brand=>{

        const option=document.createElement("option");

        option.value=brand;

        brandSuggestions.appendChild(option);

    });

}

// =============================
// LOAD MODELS
// =============================

function loadModels(){

    modelSuggestions.innerHTML="";

    const type=getVehicleType();

    if(!type) return;

    const brand=brandInput.value.trim();

    const brands=vehicleData[type];

    if(brands[brand]){

        brands[brand].forEach(model=>{

            const option=document.createElement("option");

            option.value=model;

            modelSuggestions.appendChild(option);

        });

    }

}

// =============================
// SAVE VEHICLE DATA
// =============================

function saveVehicleData(){

    const type=getVehicleType();
    const brand=brandInput.value.trim();
    const model=modelInput.value.trim();

    if(!type || !brand || !model){
        showToast("Please fill all fields", "#ef4444");
        return;
    }

    const vehicles=JSON.parse(localStorage.getItem("vehicles")) || [];

    const vehicle={
        slno: vehicles.length + 1,
        vehicleType: type,
        brand,
        model
    };

    vehicles.push(vehicle);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    showToast("Data saved successfully!");

    brandInput.value="";
    modelInput.value="";

    document.querySelectorAll("input[name='vehicleType']").forEach(radio=>{
        radio.checked=false;
    });

    brandSuggestions.innerHTML="";
    modelSuggestions.innerHTML="";

}

if(saveBtn){
    saveBtn.addEventListener("click", saveVehicleData);
}

// =============================
// RADIO BUTTON CHANGE
// =============================

document
.querySelectorAll("input[name='vehicleType']")
.forEach(radio=>{

    radio.addEventListener("change",()=>{

        loadBrands();

    });

});

// =============================
// BRAND CHANGE
// =============================

brandInput.addEventListener("input",loadModels);
brandInput.addEventListener("change",loadModels);

// =============================
// AUTO CORRECT BRAND
// =============================

brandInput.addEventListener("blur",()=>{

    const type=getVehicleType();

    if(!type) return;

    const brands=vehicleData[type];

    Object.keys(brands).forEach(brand=>{

        if(
            brand.toLowerCase()===brandInput.value.toLowerCase()
        ){

            brandInput.value=brand;

        }

    });

});

// =============================
// AUTO CORRECT MODEL
// =============================

modelInput.addEventListener("blur",()=>{

    const type=getVehicleType();

    if(!type) return;

    const brands=vehicleData[type];

    if(brands[brandInput.value]){

        brands[brandInput.value].forEach(model=>{

            if(
                model.toLowerCase()===
                modelInput.value.toLowerCase()
            ){

                modelInput.value=model;

            }

        });

    }

});