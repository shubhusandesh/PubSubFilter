import Component from '../lib/component.js';
import store from '../store/index.js';

export default class AddCart extends Component {

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

        let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        self.element.find('.fur-cart-items').html(self.renderList(cart));
        // let QtPicker = self.element.find('.qty-el').selectpicker({
        //     width: 109
        // });
        self.element.find('.qty-el').each((pK, PP) => {
            $(PP).selectpicker({
                width: 109
            }).on('change', function (e) {
                self.updateQty(this.value);
            });
        });
        $('.fur-cart-trash_btn').off('click').on('click', function (e) {
            e.preventDefault();
            let id = $(this).attr('data-id');
            console.log(id);
            store.commit('deletedFromCart', id);
        })
    }

    renderUI() {
        let self = this;
        self.element.prepend(`
        <div style="width: ${self.settings.buttonWidth}px;">
        <button class="btn btn-sm fur-addCart-btn" data-toggle="modal" data-target="#addCartModal">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <span class="fur-cart-n">100</span>
        </button>
        <div class="modal fade pr-0" id="addCartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div class="modal-dialog" role="document" style="margin: 0;
            margin-left: auto;width: 360px;">
                <div class="modal-content" style="min-height:100vh;overflow-y:scroll;height:100vh;">
                    <div class="modal-header d-flex justify-content-start">
                        <button type="button" class="close ml-0 " data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="exampleModalLongTitle">Cart</h5>
                    </div>
                    <div class="modal-body fur-cart_contents" style="flex:0;">
                        <div>
                            <div class="fur-cart_buttons">
                                <a href="javascript:;" class="fur-cart-r_btn">Review Cart</a>
                                <a href="javascript:;" class="fur-cart-c_btn" >Check Out Now</a>
                            </div>
                            <div class="fur-cartR-div">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       <div>
            `);

        // self.renderList(self.settings);
        self.renderModal();
    }

    renderModal() {
        let self = this;
        let modalHTML = "";
        let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        modalHTML += `
        <div class="d-flex justify-content-between">
            <h4>Cart Summary</h4>
            <h6> 
                <span>SubTotal:</span>
                <span class="fur-cart_total"> $1,845.32</span>
            </h6>
        </div>
        <div class="fur-cart-items">
            ${cart.length?self.renderList(cart):''}
        </div>
        `
        self.element.find('.fur-cartR-div').html(modalHTML);
        self.element.find('.qty-el').each((pK, PP) => {
            $(PP).selectpicker({
                width: 109
            }).on('change', function (e) {
                self.updateQty(this.value);
            });
        });
    }

    renderList(cart) {
        let self = this;
        let cHtml = '';
        $(cart).each((cI, CValue) => {
            cHtml += `
            <div class="fur-cart-item" data-inv="${CValue.inv_id}">
                <div class="fur-cart-item-c row">
                    <div class="fur-cart_item-img fur-cart-i-not col-md-3 pr-0">
                        <img src="./furniturecart/images/furniture/1.jpg" />
                        <span class="fur-cart-item_count">${CValue.qty}</span>
                    </div>
                    <div class="col-md-6 pr-1 fur-cart-item_i ">
                        <div class="row">
                            <div class="col-md-12">
                                <h5>
                                ${self.capitalizeFirstLetter(CValue.name)}
                                </h5>
                            </div>
                            <div class="col-md-12">
                                <span class="fur-cart-variations">
                                ${CValue.size?CValue.size.name:''},
                                ${CValue.color?CValue.color.name:''}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="fur-cart-item_p fur-cart-i-not col-md-3 pl-0">
                        <div class="row">
                            <div class="col-md-12">
                                <span class="fur-cart-item_tPrice">
                                    $6000.00
                                </span>
                            </div>
                            <div class="col-md-12 text-right">
                                <div class="fur-cart-trash_btn" data-id="${CValue.id}">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fur-cart-item_btns col-md-12 d-flex justify-content-end">
                        <span class="quantityPicker">
                            <select class="qty-el show-tick" data-id="${CValue.id}">
                                <option data-hidden="true">Select</option>
                                <option ${CValue.qty == 1?'selected':''}>1</option>
                                <option ${CValue.qty == 2?'selected':''}>2</option>
                                <option ${CValue.qty == 3?'selected':''}>3</option>
                                <option ${CValue.qty == 4?'selected':''}>4</option>
                                <option ${CValue.qty == 5?'selected':''}>5</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
            `
        })
        return cHtml;
    }
    updateQty(data) {
        console.log(data);
        // store.commit('updateQty', data)
    }


    capitalizeFirstLetter(string) {
        if (!string) return '';
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