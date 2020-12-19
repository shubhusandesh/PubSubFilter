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

        this.renderUI();
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        self.element.find('.fur-s-f_modal').empty()
        // self.renderList(self.settings);
        self.renderModal(self.settings);
    }

    renderUI() {
        let self = this;
        self.element.prepend(`
        <div style="width: ${self.settings.buttonWidth}px;">
        <button class="btn btn-sm fur-sort-btn" data-toggle="modal" data-target="#furSortFilterModal">Sort & Filter</button>
        <div class="modal fade pr-0" id="furSortFilterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document" style="margin: 0;
            margin-left: auto;">
                <div class="modal-content" style="min-height:100vh;overflow-y:scroll;height:100vh;">
                    <div class="modal-header d-flex justify-content-start">
                        <button type="button" class="close ml-0 " data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="exampleModalLongTitle">Sort & Filter</h5>
                    </div>
                    <div class="modal-body fur-s-f_modal">
                    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary w-100" data-dismiss="modal">Show All Results</button>
                    </div>
                </div>
            </div>
       <div>
            `);
        self.render();
    }

    renderModal(data) {
        let self = this;

        let modalHTML = '<div id="accordion">'
        if (data.data && data.data.length > 1) {
            $(data.data).each((dKey, dData) => {
                modalHTML += this.renderTypeList(dData);
            })
        } else {
            this.renderTypeList(data);
        }
        modalHTML += '</div>';
        self.element.find('.fur-s-f_modal').html(modalHTML);
        this.element.find('[rel="furFilterClick"]').off('click').on('click', function (e) {
            e.stopPropagation();
            let data = {
                type: $(this).attr('data-type'),
                value: $(this).attr('data-val')
            };
            localStorage.setItem('Sfactive', data.type);
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
        data = $.extend({
            active: localStorage.getItem('Sfactive')
        }, data);
        if (data.type == 'checkbox') {
            return this.renderCheckboxList(data)
        }
        if (data.type == 'imageBox') {
            return this.renderImageBoxList(data)
        }
        if (data.type == 'minmaxBox') {
            return this.renderMinMaxInput(data)
        }
        return '';
    }

    renderMinMaxInput(dList) {
        let self = this;
        let temp = ''
        let uid = self.uuidv4();
        if (self.allowedFilterTypes.includes(dList.type)) {
            let label = (typeof dList.group !== undefined && dList.group) ? dList.label : '';
            temp += `
            <div class="card mb-5"><div class="card-header"><h5 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#furCollapse${uid+dList.label}">${dList.label}</button></h5></div><div id="furCollapse${uid+dList.label}" class="collapse ${dList.label === dList.active ? 'show':false}"><div class="card-body">
            
            `
            temp += '<div class="fur-box_type ' + dList.type + '"><h6 class="fur-box_title">' + label + '</h6><div class="fur-box_items d-flex justify-content-between">'

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
            temp += '</div/></div></div></div></div>';
        }
        return temp;
    }


    renderCheckboxList(dList) {
        let self = this;
        let temp = ''
        let uid = self.uuidv4();
        let label = (typeof dList.group !== undefined && dList.group) ? dList.label : '';
        if (self.allowedFilterTypes.includes(dList.type)) {
            temp += `
            <div class="card mb-5"><div class="card-header"><h5 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#furCollapse${uid+dList.label}" >${dList.label}</button></h5></div><div id="furCollapse${uid+dList.label}" class="collapse ${dList.label === dList.active ? 'show':false}" ><div class="card-body">`;
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
            temp += '</div/></div></div></div></div>';
        }

        return temp;
    }

    renderImageBoxList(dList) {
        let self = this;
        let temp = ''
        let uid = self.uuidv4();
        let label = (typeof dList.group !== undefined && dList.group) ? dList.label : '';
        if (self.allowedFilterTypes.includes(dList.type)) {
            temp += `
            <div class="card mb-5"><div class="card-header"><h5 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#furCollapse${uid+dList.label}">${dList.label}</button></h5></div><div id="furCollapse${uid+dList.label}" class="collapse ${dList.label === dList.active ? 'show':false}"  data-parent="#accordion"><div class="card-body">`;
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
            temp += '</div/></div></div></div></div>';
        }
        return temp;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    containsArr(arr, obj) {
        return arr.filter(item => item.type == obj.type && item.value == obj.value ? true : false).length
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    containsLabel(arr, label) {
        let fArr = arr.filter(item => item.type == label ? true : false);
        if (fArr.length > 0) return fArr[0].value;
        return '';
    }
};