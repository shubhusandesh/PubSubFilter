import Component from "../lib/component.js";
import store from "../store/index.js";
import SizePicker from './SizePicker.js';
import ColorPicker from './ColorPicker.js';
import PubSub from '../lib/pubsub.js';

export default class ProductDetail extends Component {
    constructor(el, settings) {
        super({
            store,
            element: $(el).first(),
            settings,
            noChange: true
        });
        self.events = new PubSub();
        console.log(self.events);
        self.selectedProduct = settings;
        self.events.subscribe('colorChange', (colorObj) => {
            self.selectedProduct.color = colorObj;
        });
        this.renderUI();
        return this;
    }

    renderUI() {
        let self = this;
        self.element.html(`
            <div class="fur-pd">
            </div>
        `);
        self.setSkeleton();
        self.render();
    }

    render() {
        let self = this;
        this.element
            .find(".fur-pd")
            .addClass("active")
            .addClass("animate__liftup");
        setTimeout(() => {
            this.renderActual(self.settings);
        }, 2000);
        self.element.siblings('.pd-hide').hide();
    }
    rerender(settings) {

    }

    show() {
        this.render();
    }
    hide() {
        this.setSkeleton();
        this.element
            .find(".fur-pd")
            .removeClass("active")
            .removeClass("animate__liftup");
        this.element.siblings('.pd-hide').show();
    }

    renderActual(settings) {
        let self = this;


        self.element
            .find(".fur-pd")
            .html(
                `
            <section class="container">
                <div class="collection-wrapper">
                    <div class="row data-sticky_parent pb-4">
                        <div class="col-lg-12 col-sm-12 col-xs-12 mb-4">
                            <div class="container-fluid">
                                <span>
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                    <a href="javascript:;" rel="closePDModal">
                                        <span class="text-secondary mr-3">Back to</span>
                                        <span>DECOR & PILLOWS / ABSTRACT WALL ART</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="row pro_sticky_info" data-sticky_column>
                                            <div class="col-12">
                                                <div class="product-slick">
                                                    <div><img src="https://images-na.ssl-images-amazon.com/images/I/511GLrsq9HL._UL1000_.jpg" alt=""
                                                            class="img-fluid blur-up lazyload "></div>
                                                    <div><img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/413696/item/goods_10_413696.jpg?width=2000" alt=""
                                                            class="img-fluid blur-up lazyload "></div>
                                                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYoX3NSfQk_hbZNeHzEVNaG0tS46Pt46uA9w&usqp=CAU" alt=""
                                                            class="img-fluid blur-up lazyload "></div>
                                                    <div><img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/436191/item/goods_11_436191.jpg?width=380" alt=""
                                                            class="img-fluid blur-up lazyload "></div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 p-0">
                                                        <div class="slider-nav">
                                                            <div><img src="https://images-na.ssl-images-amazon.com/images/I/511GLrsq9HL._UL1000_.jpg" alt=""
                                                                    class="img-fluid blur-up lazyload"></div>
                                                            <div><img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/413696/item/goods_10_413696.jpg?width=2000" alt=""
                                                                    class="img-fluid blur-up lazyload"></div>
                                                            <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYoX3NSfQk_hbZNeHzEVNaG0tS46Pt46uA9w&usqp=CAU" alt=""
                                                                    class="img-fluid blur-up lazyload"></div>
                                                            <div><img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/436191/item/goods_11_436191.jpg?width=380" alt=""
                                                                    class="img-fluid blur-up lazyload"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 rtl-text">
                                        <div class="product-right product_img_scroll image-scroll" data-sticky_column>
                                            <h2>${settings.name}</h2>
                                            <h4><del>$459.00</del><span>55% off</span></h4>
                                            <h3>$32.96</h3>
                                            <div class="colorPicker" style="width: 100%;"></div>
                                            <div class="sizePicker" style="width: 100%;"></div>
                                            <div class="quantityPicker">
                                                <h6 class="product-title">quantity</h6>
                                                <select class="qty-el show-tick">
                                                    <option data-hidden="true">Select</option>
                                                    <option selected>1</option>
                                                    <option >2</option>
                                                    <option >3</option>
                                                    <option >4</option>
                                                    <option >5</option>
                                                </select>
                                            </div>
                                            <div class="product-buttons">
                                                <a href="javascript:;" class="fur-pd-addCart btn btn-solid">
                                                    add to cart
                                                </a>
                                            </div>
                                            <div class="row product-accordion">
                                                <div class="col-sm-12 pl-4">
                                                    <div class="accordion theme-accordion" id="accordionExample">
                                                        <div class="card">
                                                            <div class="card-header" id="headingOne">
                                                                <h5 class="mb-0"><button class="btn btn-link collapsed"
                                                                        type="button" data-toggle="collapse"
                                                                        data-target="#collapseOne" aria-expanded="true"
                                                                        aria-controls="collapseOne">product
                                                                        description</button></h5>
                                                            </div>
                                                            <div id="collapseOne" class="collapse show"
                                                                aria-labelledby="headingOne"
                                                                data-parent="#accordionExample">
                                                                <div class="card-body">
                                                                    <p>it look like readable English. Many desktop
                                                                        publishing packages
                                                                        and web page editors now use Lorem Ipsum as
                                                                        their default model
                                                                        text, and a search for 'lorem ipsum' will
                                                                        uncover many web sites
                                                                        still in their infancy. Various versions
                                                                        have evolved over the
                                                                        years,All the Lorem Ipsum generators on the
                                                                        Internet tend to
                                                                        repeat predefined chunks as necessary,
                                                                        making this the first
                                                                        true generator on the Internet. It uses a
                                                                        dictionary of over 200
                                                                        Latin words, combined with a handful of
                                                                        model sentence
                                                                        structures</p>
                                                                    <div class="single-product-tables detail-section">
                                                                        <table>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Febric:</td>
                                                                                    <td>Chiffon</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Color:</td>
                                                                                    <td>Red</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Material:</td>
                                                                                    <td>Crepe printed</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card">
                                                            <div class="card-header" id="headingTwo">
                                                                <h5 class="mb-0"><button class="btn btn-link collapsed"
                                                                        type="button" data-toggle="collapse"
                                                                        data-target="#collapseTwo" aria-expanded="false"
                                                                        aria-controls="collapseTwo">details</button>
                                                                </h5>
                                                            </div>
                                                            <div id="collapseTwo" class="collapse"
                                                                aria-labelledby="headingTwo"
                                                                data-parent="#accordionExample" style="">
                                                                <div class="card-body">
                                                                    <div class="mt-2 text-center">
                                                                        <iframe
                                                                            src="https://www.youtube.com/embed/BUWzX78Ye_8"
                                                                            allow="autoplay; encrypted-media"
                                                                            allowfullscreen=""></iframe>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card">
                                                            <div class="card-header" id="headingThree">
                                                                <h5 class="mb-0"><button class="btn btn-link collapsed"
                                                                        type="button" data-toggle="collapse"
                                                                        data-target="#collapseThree"
                                                                        aria-expanded="false"
                                                                        aria-controls="collapseThree">review</button>
                                                                </h5>
                                                            </div>
                                                            <div id="collapseThree" class="collapse"
                                                                aria-labelledby="headingThree"
                                                                data-parent="#accordionExample">
                                                                <div class="card-body">
                                                                    <p>no reviews yet</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `
            )
            .removeClass("animate__liftup")
            .addClass("animate__fadeIn");

        console.log(self.events);
        let colorPicker = new ColorPicker(self.element.find('.colorPicker'), {
            title: 'Select Color',
            maxDisplay: 3,
            events: self.events
        })
        let sizePicker = new SizePicker(self.element.find('.sizePicker'), {
            title: 'Select Color',
        })

        let QtPicker = self.element.find('.qty-el').selectpicker({
            width: 300
        });

        self.updateQty(QtPicker[0].value);

        self.element.find('.qty-el').on('change', function () {
            self.updateQty(QtPicker[0].value);
        });
        self.element.find('.fur-pd-addCart').off('click').on('click', function () {
            // store.commit('addSelectedToCart')
        });

        $(".product-slick").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: ".slider-nav",
        });

        $(".slider-nav").slick({
            vertical: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: ".product-slick",
            arrows: true,
            dots: false,
            focusOnSelect: true,
        });
        self.element
            .find("img")
            .on("load", function () {
                self.element.find(".pd-skeleton").hide();
            })
            .on("error", function () {
                self.element.find(".pd-skeleton").hide();
            });

        self.element.find('[rel="closePDModal"]').off('click').on('click', function (e) {
            e.stopPropagation();
            self.hide();
        })
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    }
    setSkeleton() {
        this.element.find(".fur-pd").html(`
        <section class="container pd-skeleton">
        <div class="row">
            <div class="col-lg-12 col-sm-12 col-xs-12">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="fakeImagebox loading" style="height: 70vh;"></div>
                            </div>
                            <div class="col-md-12 mt-4">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="fakeImagebox loading" style="height: 18vh;"></div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="fakeImagebox loading" style="height: 18vh;"></div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="fakeImagebox loading" style="height: 18vh;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-md-12 pb-2">
                                <div class="fakeImagebox loading" style="height: 10vh; "></div>
                            </div>
                            <div class="col-md-12 pb-2 mt-1">
                                <div class="loading" style="height: 17vh;">
                                </div>
                            </div>
                            <div class="col-md-12 pb-2 mt-1">
                                <div class="loading" style="height: 60vh;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `);
    }

    updateQty(data) {
        store.commit('updateQty', data)
    }
}