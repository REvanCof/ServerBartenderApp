//Make sure the in-times and out-times are being set correctly using moment, taken from the sliders that Mills will implement

//lastShiftDate
//firstShiftDate
//numDays (difference between lastShiftDate and firstShiftDate)

///////////////////////////////////////
//GOING THROUGH SHIFTS FOR THIS USER...
///////////////////////////////////////

$.post("/financialSummary").done(function(data) {

    //Initiate Slider
    var slider = document.getElementById('dateSlider');
    noUiSlider.create(slider, {
        start: [0, data.length - 1],
        connect: true,
        behaviour: 'drag',
        step: 1,
        range: {
            'min': 0,
            'max': data.length - 1
        },
        format: wNumb({
            decimals: 0
        })
    });


    //This array will hold one financial summary for each job
    var finishedSummaries = [];

    //This array is used to store all jobIds for a user
    var jobIDArray = [];

    for (var i = 0; i < data.length; i++) {
        if (!jobIDArray.includes(data[i].JobId)) {
            jobIDArray.push(data[i].JobId);
        }
    }

    var shifts = [];

    //Fill the shifts array with all shifts
    for (var i = 0; i < data.length; i++) {
        shifts.push(data[i]);
    }

    //For each unique job ID...
    for (var k = 0; k < jobIDArray.length; k++) {

        //Variables to fill after pulling from the database
        var hourlyWage = 0;
        var totalWalkedWith = 0;
        var totalHoursWorked = 0;
        var totalBWL = 0;
        var totalPPA = 0;
        var totalSales = 0;
        var totalTipout = 0;
        var totalTipPercent = 0;

        //Get these two from the span-of-dates sliders set before running the financial summary
        var firstShiftDate;
        var lastShiftDate;

        //Counter variables
        var countShifts = 0;
        var countBWL = 0;
        var countPPA = 0;
        var countSales = 0;
        var countTipout = 0;
        var countTipPercent = 0;
        var countStiffed = 0;

        //Target variables to be calculated while going through shifts
        var bestTip = 0;
        var worstTip = 99999;
        var longestShift = 0;
        var shortestShift = 99999;
        var mostWalkedWithShift = 0;
        var leastWalkedWithShift = 99999;

        //For each shift in the shifts array...
        for (var i = 0; i < shifts.length; i++) {
            //If the job ID matches, 
            if (shifts[i].JobId === jobIDArray[k]) {
                countShifts++;

                totalWalkedWith += shifts[i].totalWalkedWith;
                if (shifts[i].totalWalkedWith > mostWalkedWithShift) { mostWalkedWithShift = shifts[i].totalWalkedWith };
                if (shifts[i].totalWalkedWith < leastWalkedWithShift) { leastWalkedWithShift = shifts[i].totalWalkedWith };

                //If out-time > in-time (i.e., if shift ended before midnight)
                if (convertTimeToInt(shifts[i].timeOut) > convertTimeToInt(shifts[i].timeIn)) {
                    totalHoursWorked += (convertTimeToInt(shifts[i].timeOut) - convertTimeToInt(shifts[i].timeIn));
                    if ((convertTimeToInt(shifts[i].timeOut) - convertTimeToInt(shifts[i].timeIn)) > longestShift) { longestShift = (convertTimeToInt(shifts[i].timeOut) - convertTimeToInt(shifts[i].timeIn)) };
                    if ((convertTimeToInt(shifts[i].timeOut) - convertTimeToInt(shifts[i].timeIn)) < shortestShift) { shortestShift = (convertTimeToInt(shifts[i].timeOut) - convertTimeToInt(shifts[i].timeIn)) };
                }

                //If out-time < in-time (i.e., if shift ended after midnight)
                else if (convertTimeToInt(shifts[i].timeOut) < convertTimeToInt(shifts[i].timeIn)) {
                    totalHoursWorked += ((1425 - convertTimeToInt(shifts[i].timeIn)) + convertTimeToInt(shifts[i].timeOut));
                    if (((1425 - convertTimeToInt(shifts[i].timeIn)) + convertTimeToInt(shifts[i].timeOut)) > longestShift) { longestShift = ((1425 - convertTimeToInt(shifts[i].timeIn)) + convertTimeToInt(shifts[i].timeOut)) };
                    if (((1425 - convertTimeToInt(shifts[i].timeIn)) + convertTimeToInt(shifts[i].timeOut)) < shortestShift) { shortestShift = ((1425 - convertTimeToInt(shifts[i].timeIn)) + convertTimeToInt(shifts[i].timeOut)) };
                }

                if (shifts[i].largestTip > bestTip) { bestTip = shifts[i].largestTip };
                if (shifts[i].smallestTip < worstTip) { worstTip = shifts[i].smallestTip };

                if (shifts[i].stiffed > 0) { countStiffed += shifts[i].stiffed };

                if (shifts[i].bwl != "NULL") {
                    totalBWL += shifts[i].bwl;
                    countBWL++;
                }

                if (shifts[i].ppa != "NULL") {
                    totalPPA += shifts[i].ppa;
                    countPPA++;
                }

                if (shifts[i].sales != "NULL") {
                    totalSales += shifts[i].sales;
                    countSales++;
                }

                if (shifts[i].tipout != "NULL") {
                    totalTipout += shifts[i].tipout;
                    countTipout++;
                }

                if (shifts[i].tipPercent != "NULL") {
                    totalTipPercent += shifts[i].tipPercent;
                    countTipPercent++;
                }

                hourlyWage = shifts[i].wage;
            }
        }

        ///////////////////////////////////////
        //PREPARE FINANCIAL SUMMARY VARIABLES
        ///////////////////////////////////////

        //This currently holds the number of minutes worked.  Correcting that here.
        totalHoursWorked = totalHoursWorked / 60;

        var numDays = lastShiftDate - firstShiftDate; //Use moment for this
        var totalEarnedBeforeTaxes = totalWalkedWith + (totalHoursWorked * hourlyWage);
        var avgHourlyWalkedWith = totalWalkedWith / totalHoursWorked;
        var avgHourlyTotal = avgHourlyWalkedWith + hourlyWage;
        var avgShiftLength = totalHoursWorked / countShifts;
        var avgShiftsPerWeek = countShifts / (numDays / 7);
        var avgShiftsPerMonth = countShifts / (numDays / 30.4375);
        var avgHoursPerWeek = totalHoursWorked / (numDays / 7);
        var avgTipout = totalTipout / countTipout;
        var avgTipPercent = totalTipPercent / countTipPercent;
        var avgBWL = totalBWL / countBWL;
        var avgPPA = totalPPA / countPPA;
        var avgSales = totalSales / countSales;

        ///////////////////////////////////////
        //DISPLAY FINANCIAL SUMMARY DATA
        ///////////////////////////////////////

        // console.log("<br>********************************");
        // console.log("<br>Job " + k);
        // console.log("$" + totalWalkedWith.toFixed(2)); //This will be an average of dates shown.
        // $(".totalEarnedVal").text("$" + totalEarnedBeforeTaxes.toFixed(2));
        // $("#hourlyVal").append("$" + avgHourlyWalkedWith.toFixed(2));
        // console.log("<br>Average hourly total earned (before taxes) = $" + avgHourlyTotal.toFixed(2));
        // console.log("<br>Average shift length = " + avgShiftLength.toFixed(2) + " hours");
        // console.log("<br>Average number of shifts per week = " + avgShiftsPerWeek.toFixed(2));
        // console.log("<br>Average number of shifts per month = " + avgShiftsPerMonth.toFixed(2));
        // console.log("<br>Average number of hours per week = " + avgHoursPerWeek.toFixed(2));
        // $(".tipOutVal").text("Average $" + avgTipout.toFixed(2));
        // $(".tipPercentVal").text("Average " + avgTipPercent.toFixed(2) + "%");
        // $(".bwlVal").text("Average " + avgBWL.toFixed(2) + "%");
        // $(".ppaVal").text("Average $" + avgPPA.toFixed(2));
        // $(".salesVal").text("Average $" + avgSales.toFixed(2));
        // $(".largestTipVal").text("$" + bestTip.toFixed(2));
        // $(".smallestTipVal").text("$" + worstTip.toFixed(2));
        // $(".stiffedVal").text("Number of times = " + countStiffed);
        // console.log("<br>Longest shift = " + longestShift + " minutes");
        // console.log("<br>Shortest shift = " + shortestShift + " minutes");
        // $(".highestWalkedVal").text("$" + mostWalkedWithShift.toFixed(2));
        // $(".lowestWalkedVal").text("$" + leastWalkedWithShift.toFixed(2));
        // console.log("<br>********************************")
        // console.log("<br>Span of days between first and last shift = " + numDays);
        // console.log("<br>Number of BWL entries = " + countBWL);
        // console.log("<br>Number of PPA entries = " + countPPA);
        // console.log("<br>Number of Sales entries= " + countSales);
        // console.log("<br>Number of Tipout entries = " + countTipout);
        // console.log("<br>Number of Tip percent entries = " + countTipPercent);

        //MAKE THE OBJECT HERE FOR JOBIDARRAY[k]
        var summaryObj = {
            totalWalkedWith: totalWalkedWith.toFixed(2),
            totalEarnedBeforeTaxes: totalEarnedBeforeTaxes.toFixed(2),
            totalHoursWorked: totalHoursWorked.toFixed(2),
            totalEarnedBeforeTaxes: totalEarnedBeforeTaxes,
            avgHourlyWalkedWith: avgHourlyWalkedWith,
            avgHourlyTotal: avgHourlyTotal,
            avgShiftLength: avgShiftLength,
            avgShiftsPerWeek: avgShiftsPerWeek,
            avgShiftsPerMonth: avgShiftsPerMonth,
            avgHoursPerWeek: avgHoursPerWeek,
            avgTipout: avgTipout,
            avgTipPercent: avgTipPercent,
            avgBWL: avgBWL,
            avgPPA: avgPPA,
            avgSales: avgSales,
            bestTip: bestTip,
            worstTip: worstTip,
            longestShift: longestShift,
            shortestShift: shortestShift,
            mostWalkedWithShift: mostWalkedWithShift,
            leastWalkedWithShift: leastWalkedWithShift,
            hourlyWage: hourlyWage,
            totalBWL: totalBWL,
            totalPPA: totalPPA,
            totalSales: totalSales,
            totalTipout: totalTipout,
            totalTipPercent: totalTipPercent,
            countBWL: countBWL,
            countPPA: countPPA,
            countSales: countSales,
            countTipout: countTipout,
            countTipPercent: countTipPercent,
            countShifts: countShifts,
            countStiffed: countStiffed,
            numDays: numDays
        }

        //In the end, you should have an array which contains a unique object for each job, holding the financial summary results for that job
        finishedSummaries.push(summaryObj)
    }

    // //Logs contents of finishedSummaries[]
    // for (var i = 0; i<finishedSummaries.length; i++) {
    //     console.log(finishedSummaries[i]);
    // }

    //Chart Stuff

    //First have to format the date into what amCharts wants.
    for (var i = 0; i < data.length; i++) {
        data[i].shiftDate = AmCharts.stringToDate(data[i].shiftDate, "YYYY-MM-DD")
    }

    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "light",
        "dataDateFormat": "YYYY-MM-DD",
         "responsive": {
        "enabled": true
        },
        "addClassNames" :true,
        "precision": 2,
        "valueAxes": [{
            "id": "v1",
            "position": "left",
            "autoGridCount": true
        }],
        "graphs": [{
            "id": "totalWalkedWith",
            "classNameField": "totalWalkedWith",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 1,
            "lineColor": "#20acd4",
            "type": "smoothedLine",
            "title": "Total Walked With",
            "useLineColorForBulletBorder": true,
            "valueField": "totalWalkedWith",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        },
        {
            "id": "tipout",
            "classNameField": "tipout",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "red",
            "type": "smoothedLine",
            "title": "Tip Out",
            "useLineColorForBulletBorder": true,
            "valueField": "tipout",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        },
        {
            "id": "bwl",
            "classNameField": "bwl",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "red",
            "type": "smoothedLine",
            "title": "BWL",
            "useLineColorForBulletBorder": true,
            "valueField": "bwl",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        },
        {
            "id": "largestTip",
            "classNameField": "largestTip",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "red",
            "type": "smoothedLine",
            "title": "Largest Tip",
            "useLineColorForBulletBorder": true,
            "valueField": "largestTip",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        },
        {
            "id": "ppa",
            "classNameField": "ppa",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "red",
            "type": "smoothedLine",
            "title": "PPA",
            "useLineColorForBulletBorder": true,
            "valueField": "ppa",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        },
        {
            "id": "sales",
            "classNameField": "sales",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "red",
            "type": "smoothedLine",
            "title": "Sales",
            "useLineColorForBulletBorder": true,
            "valueField": "sales",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        },
        {
            "id": "stiffed",
            "classNameField": "stiffed",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "red",
            "type": "smoothedLine",
            "title": "Stiffed",
            "useLineColorForBulletBorder": true,
            "valueField": "stiffed",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        },
        {
            "id": "tipPercent",
            "classNameField": "tipPercent",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "red",
            "type": "smoothedLine",
            "title": "Tip Percent",
            "useLineColorForBulletBorder": true,
            "valueField": "tipPercent",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        },
        {
            "id": "smallestTip",
            "classNameField": "smallestTip",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "red",
            "type": "smoothedLine",
            "title": "Smallest Tip",
            "useLineColorForBulletBorder": true,
            "valueField": "smallestTip",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        }],
        "categoryField": "shiftDate",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": false
        },
        "dataProvider": data.reverse()
    });

    //Date slider actions section.
    slider.noUiSlider.on('update', function() {
        var startDate = slider.noUiSlider.get()[0]
        var endDate = slider.noUiSlider.get()[1]

        chart.zoomToIndexes(startDate, endDate)

        var startDateFormat = moment(data[startDate].shiftDate).format('MMM DD YYYY')
        var endDateFormat = moment(data[endDate].shiftDate).format('MMM DD YYYY')

        $('.date1').text(startDateFormat)
        $('.date2').text(endDateFormat)
    })

    //Sets initial visible state of graphs, leaving only first one on.
    AmCharts.ready(function() {
        for ( var i = 1; i < chart.graphs.length; i++ ){
            chart.hideGraph(chart.graphs[i]);
        }
    })

    //Toggles the viewable graphs.
    $('.lever').on('click', function(){
        var target = $(this).attr("data")
        var graphed = $(this).attr("graphed")
        var toggle = $(this)

         for( var i = 0; i < chart.graphs.length; i++ ) {
            if (target === chart.graphs[i].id && graphed === 'true') {
                chart.hideGraph(chart.graphs[i])
                toggle.attr("graphed", 'false')
            } else if (target === chart.graphs[i].id && graphed === 'false') {
                chart.showGraph(chart.graphs[i])
                toggle.attr("graphed", 'true')
            }
        }
    })

});

$('.amcharts-chart-div').find('a').addClass('superHide')

///////////////////////////////////////
//HELPER FUNCTIONS
///////////////////////////////////////

function convertTimeToInt(time) {
    //The next few lines are used to convert a "HH:MM:SS" value to a 0-1425 int
    var array1 = ["00:00:00", "00:15:00", "00:30:00", "00:45:00", "01:00:00", "01:15:00", "01:30:00", "01:45:00", "02:00:00", "02:15:00", "02:30:00", "02:45:00", "03:00:00", "03:15:00", "03:30:00", "03:45:00", "04:00:00", "04:15:00", "04:30:00", "04:45:00", "05:00:00", "05:15:00", "05:30:00", "05:45:00", "06:00:00", "06:15:00", "06:30:00", "06:45:00", "07:00:00", "07:15:00", "07:30:00", "07:45:00", "08:00:00", "08:15:00", "08:30:00", "08:45:00", "09:00:00", "09:15:00", "09:30:00", "09:45:00", "10:00:00", "10:15:00", "10:30:00", "10:45:00", "11:00:00", "11:15:00", "11:30:00", "11:45:00", "12:00:00", "12:15:00", "12:30:00", "12:45:00", "13:00:00", "13:15:00", "13:30:00", "13:45:00", "14:00:00", "14:15:00", "14:30:00", "14:45:00", "15:00:00", "15:15:00", "15:30:00", "15:45:00", "16:00:00", "16:15:00", "16:30:00", "16:45:00", "17:00:00", "17:15:00", "17:30:00", "17:45:00", "18:00:00", "18:15:00", "18:30:00", "18:45:00", "19:00:00", "19:15:00", "19:30:00", "19:45:00", "20:00:00", "20:15:00", "20:30:00", "20:45:00", "21:00:00", "21:15:00", "21:30:00", "21:45:00", "22:00:00", "22:15:00", "22:30:00", "22:45:00", "23:00:00", "23:15:00", "23:30:00", "23:45:00"];
    var array2 = ["0", "15", "30", "45", "60", "75", "90", "105", "120", "135", "150", "165", "180", "195", "210", "225", "240", "255", "270", "285", "300", "315", "330", "345", "360", "375", "390", "405", "420", "435", "450", "465", "480", "495", "510", "525", "540", "555", "570", "585", "600", "615", "630", "645", "660", "675", "690", "705", "720", "735", "750", "765", "780", "795", "810", "825", "840", "855", "870", "885", "900", "915", "930", "945", "960", "975", "990", "1005", "1020", "1035", "1050", "1065", "1080", "1095", "1110", "1125", "1140", "1155", "1170", "1185", "1200", "1215", "1230", "1245", "1260", "1275", "1290", "1305", "1320", "1335", "1350", "1365", "1380", "1395", "1410", "1425"];

    for (var i = 0; i < array1.length; i++) {
        if (time === array1[i]) {
            return array2[i];
        }
    }
}


