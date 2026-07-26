document.addEventListener("DOMContentLoaded", function () {

    console.log("script.js يعمل بنجاح");


    window.showRegisterPage = function(){

        document.getElementById("homePage").style.display = "none";

        document.getElementById("registerPage").style.display = "block";

    };


    window.goHome = function(){

        document.getElementById("registerPage").style.display = "none";

        document.getElementById("viewPage").style.display = "none";

        document.getElementById("homePage").style.display = "block";

    };


    window.showViewPage = function(){

        let password = prompt("أدخل الرقم السري");

        if(password === "16896"){

            document.getElementById("homePage").style.display = "none";

            document.getElementById("viewPage").style.display = "block";

        }

        else{

            alert("الرقم السري غير صحيح");

        }

    };


});
