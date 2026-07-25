/******************************************
   ATP FLEET MANAGEMENT
******************************************/

//========================================
// التاريخ والوقت
//========================================

function updateDateTime() {

    const now = new Date();

    const days = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"
    ];

    document.getElementById("todayName").innerHTML =
        days[now.getDay()];

    document.getElementById("todayDate").innerHTML =
        now.toLocaleDateString("en-GB");

    document.getElementById("todayTime").innerHTML =
        now.toLocaleTimeString("en-GB");

}

setInterval(updateDateTime, 1000);
updateDateTime();


//========================================
// الانتقال بين الصفحات
//========================================

function hideAllPages() {

    document.getElementById("homePage").style.display = "none";
    document.getElementById("registerPage").style.display = "none";
    document.getElementById("viewPage").style.display = "none";

}

function showRegisterPage() {

    hideAllPages();
    document.getElementById("registerPage").style.display = "block";

}

function showViewPage() {

    hideAllPages();
    document.getElementById("viewPage").style.display = "block";
    renderVehicles();

}

function goHome() {

    hideAllPages();
    document.getElementById("homePage").style.display = "block";

}


//========================================
// تعبئة أرقام المركبات
//========================================

const vehicleType =
document.getElementById("vehicleType");

const vehicleNumber =
document.getElementById("vehicleNumber");


vehicleType.addEventListener("change", function () {

    vehicleNumber.innerHTML =
    '<option value="">---</option>';

    const selectedType = this.value;

    const selectedVehicles =
        vehicles.filter(v => v.type === selectedType);

    selectedVehicles.forEach(vehicle => {

        const option =
        document.createElement("option");

        option.value = vehicle.number;
        option.textContent = vehicle.number;

        vehicleNumber.appendChild(option);

    });

});


//========================================
// تعبئة اسم السائق
//========================================

vehicleNumber.addEventListener("change", function () {

    const selectedVehicle =
    vehicles.find(v => v.number === this.value);

    if (selectedVehicle) {

        document.getElementById("driverName").innerHTML =
        selectedVehicle.driver;

    }

});


//========================================
// إظهار السائق الآخر
//========================================

document.getElementById("otherDriver")
.addEventListener("change", function () {

    document.getElementById("otherDriverCard")
    .style.display = "block";

});


document.getElementById("mainDriver")
.addEventListener("change", function () {

    document.getElementById("otherDriverCard")
    .style.display = "none";

});


//========================================
// سبب التوقف
//========================================

document.getElementById("stopped")
.addEventListener("change", function () {

    document.getElementById("reasonCard")
    .style.display = "block";

});


document.getElementById("working")
.addEventListener("change", function () {

    document.getElementById("reasonCard")
    .style.display = "none";

});


//========================================
// تحديث حالة المركبة
//========================================

function updateVehicleStatus() {

    const number =
    document.getElementById("vehicleNumber").value;

    const vehicle =
    vehicles.find(v => v.number === number);

    if (!vehicle) {

        alert("يرجى اختيار المركبة.");
        return;

    }

    vehicle.status =
    document.getElementById("working").checked ?
    "working" :
    "stopped";

    vehicle.reason =
    document.getElementById("stopReason").value;


    if (
        document.getElementById("otherDriver").checked
    ) {

        vehicle.driver =
        document.getElementById("otherDriverName").value;

    }


    const now = new Date();

    vehicle.lastUpdate =

        now.toLocaleDateString("en-GB")
        + " - " +
        now.toLocaleTimeString("en-GB");


    alert("تم تحديث حالة المركبة بنجاح.");

}


//========================================
// إرسال التقرير عبر واتساب
//========================================

function sendWhatsAppReport() {

    const number =
    document.getElementById("vehicleNumber").value;

    const vehicle =
    vehicles.find(v => v.number === number);

    if (!vehicle) {

        alert("يرجى اختيار المركبة.");
        return;

    }


    let message =

`ATP FLEET MANAGEMENT

شركة الراشد للتقنية والطاقة

نوع المركبة : ${vehicle.type}

رقم المركبة : ${vehicle.number}

اسم السائق : ${vehicle.driver}

حالة المركبة : ${
vehicle.status === "working"
? "تعمل"
: "متوقفة"
}

سبب التوقف : ${vehicle.reason}

آخر تحديث : ${vehicle.lastUpdate}`;


    const phone =
    "966509495516";


    const url =

`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


    window.open(url, "_blank");

}


//========================================
// عرض المركبات
//========================================

function renderVehicles() {

    renderSection(
        "PRIVATE",
        "privateVehicles",
        "privateTotal",
        "privateWorking",
        "privateStopped"
    );

    renderSection(
        "TRUCKS",
        "trucksVehicles",
        "trucksTotal",
        "trucksWorking",
        "trucksStopped"
    );

    renderSection(
        "EQUIPMENT",
        "equipmentVehicles",
        "equipmentTotal",
        "equipmentWorking",
        "equipmentStopped"
    );

}


function renderSection(
    type,
    containerId,
    totalId,
    workingId,
    stoppedId
) {

    const container =
    document.getElementById(containerId);

    container.innerHTML = "";

    const list =
    vehicles.filter(v => v.type === type);


    document.getElementById(totalId).innerHTML =
    `الإجمالي : ${list.length}`;


    const working =
    list.filter(v => v.status === "working").length;

    const stopped =
    list.filter(v => v.status === "stopped").length;


    document.getElementById(workingId).innerHTML =
    `تعمل : ${working}`;

    document.getElementById(stoppedId).innerHTML =
    `متوقفة : ${stopped}`;


    list.forEach(vehicle => {

        const card =
        document.createElement("div");

        card.className = "vehicle-card";


        card.innerHTML =

        `
        <div class="vehicle-number">
            ${vehicle.number}
        </div>

        <div class="vehicle-driver">
            ${vehicle.driver}
        </div>

        <div class="vehicle-status ${vehicle.status === "working"
        ? "status-working"
        : "status-stopped"}">

            ${vehicle.status === "working"
            ? "تعمل"
            : "متوقفة"}

        </div>

        <div>
            ${vehicle.reason}
        </div>

        <div class="vehicle-time">
            ${vehicle.lastUpdate}
        </div>
        `;


        container.appendChild(card);

    });

}
