var compile, scope, directiveElem, inputElement;

function getCompiledElement() {
    var element = angular.element('<cc-logo credit-card-no="creditCardNo" credit-cards-info="creditCardsInfo"></cc-logo>');
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
}

describe('ccLogo Directive', function () {
    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();

        scope.creditCardsInfo = [{
            "regex": "^3[47][0-9]{13}$",
            "cardName": "amex",
            "imgUrl": "http://imgh.us/amex.png"
        }, {
            "regex": "^4[0-9]{12}(?:[0-9]{3})?$",
            "cardName": "visa",
            "imgUrl": "http://imgh.us/visa_2.png"
        }, {
            "regex": "^5[1-5][0-9]{14}$",
            "cardName": "masterCard",
            "imgUrl": "http://imgh.us/mastercard.png"
        }, {
            "regex": "^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$",
            "cardName": "discover",
            "imgUrl": "http://imgh.us/discover.png"
        }, {
            "regex": "^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$",
            "cardName": "maestro",
            "imgUrl": "http://imgh.us/maestro.png"
        }];

    }));
    beforeEach(function () {
        directiveElem = getCompiledElement();
        inputElement = directiveElem.find('input');
    });

    it('should have a input element', inject(function () {
        expect(inputElement).toBeDefined();
    }));

    it("should have a white background", inject(function () {
        expect(inputElement[0].style.backgroundColor).toEqual('white');
    }));

    //it("should have default background image", inject(function () {
    //    expect(inputElement[0].style.background).toEqual('url("http://imgh.us/credit_3.png") left center no-repeat white');
    //}));

    it('config on isolated scope should be two-way bound', function () {
        var isolatedScope = directiveElem.isolateScope();

        inputElement.text('value2').triggerHandler('input');
        scope.$digest();
        isolatedScope.creditCardNo = "9000000001";
        expect(inputElement.text()).toEqual('value2');
    });

    it("should have entered input value", inject(function () {
        inputElement.val('9000000001').triggerHandler('input');
        scope.$digest();
        expect(inputElement.val()).toEqual('9000000001');
    }));

    describe('when a valid credit card number is entered', function () {
        beforeEach(function () {
            scope.creditCardNo = '5345340934208';
        });

        it("should have the right scope value", inject(function () {
            expect(scope.creditCardNo).toEqual('5345340934208');
        }));

        it("should call .match()", inject(function () {
            expect(scope.creditCardNo.match()).toBeTruthy();
        }));
    });
});

