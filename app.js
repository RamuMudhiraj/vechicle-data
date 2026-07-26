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

const brandList=document.getElementById("brandSuggestions");
const modelList=document.getElementById("modelSuggestions");

const saveBtn=document.getElementById("saveBtn");
const toast=document.getElementById("toast");

let currentBrands=[];
let currentModels=[];

// =============================
// TOAST
// =============================

function showToast(msg,color="#22c55e"){

    toast.innerHTML=msg;
    toast.style.background=color;
    toast.style.display="block";

    setTimeout(()=>{
        toast.style.display="none";
    },2500);

}

// =============================
// VEHICLE TYPE
// =============================

function getVehicleType(){

    const type=document.querySelector(
        "input[name='vehicleType']:checked"
    );

    return type ? type.value : "";

}

// =============================
// DROPDOWN
// =============================

function showDropdown(list){
    list.style.display="block";
}

function hideDropdown(list){
    list.style.display="none";
}

function clearDropdown(list){
    list.innerHTML="";
}

function createItem(text,input,list){

    const div=document.createElement("div");

    div.className="dropdown-item";

    div.innerHTML=text;

    div.onclick=()=>{

        input.value=text;

        hideDropdown(list);

        if(input===brandInput){

            loadModels(text);

            modelInput.value="";

        }

    };

    list.appendChild(div);

}

// =============================
// LOAD BRANDS
// =============================

function loadBrands(){

    brandInput.value="";
    modelInput.value="";

    clearDropdown(brandList);
    clearDropdown(modelList);

    const type=getVehicleType();

    if(!type) return;

    currentBrands=Object.keys(vehicleData[type]);

    currentBrands.forEach(brand=>{

        createItem(
            brand,
            brandInput,
            brandList
        );

    });

}


// =============================
// LOAD MODELS
// =============================

function loadModels(brand){

    clearDropdown(modelList);

    currentModels=[];

    const type=getVehicleType();

    if(!type) return;

    if(!vehicleData[type][brand]) return;

    currentModels=vehicleData[type][brand];

    currentModels.forEach(model=>{

        createItem(
            model,
            modelInput,
            modelList
        );

    });

}


// =============================
// BRAND SEARCH
// =============================

brandInput.addEventListener("focus",()=>{

    clearDropdown(brandList);

    currentBrands.forEach(brand=>{

        createItem(
            brand,
            brandInput,
            brandList
        );

    });

    showDropdown(brandList);

});


brandInput.addEventListener("input",()=>{

    clearDropdown(brandList);

    const value=brandInput.value.toLowerCase();

    currentBrands
    .filter(brand=>

        brand
        .toLowerCase()
        .includes(value)

    )
    .forEach(brand=>{

        createItem(
            brand,
            brandInput,
            brandList
        );

    });

    showDropdown(brandList);

});


// =============================
// MODEL SEARCH
// =============================

modelInput.addEventListener("focus",()=>{

    if(!brandInput.value){

        showToast(
            "Select Brand First",
            "#ef4444"
        );

        return;
    }

    loadModels(brandInput.value);

    showDropdown(modelList);

});


modelInput.addEventListener("input",()=>{

    clearDropdown(modelList);

    const value=modelInput.value.toLowerCase();

    currentModels
    .filter(model=>

        model
        .toLowerCase()
        .includes(value)

    )
    .forEach(model=>{

        createItem(
            model,
            modelInput,
            modelList
        );

    });

    showDropdown(modelList);

});


// =============================
// CLICK OUTSIDE
// =============================

document.addEventListener("click",(e)=>{

    if(!brandInput.contains(e.target) &&
       !brandList.contains(e.target)){

        hideDropdown(brandList);

    }

    if(!modelInput.contains(e.target) &&
       !modelList.contains(e.target)){

        hideDropdown(modelList);

    }

});

// =============================
// SAVE DATA
// =============================

function saveVehicleData(){

    const type=getVehicleType();

    const brand=brandInput.value.trim();

    const model=modelInput.value.trim();

    if(!type){

        showToast("Please Select Vehicle Type","#ef4444");

        return;

    }

    if(!currentBrands.includes(brand)){

        showToast("Please Select Valid Brand","#ef4444");

        return;

    }

    if(!currentModels.includes(model)){

        showToast("Please Select Valid Model","#ef4444");

        return;

    }

    let vehicles=JSON.parse(localStorage.getItem("vehicles")) || [];

    vehicles.push({

        slno:vehicles.length+1,

        vehicleType:type,

        brand:brand,

        model:model

    });

    localStorage.setItem(

        "vehicles",

        JSON.stringify(vehicles)

    );

    showToast("Vehicle Saved Successfully");

    brandInput.value="";

    modelInput.value="";

    clearDropdown(brandList);

    clearDropdown(modelList);

    currentModels=[];

    document

    .querySelectorAll("input[name='vehicleType']")

    .forEach(r=>{

        r.checked=false;

    });

}



// =============================
// SAVE BUTTON
// =============================

if(saveBtn){

    saveBtn.addEventListener(

        "click",

        saveVehicleData

    );

}



// =============================
// VEHICLE TYPE CHANGE
// =============================

document

.querySelectorAll(

'input[name="vehicleType"]'

)

.forEach(radio=>{

    radio.addEventListener(

        "change",

        ()=>{

            loadBrands();

        }

    );

});



// =============================
// AUTO CORRECT BRAND
// =============================

brandInput.addEventListener(

    "blur",

    ()=>{

        currentBrands.forEach(brand=>{

            if(

                brand.toLowerCase()

                ===

                brandInput.value

                .toLowerCase()

            ){

                brandInput.value=brand;

            }

        });

    }

);



// =============================
// AUTO CORRECT MODEL
// =============================

modelInput.addEventListener(

    "blur",

    ()=>{

        currentModels.forEach(model=>{

            if(

                model.toLowerCase()

                ===

                modelInput.value

                .toLowerCase()

            ){

                modelInput.value=model;

            }

        });

    }

);



// =============================
// ENTER KEY SUPPORT
// =============================

brandInput.addEventListener(

    "keydown",

    function(e){

        if(e.key==="Enter"){

            e.preventDefault();

            modelInput.focus();

        }

    }

);



modelInput.addEventListener(

    "keydown",

    function(e){

        if(e.key==="Enter"){

            e.preventDefault();

            saveVehicleData();

        }

    }

);



// =============================
// INIT
// =============================

clearDropdown(brandList);

clearDropdown(modelList);

hideDropdown(brandList);

hideDropdown(modelList);