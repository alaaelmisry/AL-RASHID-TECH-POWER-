/************************************************
                ATP FLEET MANAGEMENT
************************************************/


/*===============================================
                    الإعدادات
================================================*/

const PASSWORD = "1234";



/*===============================================
                عرض التاريخ والوقت
================================================*/

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

    document.getElementById("todayName").textContent =
        days[now.getDay()];

    document.getElementById("todayDate").textContent =
        now.toLocaleDateString("en-GB");

    document.getElementById("todayTime").textContent =
        now.toLocaleTimeString("ar-SA");

}


setInterval(updateDateTime, 1000);
updateDateTime();



/*===============================================
                التنقل بين الصفحات
================================================*/

function showRegisterPage() {

    document.getElementById("homePage").style.display = "none";

    document.getElementById("registerPage").style.display = "block";

}


function checkPassword() {

    const enteredPassword = prompt(
        "أدخل كلمة المرور"
    );

    if (enteredPassword === PASSWORD) {

        document.getElementById("homePage").style.display = "none";

        document.getElementById("viewPage").style.display = "block";

        renderVehicles();

    }

    else {

        alert("كلمة المرور غير صحيحة");

    }

}


function goHome() {

    document.getElementById("homePage").style.display = "block";

    document.getElementById("registerPage").style.display = "none";

    document.getElementById("viewPage").style.display = "none";

}



/*===============================================
            تعبئة أرقام المركبات
================================================*/

const vehicleType =
document.getElementById("vehicleType");


const vehicleNumber =
document.getElementById("vehicleNumber");


const driverName =
document.getElementById("driverName");



vehicleType.addEventListener("change", () => {

    vehicleNumber.innerHTML =
    "<option value=''>اختر</option>";

    driverName.textContent = "---";


    const selectedType =
    vehicleType.value;


    const filteredVehicles =
    vehicles.filter(vehicle =>
    vehicle.type === selectedType);


    filteredVehicles.forEach(vehicle => {

        vehicleNumber.innerHTML +=
        `<option value="${vehicle.id}">
            ${vehicle.number}
        </option>`;

    });

});




/*===============================================
                عرض اسم السائق
================================================*/

vehicleNumber.addEventListener("change", () => {

    const vehicleId =
    Number(vehicleNumber.value);


    const selectedVehicle =
    vehicles.find(vehicle =>
    vehicle.id === vehicleId);


    if (selectedVehicle) {

        driverName.textContent =
        selectedVehicle.driver;

    }

});



/*===============================================
                سبب التوقف
================================================*/

const working =
document.getElementById("working");

const stopped =
document.getElementById("stopped");

const reasonCard =
document.getElementById("reasonCard");


working.addEventListener("click", () => {

    working.classList.add("active");
    stopped.classList.remove("stop-active");

    reasonCard.style.display = "none";

});


stopped.addEventListener("click", () => {

    stopped.classList.add("stop-active");
    working.classList.remove("active");

    reasonCard.style.display = "block";

});
/*===============================================
            حفظ حالة المركبة وتحديث البيانات
================================================*/

function saveAndSendReport() {

    const vehicleId = Number(vehicleNumber.value);

    if (!vehicleId) {

        alert("يرجى اختيار رقم المركبة");
        return;

    }

    const selectedVehicle =
    vehicles.find(vehicle => vehicle.id === vehicleId);


    if (!selectedVehicle) return;


    /* حالة المركبة */

  if (working.classList.contains("active")) {

    selectedVehicle.status = "working";
    selectedVehicle.reason = "";

} else {

    selectedVehicle.status = "stopped";

    selectedVehicle.reason =
    document.getElementById("stopReason").value.trim();

}


    /* اسم السائق */

    const otherDriver =
    document.getElementById("otherDriverName")
    .value.trim();

    if (otherDriver !== "") {

        selectedVehicle.driver = otherDriver;

    }


    /* الملاحظات */

    selectedVehicle.notes =
    document.getElementById("vehicleNotes")
    .value.trim();


    /* وقت آخر تحديث */

    selectedVehicle.lastUpdate =
    new Date().toLocaleString("ar-SA");


    alert("تم حفظ البيانات بنجاح");


    /* تحديث صفحة العرض */

    renderVehicles();


    /* إعادة ضبط الحقول */

    document.getElementById("otherDriverName").value = "";

    document.getElementById("vehicleNotes").value = "";

    document.getElementById("stopReason").value = "";

    working.checked = true;

    reasonCard.style.display = "none";

}



/*===============================================
                حساب الإحصائيات
================================================*/

function updateStatistics() {

    updateSectionStatistics(
        "PRIVATE",
        "private"
    );

    updateSectionStatistics(
        "TRUCKS",
        "trucks"
    );

    updateSectionStatistics(
        "EQUIPMENT",
        "equipment"
    );

}


function updateSectionStatistics(type, prefix) {

    const sectionVehicles =
    vehicles.filter(vehicle =>
    vehicle.type === type);


    const total =
    sectionVehicles.length;


    const workingCount =
    sectionVehicles.filter(vehicle =>
    vehicle.status === "working").length;


    const stoppedCount =
    sectionVehicles.filter(vehicle =>
    vehicle.status === "stopped").length;


    document.getElementById(
        prefix + "Total"
    ).textContent = total;


    document.getElementById(
        prefix + "Working"
    ).textContent = workingCount;


    document.getElementById(
        prefix + "Stopped"
    ).textContent = stoppedCount;

}

/*===============================================
            إنشاء بطاقات المركبات
================================================*/

function renderVehicles() {

    renderSection(
        "PRIVATE",
        "privateSection"
    );

    renderSection(
        "TRUCKS",
        "trucksSection"
    );

    renderSection(
        "EQUIPMENT",
        "equipmentSection"
    );

    updateStatistics();

}



function renderSection(type, sectionId) {

    const section =
    document.getElementById(sectionId);

    section.innerHTML = "";


    const sectionVehicles =
    vehicles.filter(vehicle =>
    vehicle.type === type);


    sectionVehicles.forEach(vehicle => {

        const statusClass =

        vehicle.status === "working"
        ? "status-working"
        : "status-stopped";


        section.innerHTML += `

        <div class="vehicle-card">

            <div class="vehicle-status-dot ${statusClass}">
            </div>

            <div class="vehicle-number">
                ${vehicle.number}
            </div>

            <div class="vehicle-driver">
                ${vehicle.driver}
            </div>

            <div class="vehicle-notes">
                ${vehicle.notes || "-"}
            </div>

        </div>

        `;

    });

}



/*===============================================
            إظهار وإخفاء الأقسام
================================================*/

function toggleSection(sectionId) {

    const section =
    document.getElementById(sectionId);


    if (section.style.display === "none") {

        section.style.display = "block";

    }

    else {

        section.style.display = "none";

    }

}



/*===============================================
                تحميل الصفحة
================================================*/

window.onload = function () {

    renderVehicles();

};



/*===============================================
                نهاية الملف
================================================*/
