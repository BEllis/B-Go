define(function() {

    var BGo = {};

    // Returns true if it is a DOM element
    BGo.isElement = function (o) {

        if (o == null)
        {
            return false;
        }

        return o instanceof HTMLElement;

        /*
         return (
         typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
         o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
         ); */
    };

    BGo.getObjectTypeName = function (object) {

        if (object == null) {
            return null;
        }

        var funcNameRegex = /function ([a-zA-Z0-9_\-]{1,})\(/,
            results = (funcNameRegex).exec((object).constructor.toString());

        if (results == null) {
            throw 'Objects must be declared using "function <FunctionName>()" syntax not "var <FunctionName> = function() {}" syntax.'
        }

        return results[1];
    };

    BGo.getIndexOf = function (x, y, boardSize) {

        if (x >= boardSize || x < 0 || y >= boardSize || y < 0) {
            throw 'Board index out of range'
        }

        return x + (y * boardSize);
    };

    BGo.Black = 'B';
    BGo.White = 'W';
    BGo.Empty = ' ';

    return BGo;

});