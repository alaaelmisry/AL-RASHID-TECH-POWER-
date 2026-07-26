/************************************************
 ATP FLEET MANAGEMENT
 script.js
 Google Sheets Version
************************************************/


//========================================
// رابط Google Apps Script
//========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbwphyiajZI8PDSUUV1-f_GxSZw36WevMF5Vn3o-QaSuA-zC1LvIuSdh2X0CkbZAlT9NlQ/exec";



// تخزين بيانات المركبات مؤقتاً
let vehicles = [];



//========================================
// تحميل البيانات من Google Sheets
//========================================

async function loadVehicles(){

    try{

        const response =
        await fetch(API_URL);


        vehicles =
        await response.json();


        console.log("Vehicles Loaded", vehicles);


        fillVehicleNumbers();


        renderVehicles();


    }

    catch(error){

        console.log(error);

        alert("تعذر الاتصال بقاعدة البيانات");

    }

}



// تحميل البيانات عند بداية التشغيل

loadVehicles();



// تحديث البيانات كل 30 ثانية

setInterval(loadVehicles,30000);





//========================================
// التاريخ والوقت
//========================================

function updateDateTime(){


    const now =
    new Date();


    const days = [

        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"

    ];


    document.getElementById("todayName")
    .innerHTML =
    days[now.getDay()];


    document.getElementById("todayDate")
    .innerHTML =
    now.toLocaleDateString("ar-SA");


    document.getElementById("todayTime")
    .innerHTML =
    now.toLocaleTimeString("ar-SA");


}


setInterval(updateDateTime,1000);

updateDateTime();





//========================================
// الانتقال بين الصفحات
//========================================


function hideAllPages(){

    document.getElementById("homePage")
    .style.display="none";


    document.getElementById("registerPage")
    .style.display="none";


    document.getElementById("viewPage")
    .style.display="none";

}



function showRegisterPage(){

    hideAllPages();


    document.getElementById("registerPage")
    .style.display="block";

}



function goHome(){

    hideAllPages();


    document.getElementById("homePage")
    .style.display="block";

}




//========================================
// حماية صفحة العرض
//========================================


function checkPassword(){


    let password =
    prompt("أدخل الرقم السري");


    if(password==="16896"){


        hideAllPages();


        document.getElementById("viewPage")
        .style.display="block";


        renderVehicles();


    }

    else{


        alert("الرقم السري غير صحيح");


    }


}






//========================================
// تعبئة أرقام المركبات
//========================================


function fillVehicleNumbers(){


    const type =
    document.getElementById("vehicleType");


    const number =
    document.getElementById("vehicleNumber");



    if(!type || !number)
    return;



    type.onchange=function(){


        number.innerHTML =
        '<option value="">اختر</option>';



        vehicles

        .filter(v=>v.type===type.value)

        .forEach(v=>{


            let option =
            document.createElement("option");


            option.value =
            v.number;


            option.textContent =
            v.number;


            number.appendChild(option);



        });



    };





    number.onchange=function(){


        let vehicle =
        vehicles.find(
        v=>v.number===this.value
        );



        if(vehicle){


            document.getElementById("driverName")
            .innerHTML =
            vehicle.driver;



        }



    };



}
//========================================
// إظهار سبب التوقف
//========================================


document.getElementById("stopped")
.addEventListener("change",function(){


    document.getElementById("reasonCard")
    .style.display="flex";


});



document.getElementById("working")
.addEventListener("change",function(){


    document.getElementById("reasonCard")
    .style.display="none";


});





//========================================
// حفظ وإرسال التقرير
//========================================


async function saveAndSendReport(){


    const number =
    document.getElementById("vehicleNumber").value;



    const vehicle =
    vehicles.find(
    v=>v.number===number
    );



    if(!vehicle){

        alert("يرجى اختيار المركبة");

        return;

    }




    const alternativeDriver =
    document.getElementById("otherDriverName")
    .value.trim();




    const usedDriver =
    alternativeDriver !== ""
    ?
    alternativeDriver
    :
    vehicle.driver;




    const status =
    document.getElementById("working").checked
    ?
    "working"
    :
    "stopped";




    const reason =
    document.getElementById("stopReason")
    .value;



    const notes =
    document.getElementById("vehicleNotes")
    .value.trim()
    ||
    "لا توجد ملاحظات";



    const now =
    new Date();



    const lastUpdate =

    now.toLocaleDateString("ar-SA")
    +
    " - "
    +
    now.toLocaleTimeString("ar-SA");





    // تحديث البيانات في Google Sheets

    const updateData = {


        id:vehicle.id,

        status:status,

        reason:reason,

        notes:notes,

        lastUpdate:lastUpdate


    };





    try{


        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify(updateData)

        });



        alert("تم حفظ البيانات بنجاح");


        sendWhatsAppReport(
            vehicle,
            usedDriver,
            status,
            reason,
            notes,
            lastUpdate
        );



        loadVehicles();



    }


    catch(error){


        console.log(error);


        alert("حدث خطأ أثناء الحفظ");


    }



}







//========================================
// إرسال واتساب
//========================================


function sendWhatsAppReport(
vehicle,
driver,
status,
reason,
notes,
lastUpdate
){



let message =

`ATP FLEET MANAGEMENT

شركة الراشد للتقنية والطاقة

رقم المركبة : ${vehicle.number}

نوع المركبة : ${vehicle.type}

السائق المستخدم اليوم : ${driver}

حالة المركبة : ${
status==="working"
?
"تعمل"
:
"متوقفة"
}

سبب التوقف : ${reason || "لا يوجد"}

الملاحظات : ${notes}

آخر تحديث : ${lastUpdate}`;



const phone =
"966509495516";



const url =

"https://wa.me/"
+
phone
+
"?text="
+
encodeURIComponent(message);



window.open(url,"_blank");



}







//========================================
// عرض المركبات
//========================================


function renderVehicles(){



renderSection(
"PRIVATE",
"privateSection",
"privateTotal",
"privateWorking",
"privateStopped"
);



renderSection(
"TRUCKS",
"trucksSection",
"trucksTotal",
"trucksWorking",
"trucksStopped"
);



renderSection(
"EQUIPMENT",
"equipmentSection",
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
){



const container =
document.getElementById(containerId);



if(!container)
return;



container.innerHTML="";



const list =
vehicles.filter(
v=>v.type===type
);




document.getElementById(totalId)
.innerHTML=list.length;



document.getElementById(workingId)
.innerHTML=list.filter(
v=>v.status==="working"
).length;



document.getElementById(stoppedId)
.innerHTML=list.filter(
v=>v.status==="stopped"
).length;





list.forEach(vehicle=>{



let card =
document.createElement("div");



card.className =
"vehicle-card";




let statusClass =
vehicle.status==="working"
?
"status-working"
:
"status-stopped";





card.innerHTML =

`

<div class="vehicle-status-dot ${statusClass}">
</div>


<div class="vehicle-number">

${vehicle.number}

</div>



<div class="vehicle-driver">

${vehicle.driver}

</div>



<div class="vehicle-notes">

${vehicle.notes || "لا توجد ملاحظات"}

</div>

`;



container.appendChild(card);



});



}






//========================================
// فتح وإغلاق الأقسام
//========================================


function toggleSection(id){


const section =
document.getElementById(id);



if(section.style.display==="none"){

    section.style.display="block";

}

else{

    section.style.display="none";

}



}
