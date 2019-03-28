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

integers.forEach(function(item){
    try{
    num = parseInt(item);
    if (!isNaN(num))
    console.log(item + ' : '+toBinary(num));
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

process.exit(0);

