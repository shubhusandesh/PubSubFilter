import Component from '../lib/component.js';
import store from '../store/index.js';

export default class ColorPicker extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor(el, settings) {
        super({
            store,
            element: $(el).first(),
            settings,
        });
        console.log(settings);
        this.settings = $.extend({
            title: 'heading 2',
            maxDisplay: 3
        }, settings);
        this.renderUI();

    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        self.color = typeof store.state.selectedProduct.color !== 'undefined' ? store.state.selectedProduct.color : false;
        self.element.find('.fur-s_selected-t').html(self.capitalizeFirstLetter(self.color.name))
        self.element.find('.fur-c_contents').empty()
        self.ajax(self.settings.url)
    }

    ajax() {
        let self = this;
        let data = [{
                name: 'Red',
                id: 1,
                img:'https://www.marni.com/12/12386489MT_13_n_r.jpg'
            }, {
                name: 'Blue',
                id: 2,
                img:'https://www.marni.com/12/12386489MT_13_n_r.jpg'
            }, {
                name: 'Yellow',
                id: 3,
                out_of_stock: 1,
                img:'https://www.marni.com/12/12386489MT_13_n_r.jpg'
            },
            {
                name: 'Green',
                id: 4,
                img:'https://www.marni.com/12/12386489MT_13_n_r.jpg'
            },
            {
                name: 'Orange',
                id: 5,
                img:'https://www.marni.com/12/12386489MT_13_n_r.jpg'
            },
            {
                name: 'black',
                id: 6,
                img:'https://www.marni.com/12/12386489MT_13_n_r.jpg'
            }
        ];
        let iffModal = data.length > self.settings.maxDisplay ? data.length - self.settings.maxDisplay : false;
        self.renderList(self.filterListItems(data), iffModal);
        if (iffModal) self.renderModal(data);
        $('[rel="selectColor"]').off('click').on('click', function (e) {
            e.stopPropagation();
            let id = $(this).attr('data-cid');
            let name = $(this).attr('data-name');
            console.log(self.settings.events);
            self.settings.events.Publish('colorChange', {
                id,
                name
            })
        })
    }
    renderModal(data) {
        let self = this;
        let iHtml = '';
        $(data).each((iKey, iValue) => {
            iHtml += `
            <div class="fur-c_item ${self.color && self.color.id == iValue.id?'active':''}" data-cid="${iValue.id?iValue.id:''}" data-name="${iValue.name?iValue.name:''}" rel="selectColor">
                <div class="fur-c_img">
                    <img src="${iValue.img?iValue.img:'./furniturecart/images/filterTest/1.jpg'}" alt="">
                </div>
                <h6 class="fur-c_text"> ${self.capitalizeFirstLetter(iValue.name)}</h6>
            </div>
            `
        })
        $('#furColorModal').find('.fur-c_modal').html(iHtml);
    }


    renderList(data, iffModal) {
        let self = this;
        let iHtml = '';
        $(data).each((iKey, iValue) => {
            iHtml += `
            <div class="fur-c_item ${self.color && self.color.id == iValue.id?'active':''}" data-cid="${iValue.id?iValue.id:''}" data-name="${iValue.name?iValue.name:''}" rel="selectColor">
                <div class="fur-c_img">
                    <img src="${iValue.img?iValue.img:'/furniturecart/images/filterTest/1.jpg'}" alt="">
                </div>
                <h6 class="fur-c_text"> ${self.capitalizeFirstLetter(iValue.name)}</h6>
            </div>
            `
        })
        if (iffModal) {
            iHtml += `
            <div class="fur-c_item" data-toggle="modal" data-target="#furColorModal">
                <div class="fur-c_img">
                    <img src="/furniturecart/images/furniture/1.jpg" alt="">
                </div>
                <h6 class="fur-c_text">+ ${iffModal} More</h6>
            </div>
            `
        }

        self.element.find('.fur-c_contents').html(iHtml);

    }

    renderUI() {
        let self = this;
        self.element.html(`
        <div class="fur-s_picker" style="width:${typeof self.settings.width!=='undefined'?self.settings.width+'px':'100%'};">
            <h6 class="fur-s_heading">${self.settings.title}</h6>
            <div class="fur-s_selected-c">
                <span class="fur-s_selected-t">${(store.state.selectedProduct != undefined && store.state.selectedProduct.color)?self.capitalizeFirstLetter(store.state.selectedProduct.color.name):''}</span>
            </div>
            <div class="fur-c_contents">
              
            </div>
        </div>`);
        let mEl = $('body').find('#furColorModal');
        if (mEl.length) {
            mEl.html(`
            <div class="modal-dialog" role="document" style="margin: 0;
            margin-left: auto;">
                <div class="modal-content" style="min-height:100vh;overflow-y:scroll;height:100vh;">
                    <div class="modal-header d-flex justify-content-start">
                        <button type="button" class="close ml-0 " data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title ml-2" id="exampleModalLongTitle">Colors</h5>
                    </div>
                    <div class="modal-body fur-c_modal">
                    </div>
                </div>
            </div>
            `)
        } else {
            $('body').append(`
            <div class="modal fade pr-0" id="furColorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog" role="document" style="margin: 0;
                margin-left: auto;">
                    <div class="modal-content" style="min-height:100vh;overflow-y:scroll;height:100vh;">
                        <div class="modal-header d-flex justify-content-start">
                            <button type="button" class="close ml-0 " data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 class="modal-title ml-2" id="exampleModalLongTitle">Colors</h5>
                        </div>
                        <div class="modal-body fur-c_modal">
                        </div>
                    </div>
                </div>
            <div>
        `)
        }
        self.render();
    }

    filterListItems(data) {
        let self = this;

        return [
            ...this.getActiveItem(data),
            ...this.getRestItem(data).filter((iV, iK) => iK < self.settings.maxDisplay - 1)
        ]
    }
    getActiveItem(data) {
        let self = this;
        return data.filter((iV, iK) => self.color && !self.isEmpty(self.color) ? self.color.id == iV.id : false);
    }
    getRestItem(data) {
        let self = this;
        return data.filter((iV, iK) => self.color ? self.color.id != iV.id : true);
    }
    isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }
    capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    containsArr(arr, obj) {
        return arr.filter(item => item.type == obj.type && item.value == obj.value ? true : false).length
    }

    getMeasurement(list) {
        return (typeof list.measurement != undefined && list.measurement) ? list.measurement + ' ' : ' ';
    }
};