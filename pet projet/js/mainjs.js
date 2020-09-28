var courses = [
    {
        id: 1,
        name: "java",
        coin: 150,
        isFinish: true,
    },
    {
        id: 2,
        name: "PHP",
        coin: 250,
        isFinish: false,
    },
    {
        id: 3,
        name: "Ruby",
        coin: 350,
        isFinish: true,
    },
    {
        id: 4,
        name: "Python",
        coin: 450,
        isFinish: false,
    }
];

var Arraytest = [{so: 1}, {so: 4}, {so: 18}, {so: 18}, {so: 22}];

var numb = [1,2,3,4,5,6]

Array.prototype.every2 = function(callback){
    var output = true;

    for (var index in this){
        if (this.hasOwnProperty(index) ){
            var result = callback(this[index], index, this)
            if (!result){
                output = false;
                break;
            };
        };
    };
    return output;
};

var ketqua = courses.every2(function(loc){
    return loc.coin < 500;
});

console.log(ketqua)

// var ketqua = courses.every(function(khoahoc){
//     return khoahoc.coin < 500; 
// });

// console.log(ketqua)

//-----------------------------------------------------------------------------
// Array.prototype.some2 = function(callback){
//     for(var index in this){
//         if(this.hasOwnProperty(index) ){
//             if(callback(this[index], index, this) ){
//                 return true;
//             };
//         };
//     };
//     return false;
// };

// var ketqua = courses.some2(function(khoahoc){
//     return khoahoc.coin > 400;
// });

// console.log(ketqua);

// var ketqua = courses.some(function(khoahoc, i){
//     return khoahoc.isFinish;
// })

// console.log(ketqua)

//-----------------------------------------------------------------------------
// Array.prototype.reduce2 = function(callback, accumulator){
//     var lengthArr = this.length;
//     for(var i = 0; i < lengthArr; i++){
//         var total = callback(this[i], accumulator)
//         accumulator = total;
//     }
//     return total;
// }

// var ketqua = numb.reduce2(function(a, b){
//     return a + b;
// }, 0)

// console.log(ketqua)

//-----------------------------------------------------------------------------
// Array.prototype.filter2 = function(callback){
//     var lengthArr = this.length;
//     var output = [];
//     for(var i = 0; i < lengthArr; i++){
//         if(callback(this[i]) ){
//             output.push(this[i])
//         };
//     };    
//     return output;
// };

// var timAll = Arraytest.filter2(function(timAll){
//     return timAll.so === 18;
// })

// console.log(timAll)

// var timAll = Arraytest.filter(function(timAll){
//     return timAll.so === 18;
// });

// console.log(timAll)

// Array.prototype.filter2 = function(callback){
//     var output = [];

//     for(var index in this){
//         if(this.hasOwnProperty(index) ){
//             var result = callback(this[index], index, this)
//             if (result){
//                 output.push(this[index]);
//             }
//         }
//     }
//     return output;
// }

// var ketqua = Arraytest.filter2(function(loc, i){
//     return loc.so == 18;
// })

// console.log(ketqua)

// var loc = courses.filter(function(khoahoc, index, array){
//     return khoahoc.coin > 300;
// });

// console.log(loc)

//-----------------------------------------------------------------------------
// Array.prototype.find2 = function(callback){
//     var lengthArr = this.length;
//     for(var i = 0; i < lengthArr; i++){
//         if(callback(this[i]) ){
//             break;
//         };
//     };
//     return this[i];
// };

// var ketqua = Arraytest.find2(function(cb){
//     return cb.so === 4;
// });

// console.log(ketqua)

// var timSo = Arraytest.find(function(timSo, index){
//     return timSo.so === 4;
// });

// console.log(timSo)

//-----------------------------------------------------------------------------
// Array.prototype.forEach2 = function(callBack1){
//     var lengthArr = this.length;
//     for(var i = 0; i < lengthArr; i++){
//         var ketqua = callBack1(this[i], i);
//     }
//     return ketqua;
// }

// courses.forEach2(function(khoahoc, index){
//     console.log(khoahoc, index)
// })

// courses.forEach(function(khoahoc, index){
//     console.log(khoahoc, index)
// })

// Array.prototype.forEach2 = function(callback){
//     for(var index in this){
//         if(this.hasOwnProperty(index) ){
//             callback(this[index], index, this);
//         }
//     }
// }

// numb.forEach2(function(khoahoc, index, array){
//     console.log(khoahoc, index, array)
// })