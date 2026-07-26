/************************************************
 ATP FLEET MANAGEMENT
 script.js - المرحلة الأولى
************************************************/


document.addEventListener("DOMContentLoaded", function () {



    //========================================
    // التاريخ والوقت
    //========================================


    function updateDateTime(){

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


        const day =
        document.getElementById("todayName");


        const date =
        document.getElementById("todayDate");


        const time =
        document.getElementById("todayTime");



        if(day){

            day.innerHTML =
            days[now.getDay()];

        }


        if(date){

            date.innerHTML =
            now.toLocaleDateString("ar-SA");

        }


        if(time){

            time.innerHTML =
            now.toLocaleTimeString("ar-SA");

        }


    }


    updateDateTime();

    setInterval(updateDateTime,1000);





    //========================================
    // إخفاء جميع الصفحات
    //========================================


    function hideAllPages(){


        const pages = [

            "homePage",
            "registerPage",
            "viewPage"

        ];



        pages.forEach(function(id){


            const page =
            document.getElementById(id);



            if(page){

                page.style.display="none";

            }


        });



    }





    //========================================
    // صفحة التسجيل
    //========================================


    window.showRegisterPage = function(){


        hideAllPages();


        document.getElementById("registerPage")
        .style.display="block";


    };






    //========================================
    // صفحة العرض
    //========================================


    window.showViewPage = function(){


        let password =
        prompt("أدخل الرقم السري");


        if(password === "16896"){


            hideAllPages();


            document.getElementById("viewPage")
            .style.display="block";


        }

        else{


            alert("الرقم السري غير صحيح");


        }


    };






    //========================================
    // العودة للرئيسية
    //========================================


    window.goHome = function(){


        hideAllPages();


        document.getElementById("homePage")
        .style.display="block";


    };




});
