/*jslint browser: true*/
/*global BGo:false, BGoGame: false, BGoViewModel:false, BGoSvgBoardView:false, BGoBasicCapturesView:false, BGoBasicCommandsView:false, describe, it, expect, spyOn */

/*
var g1 = null;
var vm1 = null;
var v1 = null;
var v2 = null;
var v3 = null;
var commandsView = null;
var playMove = function (x, y) { "use strict"; g1.viewModel.userClick(x, y); };
*/

define(['BGo'], function(BGo) {

    describe('BGo', function () {
        "use strict";

        describe('.isElement', function () {

            it('returns false if object is null', function() {

                // Arrange
                var inputValue = null;
                var expectedResult = false;

                // Action
                var actualResult = BGo.isElement(inputValue)

                // Assert
                expect(actualResult).toBe(expectedResult);

            });

            it('returns false if object is undefined', function() {

                // Arrange
                var inputValue = undefined;
                var expectedResult = false;

                // Action
                var actualResult = BGo.isElement(inputValue)

                // Assert
                expect(actualResult).toBe(expectedResult);

            });

            it('returns false if object is Object', function() {

                // Arrange
                var inputValue = new Object();
                var expectedResult = false;

                // Action
                var actualResult = BGo.isElement(inputValue)

                // Assert
                expect(actualResult).toBe(expectedResult);

            });

            it('returns true if object is HTMLElement', function() {

                // Arrange
                var inputValue = document.createElement('div');
                var expectedResult = true;

                // Action
                var actualResult = BGo.isElement(inputValue)

                // Assert
                expect(actualResult).toBe(expectedResult);

            });

        });

        describe('.getObjectTypeName', function() {

            it ('returns null if passed null', function() {

                // Arrange
                var inputValue = null;
                var expectedResult = null;

                // Action
                var actualResult = BGo.getObjectTypeName(inputValue);

                // Assert
                expect(actualResult).toBe(expectedResult);

            });

            it ('returns null if passed undefined', function() {

                // Arrange
                var inputValue = undefined;
                var expectedResult = null;

                // Action
                var actualResult = BGo.getObjectTypeName(inputValue);

                // Assert
                expect(actualResult).toBe(expectedResult);

            });

            it ('returns "Object" if passed an Object', function() {

                // Arrange
                var inputValue = new Object();
                var expectedResult = 'Object';

                // Action
                var actualResult = BGo.getObjectTypeName(inputValue);

                // Assert
                expect(actualResult).toBe(expectedResult);
            });

            it ('returns "Function" if passed a function', function() {

                // Arrange
                var inputValue = function blah() { };
                var expectedResult = 'Function';

                // Action
                var actualResult = BGo.getObjectTypeName(inputValue);

                // Assert
                expect(actualResult).toBe(expectedResult);
            });

            it ('returns "MyClass" if passed a instance of a prototype', function() {

                // Arrange
                var myClass = function MyClass() { };
                var inputValue = new myClass();
                var expectedResult = 'MyClass';

                // Action
                var actualResult = BGo.getObjectTypeName(inputValue);

                // Assert
                expect(actualResult).toBe(expectedResult);
            });

            it ('throws "Objects must be declared..." exception when object prototype not set up correctly.', function() {

                // Arrange
                var myClass = function () { };
                var inputValue = new myClass();
                var expectedResult = 'MyClass';

                // Action
                var action = function() { var actualResult = BGo.getObjectTypeName(inputValue); }

                // Assert
                expect(action).toThrow('Objects must be declared using "function <FunctionName>()" syntax not "var <FunctionName> = function() {}" syntax.');

            });

        });

        describe('.getIndexOf', function() {

            it('throw "board index out of range" if x is equal to the board size', function() {

                // Arrange
                var x = 9;
                var y = 0;
                var boardSize = 9;
                var expectedResult = 0;

                // Action
                var action = function() { BGo.getIndexOf(x, y, boardSize); }

                // Assert
                expect(action).toThrow('Board index out of range');

            });

            it('throw "board index out of range" if x is over the board size', function() {

                // Arrange
                var x = 100;
                var y = 0;
                var boardSize = 9;
                var expectedResult = 0;

                // Action
                var action = function() { BGo.getIndexOf(x, y, boardSize); }

                // Assert
                expect(action).toThrow('Board index out of range');

            });

            it('throw "board index out of range" if x less than 0', function() {

                // Arrange
                var x = -1;
                var y = 0;
                var boardSize = 9;
                var expectedResult = 0;

                // Action
                var action = function() { BGo.getIndexOf(x, y, boardSize); }

                // Assert
                expect(action).toThrow('Board index out of range');

            });

            it('throw "board index out of range" if y is equal to the board size', function() {

                // Arrange
                var x = 0;
                var y = 9;
                var boardSize = 9;
                var expectedResult = 0;

                // Action
                var action = function() { BGo.getIndexOf(x, y, boardSize); }

                // Assert
                expect(action).toThrow('Board index out of range');

            });

            it('throw "board index out of range" if y is over the board size', function() {

                // Arrange
                var x = 0;
                var y = -1;
                var boardSize = 9;
                var expectedResult = 0;

                // Action
                var action = function() { BGo.getIndexOf(x, y, boardSize); }

                // Assert
                expect(action).toThrow('Board index out of range');

            });

            it('throw "board index out of range" if y less than 0', function() {

                // Arrange
                var x = 0;
                var y = -1;
                var boardSize = 9;
                var expectedResult = 0;

                // Action
                var action = function() { BGo.getIndexOf(x, y, boardSize); }

                // Assert
                expect(action).toThrow('Board index out of range');

            });


            it('returns the correct index the top left of a 9x9', function() {

                // Arrange
                var x = 0;
                var y = 0;
                var boardSize = 9;
                var expectedResult = 0;

                // Action
                var actualResult = BGo.getIndexOf(x, y, boardSize);

                // Assert
                expect(actualResult).toBe(expectedResult);

            })

            it('returns the correct index the top right of a 9x9', function() {

                // Arrange
                var x = 8;
                var y = 0;
                var boardSize = 9;
                var expectedResult = 8;

                // Action
                var actualResult = BGo.getIndexOf(x, y, boardSize);

                // Assert
                expect(actualResult).toBe(expectedResult);

            })

            it('returns the correct index the bottom left of a 9x9', function() {

                // Arrange
                var x = 0;
                var y = 8;
                var boardSize = 9;
                var expectedResult = 72;

                // Action
                var actualResult = BGo.getIndexOf(x, y, boardSize);

                // Assert
                expect(actualResult).toBe(expectedResult);

            })

            it('returns the correct index the bottom right of a 9x9', function() {

                // Arrange
                var x = 8;
                var y = 8;
                var boardSize = 9;
                var expectedResult = 80;

                // Action
                var actualResult = BGo.getIndexOf(x, y, boardSize);

                // Assert
                expect(actualResult).toBe(expectedResult);

            })

            it('returns the correct index the top left of a 19x19', function() {

                // Arrange
                var x = 0;
                var y = 0;
                var boardSize = 19;
                var expectedResult = 0;

                // Action
                var actualResult = BGo.getIndexOf(x, y, boardSize);

                // Assert
                expect(actualResult).toBe(expectedResult);

            })

            it('returns the correct index the top right of a 19x19', function() {

                // Arrange
                var x = 18;
                var y = 0;
                var boardSize = 19;
                var expectedResult = 18;

                // Action
                var actualResult = BGo.getIndexOf(x, y, boardSize);

                // Assert
                expect(actualResult).toBe(expectedResult);

            })

            it('returns the correct index the bottom left of a 19x19', function() {

                // Arrange
                var x = 0;
                var y = 18;
                var boardSize = 19;
                var expectedResult = 342;

                // Action
                var actualResult = BGo.getIndexOf(x, y, boardSize);

                // Assert
                expect(actualResult).toBe(expectedResult);

            })

            it('returns the correct index the bottom right of a 19x19', function() {

                // Arrange
                var x = 18;
                var y = 18;
                var boardSize = 19;
                var expectedResult = 360;

                // Action
                var actualResult = BGo.getIndexOf(x, y, boardSize);

                // Assert
                expect(actualResult).toBe(expectedResult);

            })

        });

    });

});