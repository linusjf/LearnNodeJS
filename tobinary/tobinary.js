/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
/*jshint bitwise: false */
"use strict";

function isOdd(num)
{
    return (num & 1);
}

function emitNextBinary(num,rep)
{
    let quotient = num >> 1;
    if (!quotient)
        return rep;
    else if (isOdd(quotient))
        rep = "1" + rep;
    else
        rep = "0" + rep;
    return emitNextBinary(quotient,rep);
}

function toBinary(num)
{
    let binaryRep = "";
    if (isOdd(num))
        binaryRep = "1";
    else
        binaryRep = "0";
    return emitNextBinary(num,binaryRep);
}

function toBinaryShift(num)
{
    let binary = "";
    let i,newnum,leftshift;
     for (i = Math.log2(num); i >= 0; i--)
    {
        leftshift = 1 << i;
        newnum = num & leftshift;
        if (!newnum)
                binary = binary + "0";
        else
          binary = binary +"1";
    }
    return binary;
}

function toBinaryJS(num)
{
    return (num >>> 0).toString(2);
}

const integers = process.argv.slice(2);
if (!integers.length)
{
    console.error("Usage: node tobinary.js <list of positive integers>");
    process.exit(1);
}

const methods = [toBinary,toBinaryShift,toBinaryJS];

function printBinary(integers,method)
{
integers.forEach(function(item){
    try{
    let  num = parseInt(item);
    if (!isNaN(num))
        console.log(item + " : "+method(num));
    else
        throw {
            name: "Number Format exception",
            message: "Not a number."
        };
    }
    catch (exc)
    {
        console.error(item + " : "+ exc.name + " " + exc.message);
    }
});
}

methods.forEach(function(item){
   console.time(item.name);
    printBinary(integers,item);
    console.timeEnd(item.name);
});

process.exit(0);

