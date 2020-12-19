import Component from '../lib/component.js';
import store from '../store/index.js';
import ProductDetail from './ProductDetail.js';

export default class ProductList extends Component {

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
            skeletonNumber: 8
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
        self.runAjax();
    }

    runAjax() {
        this.setSkeleton();
        let fakeData = [{
                name: 'Sofa',
                img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-082420-ghi-best-sofas-1598293488.png?crop=0.798xw:0.613xh;0.101xw,0.281xh&resize=640:*',
                img_alt: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-082420-ghi-best-sofas-1598293488.png?crop=0.798xw:0.613xh;0.101xw,0.281xh&resize=640:*'
            },
            {
                name: 'Table',
                img: 'https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dw9fc54f37/images/530000/533591.jpg',
                img_alt: 'https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dw9fc54f37/images/530000/533591.jpg'
            },
            {
                name: 'Rug',
                img: 'https://images-na.ssl-images-amazon.com/images/I/713szQZJQRL._AC_SX522_.jpg',
                img_alt: 'https://images-na.ssl-images-amazon.com/images/I/713szQZJQRL._AC_SX522_.jpg'
            },
            {
                name: 'Recliner',
                img: 'https://images-na.ssl-images-amazon.com/images/I/61K1UA8EbeL._AC_SL1500_.jpg',
                img_alt: 'https://images-na.ssl-images-amazon.com/images/I/61K1UA8EbeL._AC_SL1500_.jpg'
            }
        ]
        setTimeout(() => {
            this.renderProducts(fakeData)
        }, 2000)
    }
    renderProducts(data) {
        let self = this;
        let sHtml = ''

        if (data.length) {
            $(data).each(function (pKey, product) {
                sHtml += `
                <div class="col-xl-3 col-md-6 col-sm-12 col-grid-box">
                <div class="product-box product-wrap">
                    <div class="img-wrapper">
                        <div class="lable-block"><span class="lable3">new</span> <span class="lable4">on
                                sale</span></div>
                        <div class="front">
                            <a href="product-page(no-sidebar).html"><img src="${typeof product.img !=='undefined'?product.img:'furniture/images/fiterTest/1.jpg'}" class="img-fluid  lazyload bg-img" alt=""></a>
                        </div>
                        <div class="back">
                            <a href="product-page(no-sidebar).html"><img src="${typeof product.img_alt !=='undefined'?product.img_alt:'furniture/images/fiterTest/1_alt.jpg'}" class="img-fluid  lazyload bg-img" alt=""></a>
                        </div>
                        <div class="cart-box">
                            <button class="openPDModal" title="Add to cart"><i class="fa fa-eye"></i>View</button>
                        </div>
                    </div>
                    <div class="product-detail text-center">
                        <div class="rating"><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                        </div>
                        <a href="product-page(no-sidebar).html">
                            <h6>${self.capitalizeFirstLetter(product.name)}</h6>
                        </a>
                        <h4>$286.99</h4>
                        <ul class="color-variant">
                            <li class="bg-light0"></li>
                            <li class="bg-light1"></li>
                            <li class="bg-light2"></li>
                        </ul>
                    </div>
                </div>
            </div>
                `;
            });
        }

        self.element.find('.append_ps-list').html(sHtml);

        self.element.find('.openPDModal').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let pdetail = new ProductDetail('.details', {
                pid: 1,
                name: "Women Pink Shirt",
                inv_id: 1,
            });
        })
    }
    setSkeleton() {
        let self = this;
        let sHtml = ''
        console.log(self.settings.skeletonNumber);
        if (self.settings.skeletonNumber) {
            for (let i = 0; i < self.settings.skeletonNumber; i++) {
                sHtml += '<div class="col-xl-3 col-md-6 col-sm-12 col-grid-box"><div class="card skeleton-card"></div></div>';
            }
        }
        self.element.find('.append_ps-list').html(sHtml);
    }

    renderUI() {
        let self = this;
        self.element.prepend('<section class="section-b-space ratio_asos py-0"><div class="collection-wrapper"><div class="container"><div class="row"><div class="collection-content col"><div class="page-main-content"><div class="row"><div class="col-md-12"><div class="collection-product-wrapper"><div class="product-wrapper-grid"><div class="row margin-res append_ps-list"></div></div></div></div></div></div></div></div></div></div></section>');
        self.render();
    }




    //helpers
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