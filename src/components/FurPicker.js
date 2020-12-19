import Component from '../lib/component.js';
import store from '../store/index.js';

export default class FurPicker extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor(el, settings) {
        super({
            store,
            element: $(el).first(),
            settings
        });
        this.store = store;
        this.settings = settings;

        this.element = $(el).first();

        this.allowedFilterTypes = ['minmaxBox', 'checkbox', 'imageBox'];

        this.settings = $.extend({
            label: 'select something',
            width: 150
        }, this.settings);
        this.currentTimeout = 0;
        this.renderUI();
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        self.element.find('.fur-checkboxes').empty()
        self.renderList(self.settings);
    }

    renderUI() {
        let self = this;
        self.element.prepend(`
            <div class="m-fur_multiselect" >
                <div class="selectBox">
                    <select>
                    <option>${typeof self.settings.label!== undefined? self.settings.label :'Select an Item' }</option>
                    </select>
                    <div class="overSelect"></div>
                </div>
                <div  class="fur-checkboxes" style="width:${self.settings.width}px;">
                </div>
            </div>
            `);
        self.render();
    }

    renderList(data) {
        let self = this;

        if (data.group) {
            $(data.data).each((dKey, dData) => {
                dData = $.extend({
                    group: true
                }, dData);

                this.renderTypeList(dData);
            })
        } else {
            this.renderTypeList(data);
        }

        this.element.find('[rel="furFilterClick"]').off('click').on('click', function (e) {
            e.stopPropagation();
            let data = {
                type: $(this).attr('data-type'),
                value: $(this).attr('data-val')
            };
            return store.dispatch(self.containsArr(store.state.selectedItems, data) ? 'clearItem' : 'addItem', data);
        })

        this.element.find('[rel="furFilterText"]').off('keyup').on('keyup', function (e) {
            e.stopPropagation();
            clearInterval(self.currentTimeout)
            self.currentTimeout = setTimeout(() => {
                let data = {
                    type: $(this).attr('data-val'),
                    value: $(this).val(),
                    measurement: $(this).attr('data-measurement')
                };
                return store.dispatch('changeInput', data);
            }, 1000);
        })
    }

    renderTypeList(data) {
        if (data.type == 'checkbox') {
            this.renderCheckboxList(data)
        }
        if (data.type == 'imageBox') {
            this.renderImageBoxList(data)
        }
        if (data.type == 'minmaxBox') {
            this.renderMinMaxInput(data)
        }
    }

    renderMinMaxInput(dList) {
        let self = this;
        let temp = ''
        if (self.allowedFilterTypes.includes(dList.type)) {
            let label = (typeof dList.group !== undefined && dList.group) ? dList.label : '';
            temp += '<div class="fur-box_type ' + dList.type + '"><h6 class="fur-box_title">' + label + '</h6><div class="fur-box_items">'

            $(dList.data).each(function (key, list) {


                temp += `
                <div class="fur-box_item">
                    <label class="fur-minmaxBox_container">
                        <span class="fur-minmaxBox-label">${self.capitalizeFirstLetter(list.label)}</span>
                        <span class="fur-minmaxBox-m">${self.capitalizeFirstLetter(list.measurement)}</span>
                        <input type="text" name="min" class="fur-minmaxBox-i" value="${self.containsLabel(store.state.selectedItems,list.label)}"  data-type="${dList.label}"  data-val="${list.label}" data-measurement="${list.measurement}" rel="furFilterText" />
                    </label>
                </div>
                `;
            })
            temp += '</div/></div>';
        }
        self.element.find('.fur-checkboxes').append(temp);
    }


    renderCheckboxList(dList) {
        let self = this;
        let temp = ''
        let label = (typeof dList.group !== undefined && dList.group) ? dList.label : '';
        if (self.allowedFilterTypes.includes(dList.type)) {
            temp += '<div class="fur-box_type ' + dList.type + '"><h6 class="fur-box_title">' + label + '</h6><div class="fur-box_items">'
            $(dList.data).each(function (key, list) {
                let itemObj = {
                    type: dList.label,
                    value: list.label
                }
                temp += `
                    <div class="fur-box_item d-flex">
                        <label class="fur-checkbox_container">
                            <input type="checkbox" name="radio"  data-type="${dList.label}"  data-val="${list.label}" rel="furFilterClick" ${self.containsArr(store.state.selectedItems,itemObj)? 'checked': ''}>
                            <span class="fur-checkbox_checkmark"></span>
                            <span class="fur-checkbox-label">${self.capitalizeFirstLetter(list.label)}</span>
                        </label>
                    </div>
                `;
            });
            temp += '</div/></div>';
        }

        self.element.find('.fur-checkboxes').append(temp)
    }

    renderImageBoxList(dList) {
        let self = this;
        let temp = ''
        let label = (typeof dList.group !== undefined && dList.group) ? dList.label : '';
        if (self.allowedFilterTypes.includes(dList.type)) {
            temp += '<div class="fur-box_type ' + dList.type + '"><h6 class="fur-box_title">' + label + '</h6><div class="fur-box_items">'
            $(dList.data).each(function (key, list) {
                let itemObj = {
                    type: dList.label,
                    value: list.label
                }
                temp += `
                <div class="fur-box_item d-flex">
                    <label class="fur-imagebox_container">
                        <input type="checkbox" name="radio" rel="furFilterClick" data-type="${dList.label}"  data-val="${list.label}" ${self.containsArr(store.state.selectedItems,itemObj)? 'checked': ''}>
                        <img class="fur-box_item-img" src="${typeof list.img!==undefined? list.img : '/media/no-image.png'}" alt="" style="height :60px; width:100%;">
                        <div class="fur-checkbox-label" style=" width:100%;">${self.capitalizeFirstLetter(list.label)}</div>
                        <div class="checkmark"></div>
                    </label>
                </div>
                `;
            })
            temp += '</div/></div>';
        }
        self.element.find('.fur-checkboxes').append(temp)
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    containsArr(arr, obj) {
        return arr.filter(item => item.type == obj.type && item.value == obj.value ? true : false).length
    }
    containsLabel(arr, label) {
        let fArr = arr.filter(item => item.type == label ? true : false);
        if (fArr.length > 0) return fArr[0].value;
        return '';

    }
};