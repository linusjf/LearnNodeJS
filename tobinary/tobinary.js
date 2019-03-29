function isOdd(num)
{
    return (num & 1);
}
function toBinary(num)
{
    var binaryRep = "";
    if (isOdd(num))
        binaryRep = "1";
    else
        binaryRep = "0";
    return emitNextBinary(num,binaryRep);
}

function emitNextBinary(num,rep)
{
    quotient = num >> 1;
    var rep;
    if (!quotient)
        return rep;
    else if (isOdd(quotient))
        rep = "1" + rep;
    else
        rep = "0" + rep;
    return emitNextBinary(quotient,rep);
}

function toBinaryShift(num)
{
    var binary = "";
    var numsize = 4; 
    var i;
    var set = false;
    var newnum,leftshift;
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

var integers = process.argv.slice(2);
if (!integers.length)
{
    console.error('Usage: node tobinary.js <list of positive integers>');
    process.exit(1);
}

var methods = [toBinary,toBinaryShift,toBinaryJS];

function printBinary(integers,method)
{
integers.forEach(function(item){
    try{
    num = parseInt(item);
    if (!isNaN(num))
        console.log(item + ' : '+method(num));
    else
        throw {
            name: "Number Format exception",
            message: "Not a number."
        }
    }
    catch (exc)
    {
        console.error(item + ' : '+ exc.name + ' ' + exc.message);
    }
});
}

methods.forEach(function(item){
   console.time(item.name);
    printBinary(integers,item);
    console.timeEnd(item.name);
});

process.exit(0);

