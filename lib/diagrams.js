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
var gprscount;
var averagegprs;
var umtscount;
var averageumts;
var hspacount;
var averagehspa;
var ltecount;
var averagelte;
var unknowncount;
var averageunknown;
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
        var totalcount = 0;
        var totalbandwidth=0;
        var totalsignalstrength=0;
        var totaledge= 0;
        var totalgprs= 0;
        var totalumts= 0;
        var totalhspa= 0;
        var totallte= 0;
        var totalunknown= 0;
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
                    break;
                case "EDGE":
                    edgecount++;
                    totaledge += +bandwidth;
                    break;

                case "UMTS":
                    umtscount++;
                    totalumts += +bandwidth;
                    break;
                case "HSPA+":
                    hspacount++;
                    totalhspa += +bandwidth;
                    break;
                case "LTE":
                    ltecount++;
                    totallte += +bandwidth;
                    break;
                default:
                    unknowncount++;
                    totalunknown += +bandwidth;
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
        averagegprs = totalgprs / gprscount;
        averageumts = totalumts / umtscount;
        averagehspa = totalhspa / hspacount;
        averagelte = totallte / ltecount;
        averageunknown = totalunknown / unknowncount;
    }
}

var drawStatistics= function(){
    if(sortedFilesArray.length>0) {
        var text = "<p>";
        text += '<h2>Statistiken</h2><br>';
        text += 'Anzahl Messpunkte: ' + totalcount + '<br>';
        text += 'Durchschnittliche Bandbreite:' + averagebandwidth + '<br>';
        text += 'Durchschnittliche Signalstärke' + averagesignalstrength + '<br>';
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
        labels: ['EDGE','HSPA+'],
        series: [
            [50,10]
        ]
    };
    var arr=[50,10];
    var max= 50;

    var options = {
        high: max,
        low: 0,
        axisX: {
            labelInterpolationFnc: function(value, index) {
                return index % 2 === 0 ? value : null;
            }
        }
    };

    new Chartist.Bar('.ct-chart', data, options);
}