/*jslint browser: true, regexp: true */
/*global HTMLElement, Node */

define(['BGo/Observables'], function(observables) {
    "use strict";

    observables.Observable = function(value) {

        var subscriptions = [];

        this.get = function() {

            return value;

        }

        this.set = function(newValue) {

            value = newValue;
            subscriptions.map(function (subscribeAction) {
                subscribeAction(value);
            });

        }

        this.observe = function(subscribeAction) {

            subscriptions.push(subscribeAction);

        }

        this.unobserve = function(subscribeAction) {

           for( var i = 0, len = subscriptions.length; i < len; i++ ) {
              if( subscriptions[ i ] === subscribeAction ) {
                subscriptions.splice( i, 1 );
                return true;
              }
            }

            return false;

        }

        return this;

    }

});