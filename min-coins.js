// function MinCoinChange(coins) {
//     var coins = coins;
//     var cache = {};
//     this.makeChange = function (amount) {
//         var me = this;
//         if (!amount) {
//             return [];
//         }
//         if (cache[amount]) {
//             return cache[amount];
//         }
//         var min = [], newMin, newAmount;
//         for (var i = 0; i < coins.length; i++) {
//             var coin = coins[i];
//             newAmount = amount - coin;
//             if (newAmount >= 0) {
//                 newMin = me.makeChange(newAmount);
//             }
//             if (
//                 newAmount >= 0 &&   //差值大于等于0
//                 (newMin.length < min.length - 1 || !min.length) &&  //获取到的组合长度小于当前组合，或者当前组合为空
//                 (newMin.length || !newAmount)  //获取到的组合有值或者差值为0
//             ) {
//                 min = [coin].concat(newMin);
//                 console.log("new min " + min + "for" + amount);
//             }
//         }
//         return (cache[amount] = min);
//     }
// }
// var test = new MinCoinChange([1, 5, 10, 25]);
// console.log(test.makeChange(36))

let coin = [2, 3, 5, 7];
let amount = 123;
function fn(coins, amounts) {
    let num = [];
    coins.forEach((item, index) => { num[index] = 0 });
    let min = [];
    let total = 0;
    let rest = amounts;
    let mintotal, numtotal;
    const minNum = function (l, newamount) {
        for (let i = 0; i <= Math.floor(newamount / coins[l]); i++) {
            num[l] = i;
            let abc = (newamount - i * coins[l]) / coins[0];
            num[0] = Number.isInteger(abc) ? abc : 0;
            total = num.reduce((pre, item, index) => pre += item * coins[index], 0);
            if (total === amounts) {
                mintotal = min.reduce((pre, item) => pre += item, 0);
                numtotal = num.reduce((pre, item) => pre += item, 0);
                min = min.length == 0 ? [...num] : (mintotal >= numtotal ? [...num] : min);           //num数组是随循环变化，直接赋给min的话会导致min被随意修改
            }
            if (l > 1) {
                minNum(l - 1, newamount - i * coins[l]);
            }
        }
    }
    minNum(coins.length - 1, rest);
    console.log(mintotal ? min : -1)
}
fn(coin, amount)