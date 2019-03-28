function toBinary(num)
{
    var binaryRep = [];
    if (isOdd(num))
        binaryRep.push('1');
    else
        binaryRep.push('0');
    emitNextBinary(num,binaryRep);
    binaryRep = binaryRep.reverse();
    return binaryRep.toString().replace(/,/g,"");
}

function toBinaryShift(num)
{
    var binary = "";
    var numsize = 4; 
    var i;
     for (i = numsize* 8 - 1; i >= 0; i--)
    {
        var leftshift = 1 << i;
        var newnum = num & leftshift;
        if (newnum)
            binary = binary +"1";
        else
            binary = binary + "0"
    }
    return binary.replace(/^0+/g,'');
}


function emitNextBinary(num,rep)
{
    quotient = Math.floor(num / 2);
    if (!quotient)
        return;
    else if (isOdd(quotient))
        rep.push('1');
    else
        rep.push('0');
    emitNextBinary(quotient,rep);
}

function toBinaryJS(num)
{
    return (num >>> 0).toString(2);
}

function isOdd(num)
{
    return (num % 2 > 0);
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
    printBinary(integers,item);
});

process.exit(0);

