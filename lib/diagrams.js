/*
*diagrams.js
 */
var totalcount;
var highestbandwidth;
var lowestbandwidth;
var highestsignalstrength;
var lowestsignalstrength;
var edgecount;
var averageedge;
var averageedgesignal;
var gprscount;
var averagegprs;
var averagegprssignal;
var umtscount;
var averageumts;
var averageumtssignal;
var hspacount;
var averagehspa;
var averagehspasignal;
var ltecount;
var averagelte;
var averageltesignal;
var unknowncount;
var averageunknown;
var averageunknownsignal;
var averagebandwidth;
var averagesignalstrength;


var calculateStatistics = function(){
    if(sortedFilesArray.length>0){
        highestbandwidth=0;
        lowestbandwidth=2000;
        highestsignalstrength=0;
        lowestsignalstrength=20;
        edgecount=0;
        gprscount=0;
        umtscount=0;
        hspacount=0;
        ltecount=0;
        unknowncount=0;
        averagebandwidth=0;
        averagesignalstrength=0;
        totalcount = 0;
        var totalbandwidth=0;
        var totalsignalstrength=0;
        var totaledge= 0;
        var totalgprs= 0;
        var totalumts= 0;
        var totalhspa= 0;
        var totallte= 0;
        var totalunknown= 0;
        var totaledgesignal= 0;
        var totalgprssignal= 0;
        var totalumtssignal= 0;
        var totalhspasignal= 0;
        var totalltesignal= 0;
        var totalunknownsignal= 0;
        for(var i=0; i <sortedFilesArray.length;i++){
            totalcount++;
            var bandwidth= sortedFilesArray[i]["bandwidth"]["value"];
            var signalstrength= Math.floor(sortedFilesArray[i]["signal"]);
            totalbandwidth+= +bandwidth;
            totalsignalstrength+= +signalstrength;
            switch (sortedFilesArray[i]["network"]) {
                case "GRPS":
                    gprscount++;
                    totalgprs+= +bandwidth;
                    totalgprssignal+= +signalstrength;
                    break;
                case "EDGE":
                    edgecount++;
                    totaledge += +bandwidth;
                    totaledgesignal +=+ signalstrength;
                    break;

                case "UMTS":
                    umtscount++;
                    totalumts += +bandwidth;
                    totalumtssignal +=+ signalstrength;
                    break;
                case "HSPA+":
                    hspacount++;
                    totalhspa += +bandwidth;
                    totalhspasignal +=+ signalstrength;
                    break;
                case "LTE":
                    ltecount++;
                    totallte += +bandwidth;
                    totalltesignal +=+ signalstrength;
                    break;
                default:
                    unknowncount++;
                    totalunknown += +bandwidth;
                    totalunknownsignal +=+ signalstrength;
                    break;
            }
            if (bandwidth>highestbandwidth) highestbandwidth= bandwidth;
            if (signalstrength>highestbandwidth) highestsignalstrength=signalstrength;
            if (bandwidth<lowestbandwidth) lowestbandwidth = bandwidth;
            if (signalstrength<lowestsignalstrength) lowestsignalstrength = signalstrength;
        }
        averagebandwidth = totalbandwidth/totalcount;
        averagesignalstrength = totalsignalstrength/totalcount;
        averageedge = totaledge / edgecount;
        if(totaledge == 0) averageedge = 0;
        averagegprs = totalgprs / gprscount;
        if(totalgprs == 0) averagegprs = 0;
        averageumts = totalumts / umtscount;
        if(totalumts == 0) averageumts = 0;
        averagehspa = totalhspa / hspacount;
        if(totalhspa == 0) averagehspa = 0;
        averagelte = totallte / ltecount;
        if(totallte == 0) averagelte = 0;
        averageunknown = totalunknown / unknowncount;
        if(totalunknown == 0) averageunknown = 0;
        averageedgesignal = totaledgesignal / edgecount;
        if(totaledgesignal == 0) averageedgesignal = 0;
        averagegprssignal = totalgprssignal / gprscount;
        if(totalgprssignal == 0) averagegprssignal = 0;
        averageumtssignal = totalumtssignal / umtscount;
        if(totalumtssignal == 0) averageumtssignal = 0;
        averagehspasignal = totalhspasignal / hspacount;
        if(totalhspasignal == 0) averagehspasignal = 0;
        averageltesignal = totalltesignal / ltecount;
        if(totalltesignal == 0) averageltesignal = 0;
        averageunknownsignal = totalunknownsignal / unknowncount;
        if(totalunknownsignal == 0) averageunknownsignal = 0;
    }
}

var drawStatistics= function(){
    if(sortedFilesArray.length>0) {
        var text = "<p>";
        text += '<h2>Statistiken</h2><br>';
        text += 'Anzahl Messpunkte: ' + totalcount + '<br>';
        text += 'Durchschnittliche Bandbreite: ' + averagebandwidth + '<br>';
        text += 'Durchschnittliche Signalstärke: ' + averagesignalstrength + '<br>';
        text += 'Anzahl EDGE: ' + edgecount + '<br>';
        text += 'Anzahl GPRS: ' + gprscount + '<br>';
        text += 'Anzahl UMTS: ' + umtscount + '<br>';
        text += 'Anzahl HSPA+: ' + hspacount + '<br>';
        text += 'Anzahl LTE: ' + ltecount + '<br>';
        text += 'Anzahl unbekanntes Netz: ' + unknowncount +'<br>';
        text += '</p>';
        
        $id("statistics").innerHTML=text;
    }
    else{
        $id("statistics").innerHTML="Keine Messpunkte vorhanden";
    }
}

var drawDiagrams = function(){
    var data = {
        labels: ['GPRS','EDGE','UMTS','HSPA+','LTE','Unknown'],
        series: [
            [averagegprs, averageedge,averageumts,averagehspa,averagelte,averageunknown]
        ]
    };

    var options = {
        high: 1300,
        low: 0,
        axisX: {
            labelInterpolationFnc: function(value, index) {
                return '<big><b>'+value+'</b></big>';
            }
        },
        axisY:{
            labelInterpolationFnc: function(value, index) {
                return'<big><b></b>'+value+ " Kbps" +'</b></big>';
            }
        }
    };
    var color = 0;
    new Chartist.Bar('#chart1', data, options).on('draw', function(data) {
        if(data.type === 'bar') {
            data.element.attr({
                style: 'stroke:'+getColor(color) +'; stroke-width:40px'
            });
            color++;
            if(color >= 6) color = 0;
        }
    });
    var data2 = {
        labels: ['GPRS','EDGE','UMTS','HSPA+','LTE','Unknown'],
        series: [
            [averagegprssignal, averageedgesignal,averageumtssignal,averagehspasignal,averageltesignal,averageunknownsignal]
        ]
    };

    var options2 = {
        high: 15,
        low: 0,
        axisX: {
            labelInterpolationFnc: function(value, index) {
                return '<big><b>'+value+'</b></big>';
            }
        },
        axisY:{
            labelInterpolationFnc: function(value, index) {
                return'<big><b></b>'+value+'</b></big>';
            }
        }
    };
    var color = 0;
    new Chartist.Bar('#chart2', data2, options2).on('draw', function(data) {
        if(data.type === 'bar') {
            data.element.attr({
                style: 'stroke:'+getColor(color)+'; stroke-width:40px'
            });
            color++;
            if(color >= 6) color = 0;
        }
    });
}

var getColor = function(number){
    var color='';
    switch(number){
        case 0: color='brown';
            break;
        case 1:color='red';
            break;
        case 2:color='yellow';
            break;
        case 3:color='orange';
            break;
        case 4:color='green';
            break;
        default:color='black';

            break;
    }
    return color;
}