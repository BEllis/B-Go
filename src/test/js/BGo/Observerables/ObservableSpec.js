/*jslint browser: true*/
/*global BGo:false, BGoGame: false, BGoViewModel:false, BGoSvgBoardView:false, BGoBasicCapturesView:false, BGoBasicCommandsView:false, describe, it, expect, spyOn */

define(['BGo', 'BGo/Observables/Observable'], function(BGo) {

    describe('BGo.Observables.Observable', function() {
        "use strict";

        it('Defaults to undefined', function() {
            "use strict";

            // Arragnge
            var expectedValue = undefined;

            // Action
            var observable = new BGo.Observables.Observable();
            var actualValue = observable.get();

            // Assert
            expect(actualValue).toBe(expectedValue)

        });

        it('Stores the first parameter', function() {
            "use strict";

            // Arragnge
            var value = '123abc';
            var expectedValue = value;

            // Action
            var observable = new BGo.Observables.Observable(value);
            var actualValue = observable.get();

            // Assert
            expect(actualValue).toBe(expectedValue)

        });

        it('Gets the initial value', function() {
            "use strict";

            // Arragnge
            var value = '123abc';
            var expectedValue = value;

            // Action
            var observable = new BGo.Observables.Observable(value);
            var actualValue = observable.get();

            // Assert
            expect(actualValue).toBe(expectedValue)

        });

        it('Gets the set value', function() {
            "use strict";

            // Arragnge
            var value = '123abc';
            var newValue = 'abc123'
            var expectedValue = newValue;

            // Action
            var observable = new BGo.Observables.Observable(value);
            observable.set(newValue);
            var actualValue = observable.get();

            // Assert
            expect(actualValue).toBe(expectedValue)

        });

        it('Notifies all observers when set', function() {
            "use strict";

            // Arragnge
            var observer1Received = undefined;
            var observer2Received = undefined;
            var observer3Received = undefined;

            var observer1 = function(newValue) { observer1Received = newValue; }
            var observer2 = function(newValue) { observer2Received = newValue; }
            var observer3 = function(newValue) { observer3Received = newValue; }
            var value = '123abc';
            var newValue = 'abc123'
            var expectedValue = newValue;

            // Action
            var observable = new BGo.Observables.Observable(value);
            observable.observe(observer1);
            observable.observe(observer2);
            observable.observe(observer3);
            observable.set(newValue);
            var actualValue = observable.get();

            // Assert
            expect(observer1Received).toBe(expectedValue);
            expect(observer2Received).toBe(expectedValue);
            expect(observer3Received).toBe(expectedValue);
            expect(actualValue).toBe(newValue);

        });

        it('Notifies all observers when set except unsubscribed', function() {
            "use strict";

            // Arragnge
            var observer1Received = undefined;
            var observer2Received = undefined;
            var observer3Received = undefined;

            var observer1 = function(newValue) { observer1Received = newValue; }
            var observer2 = function(newValue) { observer2Received = newValue; }
            var observer3 = function(newValue) { observer3Received = newValue; }
            var value = '123abc';
            var newValue = 'abc123'
            var expectedValue = newValue;

            // Action
            var observable = new BGo.Observables.Observable(value);
            observable.observe(observer1);
            observable.observe(observer2);
            observable.observe(observer3);
            var actualUnobserveResult = observable.unobserve(observer2);
            observable.set(newValue);
            var actualValue = observable.get();

            // Assert
            expect(observer1Received).toBe(expectedValue);
            expect(observer2Received).toBe(undefined);
            expect(observer3Received).toBe(expectedValue);
            expect(actualValue).toBe(newValue);
            expect(actualUnobserveResult).toBe(true);

        });


        it('Unobserving when not already observing returns false', function() {
            "use strict";

            // Arragnge
            var observer1Received = undefined;
            var observer2Received = undefined;
            var observer3Received = undefined;

            var observer1 = function(newValue) { observer1Received = newValue; }
            var observer2 = function(newValue) { observer2Received = newValue; }
            var observer3 = function(newValue) { observer3Received = newValue; }
            var value = '123abc';
            var newValue = 'abc123'
            var expectedValue = newValue;

            // Action
            var observable = new BGo.Observables.Observable(value);
            observable.observe(observer1);
            observable.observe(observer3);
            var actualUnobserveResult = observable.unobserve(observer2);
            observable.set(newValue);
            var actualValue = observable.get();

            // Assert
            expect(observer1Received).toBe(expectedValue);
            expect(observer2Received).toBe(undefined);
            expect(observer3Received).toBe(expectedValue);
            expect(actualValue).toBe(newValue);
            expect(actualUnobserveResult).toBe(false);

        });

    });

});