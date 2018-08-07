auto();

events.observeNotification();
events.onToast(function (toast) {
    var text = toast.getText();
    var appName = toast.getPackageName();
    var subIdx = text.indexOf("后");

    if (appName == "com.eg.android.AlipayGphone" && subIdx != -1) {
        var sub = text.substring(0, subIdx);
        var idxHour = sub.indexOf("小时");
        var idxMin = sub.indexOf("分");
        var hour = 0;
        var min = 0;
        if (idxHour == -1) {
            var stringMin = sub.substring(0, idxMin);
            min = parseInt(stringMin)
        } else {
            var stringHour = sub.substring(0, idxHour);
            var stringMin = sub.substring(idxHour + 2, idxMin);
            hour = parseInt(stringHour)
            min = parseInt(stringMin)
        }
        var time = (hour*60+min)*60*1000;
        if(nextTime >time){
            nextTime = time;
        }
        log("NextTime="+hour+":"+min+" Microseconds="+nextTime+"ms");
    }

});
//setTimeout(function() {
//}, 1000*1);
// main();s
var end = false;
var nextTime = 900000000000;
main();

function main() {
    // home();
    // sleep(5000)
    //  swipe(540,1600,540,1000,350);
    // startToastListener();

    launchApp("支付宝");
    sleep(3000);
    click("蚂蚁森林");
    sleep(3000);
    collect();
    swipe(540, 1910, 540, 100, 500)
    swipe(540, 1910, 540, 100, 500)
    swipe(540, 1910, 540, 100, 500)
    click(672, 954); // 查看排行榜
    sleep(2000);
    swipe(540, 1800, 540, 1800 - 240, 500);
    sleep(500);
    toast("开始采集了");
    while (!end) {
        exec();
    }
}

function exec() {
    swipe(540, 1919, 540, 88, 500)
    col();
    swipe(540, 1734, 540, 1734 - 156, 500)
    click(540, 1918);
    sleep(2000);
    swipe(540, 1857, 540, 155, 500);
    sleep(1000);
    col();
}

function col() {
    // toast("Begin col")
    if (!requestScreenCapture()) {
        toast("没有截图权限");
        exit();
        end = true;
    }
    var img = captureScreen();
    // var p = findColor(img,"#30bf6c"); //
    for (var i = 187; i <= 1816; i = i + 200) {
        if (isEnd(img, i)) {
            back();
            sleep(1000);
            back();
            sleep(1000);
            back();
            sleep(1000);
            toast("完成任务啦！")
            end = true

        }
        var p = locColor(img, i);
        if (p) {
            log(i + " p.x=" + p.x + " p.y=" + p.y);
            click(1017, p.y + 20);
            sleep(3000);
            collect();
            back();
            sleep(1000);
        } else {
            log(i + " p=null");
        }
    }
}


function locColor(img, y) {
    var p = findColor(img, "#30bf6c", {
        region: [1017, y, 73, 100]
    });
    return p;
}

function isEnd(img, y) {
    var p = findColor(img, "#30bf6c", {
        region: [860, y, 10, 10]
    });
    //  toastLog("Got "+(img==null)+" "+y+" "+(p==null))
    if (p) {
        //  toastLog("Got "+(img==null)+" "+y)
        return true;
    } else {
//toastLog("Got "+(img==null)+" "+y)
        return false;
    }
}


function nextPage() {
    swipe(540, 1910, 540, 59, 5000)
}
function all(startHeight) {
    var eachHeight = 180;
    for (; startHeight < 1920; startHeight = eachHeight + startHeight) {
        toast(startHeight);
        click(540, startHeight);
        sleep(3000);
        collect();
        back();
        sleep(1000);
    }
}

function collect() {
    for (var y = 460; y <= 860; y += 100) {
        for (var x = 185; x <= 890; x += 100) {
            click(x, y);
        }
    }
}