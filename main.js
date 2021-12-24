let latInput= document.querySelector("#lat");
let lngInput= document.querySelector("#lng");
let monthInput= document.querySelector("#month");
let yearInput= document.querySelector("#year");
let PrayerBtn=document.querySelector("#get-btn");
let TableBody= document.querySelector("#table-b");
let myTable= document.querySelector("#table");
let myInputs= document.querySelector("#inputs");
let heading= document.querySelector("#h4");
let backBtn= document.querySelector("#back");

PrayerBtn.addEventListener("click", function(){
    GetPrayerTime(latInput.value, lngInput.value, monthInput.options[monthInput.selectedIndex].getAttribute("month"), yearInput.options[yearInput.selectedIndex].text);
    latInput.value="";
    lngInput.value="";
    monthInput.value="Month";
    yearInput.value="Year";
});
backBtn.addEventListener("click", function(){
    myTable.classList.add("d-none");
    myInputs.classList.remove("d-none");
});



function GetPrayerTime (lat, lng, month, year){
    let request= new XMLHttpRequest();
    request.onload=function(){
        if(request.status==404 || request.status==400){
            alert("Incorrect Data");
            return;
        }else{
            myTable.classList.remove("d-none");
            myInputs.classList.add("d-none");
            let prayerTime=JSON.parse(request.responseText);
            console.log(prayerTime);
    
            heading.innerText= prayerTime.data[0].date.gregorian.month.en+" "+prayerTime.data[0].date.gregorian.year;
            
            for(const prayerDay of prayerTime.data){
    
                let tableRow= document.createElement("tr");
                TableBody.append(tableRow);
    
                let day= document.createElement("th");
                day.innerText= prayerDay.date.gregorian.day;
                tableRow.append(day);
    
                let Fajr= document.createElement("td");
                var text=prayerDay.timings.Fajr.split(" ");
                Fajr.innerText=text[0];
                tableRow.append(Fajr);
    
                let Sunrise= document.createElement("td");
                var text=prayerDay.timings.Sunrise.split(" ");
                Sunrise.innerText=text[0];
                tableRow.append(Sunrise);
    
                let Dhuhr= document.createElement("td");
                var text=prayerDay.timings.Dhuhr.split(" ");
                Dhuhr.innerText=text[0];
                tableRow.append(Dhuhr);
    
                let Asr= document.createElement("td");
                var text=prayerDay.timings.Asr.split(" ");
                Asr.innerText=text[0];
                tableRow.append(Asr);
    
                let Maghrib= document.createElement("td");
                var text=prayerDay.timings.Maghrib.split(" ");
                Maghrib.innerText=text[0];
                tableRow.append(Maghrib);
    
                let Isha= document.createElement("td");
                var text=prayerDay.timings.Isha.split(" ");
                Isha.innerText=text[0];
                tableRow.append(Isha);
            }
        } 
    }
    request.open("get", "http://api.aladhan.com/v1/calendar?latitude="
    +lat+
    "&longitude="
    +lng+
    "&method=2&month="
    +month+
    "&year="
    +year);
    request.send();
}




