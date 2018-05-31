var async = require('async');


var fun1 = function () {

    var ii = 0;
    setInterval(function () {
        console.log('aaa=' + new Date());
        ii++;
        if (ii == 3) {

            clearInterval(this);
        }
    }, 1000);
    console.log('fun1执行完毕');
}
var fun2 = function () {
    var ii = 0;
    setInterval(function () {
        console.log('bbb=' + new Date());
        ii++;
        if (ii == 3) {

            clearInterval(this);
        }
    }, 1000);
    console.log('fun2执行完毕');
}
// fun1();fun2();
function exec() {
    async.series({
        one: function (done) {
            var ii = 0;
            setInterval(function () {
                console.log('aaa=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    done(null, 'one执行完毕');
                }
            }, 1000);

        },
        two: function (done) {
            var ii = 0;
            setInterval(function () {
                console.log('bbb=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    done(null, 'two执行完毕');
                }
            }, 1000);

        }
    }, function (err, data) {
        if (!err) {
            console.log(data);
        } else {
            console.log(err);
        }
    })
}
//并行无关联
function exec1() {
    async.parallel({
        one: function (done) {
            var ii = 0;
            setInterval(function () {
                console.log('aaa=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    done("good game", 'one执行完毕');
                }
            }, 1000);

        },
        two: function (done) {
            var ii = 0;
            setInterval(function () {
                console.log('bbb=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    done(null, 'two执行完毕');
                }
            }, 1000);

        }
    }, function (err, data) {
        if (!err) {
            console.log(data);
        } else {
            console.log(err);
        }
    })
}
//串行有关联代码
function exec2() {
    async.waterfall([
        function (done) {
            var ii = 0;
            setInterval(function () {
                console.log('aaa=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    done(null, 'one执行完毕');
                }
            }, 1000);

        },
        function (prev,done) {
            var ii = 0;
            setInterval(function () {
                console.log(prev + '=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    done(null, 'two执行完毕');
                }
            }, 1000);

        }
    ],
    function (err, data) {
        if (!err) {
            console.log(data);
        } else {
            console.log(err);
        }
    })
}
// exec();
// exec1();
exec2();
console.log('主程序执行完毕');