"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var database_1 = require('./shared/database');
var AppComponent = (function () {
    function AppComponent() {
        this.data = database_1.Database;
        this.tableConf = Object.keys(this.data[0]);
        this.steps = this.data.length;
        this.editable = false;
    }
    //------------------------------------------------------------------------------
    AppComponent.prototype.focus = function (event) {
        var element = document.getElementsByClassName('focused');
        if (this.editable && event.target.localName != 'input') {
            this.stopModify(false);
        }
        if (element.length) {
            for (var _i = 0, element_1 = element; _i < element_1.length; _i++) {
                var item = element_1[_i];
                item.className = '';
            }
        }
        if (event.target.nodeName === "TD" && event.target.className != 'identificator') {
            event.target.className = 'focused';
        }
    };
    //------------------------------------------------------------------------------- 
    AppComponent.prototype.movement = function (event) {
        var focused = document.getElementsByClassName('focused');
        var key = event.keyCode;
        var numberOfTd = this.steps * (this.tableConf.length - 1);
        var AllowdKeys = [13, 27, 37, 38, 39, 40];
        var keyFilter = AllowdKeys.indexOf(key);
        var currentPosition;
        var column;
        if (this.editable && key == 13) {
            this.stopModify(true);
            return;
        }
        if (this.editable && key == 27) {
            this.stopModify(false);
            return;
        }
        if (!focused.length || keyFilter == -1) {
            return;
        }
        currentPosition = +focused[0].attributes[1].nodeValue;
        switch (key) {
            case 13:
                this.modify(focused[0], event);
                break;
            case 37:
                dirrection(currentPosition - this.steps);
                break;
            case 38:
                dirrection(currentPosition - 1);
                break;
            case 39:
                dirrection(currentPosition + this.steps);
                break;
            case 40:
                dirrection(currentPosition + 1);
                break;
        }
        function dirrection(move) {
            if (move > numberOfTd || move < 1) {
                return;
            }
            ;
            var nextPosition = document.getElementsByName(move);
            focused[0].className = '';
            nextPosition[0].className = 'focused';
        }
    };
    //----------------------------------------------------------------------------
    AppComponent.prototype.modify = function (event, keyEvent) {
        if (keyEvent === void 0) { keyEvent = undefined; }
        var content;
        var element;
        if (this.editable && event.type == 'dblclick') {
            return;
        }
        if (event.type == 'dblclick') {
            this.prevElement = event.target;
            this.prevElementOuter = event.target.outerHTML;
            this.parent = event.target.parentNode;
            content = event.target.innerHTML;
        }
        else if (keyEvent.keyCode == 13) {
            this.prevElement = event;
            this.prevElementOuter = event.outerHTML;
            this.parent = event.parentNode;
            content = event.innerText;
        }
        element = document.createElement('input');
        element.type = 'text';
        element.width = this.prevElement.clientWidth;
        element.height = this.prevElement.clientHeight;
        element.setAttribute('value', content);
        element.setAttribute('autofocus', '');
        element.setAttribute('id', 'editable');
        this.parent.replaceChild(element, this.prevElement);
        this.editable = true;
    };
    AppComponent.prototype.stopModify = function (hint) {
        var element = document.getElementById('editable');
        if (hint) {
            this.prevElement.innerText = element.value;
        }
        this.parent.replaceChild(this.prevElement, element);
        this.editable = false;
    };
    __decorate([
        core_1.HostListener('document:keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "movement", null);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map