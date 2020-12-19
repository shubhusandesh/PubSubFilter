import Component from '../lib/component.js';
import store from '../store/index.js';

export default class SizePicker extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor(el, settings) {
        super({
            store,
            element: $(el).first(),
            settings,
            noChange: true

        });
        this.settings = $.extend({
            title: 'heading 1',
        }, settings);
        let self = this;
        store.events.subscribe('stateChange', () => {
            self.rerender();
        });
        this.renderUI();
    }

    rerender() {
        let self = this;
        if (!self.element.find('.fur-s_item ').length) {
            self.render();
        } else {
            self.element.find('.fur-s_item').removeClass('active');
            self.size = typeof store.state.selectedProduct.size !== 'undefined' ? store.state.selectedProduct.size : false;
            if (self.size) {
                self.element.find('[data-sid="' + parseInt(self.size.id) + '"]').addClass("active");
                self.element.find('.fur-s_selected-t').html(self.capitalizeFirstLetter(self.size.name))
            }
        }
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        this.size = typeof store.state.selectedProduct.size !== 'undefined' ? store.state.selectedProduct.size : false;
        let self = this;
        self.element.find('.fur-s_contents').empty()
        self.ajax(self.settings.url)
    }

    ajax() {
        let self = this;
        setTimeout(() => {
            let data = [{
                name: 'Twin/Twin XL Duvet Cover + 1 Pillow Case',
                id: 1
            }, {
                name: 'Full/Queen Duvet Cover + 2 Pillow Cases',
                id: 2
            }, {
                name: 'Full/Queen Duvet Cover + 2 Pillow Cases',
                id: 3,
                out_of_stock: 1
            }]
            self.renderList(data);
        }, 1000)
    }

    renderList(data) {
        let self = this;
        let iHtml = '';
        $(data).each((iKey, iValue) => {
            iHtml += `
            <div class="fur-s_item ${self.size && self.size.id == iValue.id?'active':''}" data-sid="${iValue.id?iValue.id:''}" data-name="${iValue.name?iValue.name:''}" rel="selectSize">
                <div class="fur-s_text">
                    ${self.capitalizeFirstLetter(iValue.name)}
                </div>
                ${(typeof iValue.out_of_stock !== 'undefined' && iValue.out_of_stock)?'<span class="fur-s_outofstock">Out of stock</span>': ''}
            </div>
        
            `
        })
        self.element.find('.fur-s_contents').html(iHtml);


        self.element.find('[rel="selectSize"]').off('click').on('click', function (e) {
            e.stopPropagation();
            let id = $(this).attr('data-sid');
            let name = $(this).attr('data-name');
            return store.commit('selectSize', {
                id,
                name
            });
        })
    }

    renderUI() {
        let self = this;
        self.element.html(`
        <div class="fur-s_picker" style="width:${typeof self.settings.width!=='undefined'?self.settings.width+'px':'100%'};">
            <h6 class="fur-s_heading">${self.settings.title}</h6>
            <div class="fur-s_selected-c">
                <span class="fur-s_selected-t">${(store.state.selectedProduct != undefined && store.state.selectedProduct.size)?self.capitalizeFirstLetter(store.state.selectedProduct.size.name):''}</span>
            </div>
            <div class="fur-s_contents">
              
            </div>
        </div>`);
        self.render();
    }



    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    containsArr(arr, obj) {
        return arr.filter(item => item.type == obj.type && item.value == obj.value ? true : false).length
    }

    getMeasurement(list) {
        return (typeof list.measurement != undefined && list.measurement) ? list.measurement + ' ' : ' ';
    }
};