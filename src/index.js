import store from './store/index.js';

// Load up components
import FurPicker from './components/FurPicker.js';
import FurFilterList from './components/FurFilterList.js';
import FurSortFilter from './components/FurSortFilter.js';
import ProductsList from './components/ProductsList.js';
import ProductDetail from './components/ProductDetail.js';
import SizePicker from './components/SizePicker.js';
import ColorPicker from './components/ColorPicker.js';
import AddCart from './components/AddCart.js';


Object.assign(window, {
    FurPicker,
    FurFilterList,
    FurSortFilter,
    ProductsList,
    ProductDetail,
    SizePicker,
    ColorPicker,
    AddCart
})
new ProductsList(".productsList", {
    type:'checkbox',
    data:[
    ]
});

window.addCart = new AddCart('.cart-el', {});

window.perPriceFilter = new window.FurPicker(".ppFilter", {
    label: "Per Price Item",
    group: true,
    width: 350,
    data: [{
            label: "Price",
            type: "minmaxBox",
            data: [{
                    label: "Min",
                    measurement: "$"
                },
                {
                    label: "Max",
                    measurement: "$"
                }
            ]
        },
        {
            label: "Per Price Item",
            type: "checkbox",
            group: false,
            data: [{
                    label: "Under $250"
                },
                {
                    label: "$250 to $500"
                },
                {
                    label: "$500 to $1,000"
                },
                {
                    label: "$1,000 to $1,500"
                },
                {
                    label: "$1,500 to $2,000"
                },
                {
                    label: "$2,500 & Above"
                }
            ]
        }
    ]
});
window.FurPickerI = new window.FurPicker(".dFilter", {
    label: "Type / Design",
    group: true,
    width: 350,
    data: [{
            label: "Type",
            type: "imageBox",
            data: [{
                    label: "Sofa",
                    img: "/furniturecart/images/filterTest/1.jpg"
                },
                {
                    label: "Loveseat",
                    img: "/furniturecart/images/filterTest/2.jpg"
                },
                {
                    label: "Settee",
                    img: "/furniturecart/images/filterTest/3.jpg"
                },
                {
                    label: "Sleeper",
                    img: "/furniturecart/images/filterTest/4.jpg"
                },
                {
                    label: "Sofa Chaise",
                    img: "/furniturecart/images/filterTest/5.jpg"
                },
                {
                    label: "Convertible",
                    img: "/furniturecart/images/filterTest/6.jpg"
                }
            ]
        },
        {
            label: "Design",
            type: "imageBox",
            data: [{
                    label: "Standard",
                    img: "/furniturecart/images/filterTest/7.jpg"
                },
                {
                    label: "Chesterfield Sofa",
                    img: "/furniturecart/images/filterTest/8.jpg"
                },
                {
                    label: "Reclining",
                    img: "/furniturecart/images/filterTest/9.jpg"
                },
                {
                    label: "Sofa Bed",
                    img: "/furniturecart/images/filterTest/10.jpg"
                },
                {
                    label: "Curved",
                    img: "/furniturecart/images/filterTest/2.jpg"
                },
                {
                    label: "Modular",
                    img: "/furniturecart/images/filterTest/3.jpg"
                }
            ]
        }
    ]
});
window.FurPickerII = new window.FurPicker(".mFilter", {
    label: "Material",
    type: "imageBox",
    width: 350,
    data: [{
            label: "first",
            img: "/furniturecart/images/filterTest/2.jpg"
        },
        {
            label: "second",
            img: "/furniturecart/images/filterTest/1.jpg"
        },
        {
            label: "third",
            img: "/furniturecart/images/filterTest/4.jpg"
        },
        {
            label: "four",
            img: "/furniturecart/images/filterTest/6.jpg"
        },
        {
            label: "fifth",
            img: "/furniturecart/images/filterTest/7.jpg"
        },
        {
            label: "sixth",
            img: "/furniturecart/images/filterTest/10.jpg"
        },
        {
            label: "man",
            img: "/furniturecart/images/filterTest/3.jpg"
        },
        {
            label: "sofa",
            img: "/furniturecart/images/filterTest/1.jpg"
        },
        {
            label: "cat",
            img: "/furniturecart/images/filterTest/5.jpg"
        },
        {
            label: "elephant",
            img: "/furniturecart/images/filterTest/7.jpg"
        },
        {
            label: "monkey",
            img: "/furniturecart/images/filterTest/1.jpg"
        },
        {
            label: "lion",
            img: "/furniturecart/images/filterTest/10.jpg"
        }
    ]
});
window.colorFilter = new window.FurPicker(".cFilter", {
    label: "Color",
    type: "checkbox",
    data: [{
            label: "Gray"
        },
        {
            label: "Blue"
        },
        {
            label: "Brown"
        },
        {
            label: "Beige"
        },
        {
            label: "Green"
        },
        {
            label: "Black"
        },
        {
            label: "White"
        },
        {
            label: "Red"
        },
        {
            label: "Yellow"
        },
        {
            label: "Purple"
        },
        {
            label: "Pink"
        },
        {
            label: "Orange"
        }
    ]
});
window.furSortFilter = new window.FurSortFilter(".sortFilter", {
    label: "SortFilter",
    group: true,
    width: 350,
    buttonWidth: 150,
    data: [{
            label: "PriceRange",
            type: "minmaxBox",
            data: [{
                    label: "Min",
                    measurement: "$"
                },
                {
                    label: "Max",
                    measurement: "$"
                }
            ]
        },
        {
            label: "Price",
            type: "checkbox",
            group: false,
            data: [{
                    label: "Under $250"
                },
                {
                    label: "$250 to $500"
                },
                {
                    label: "$500 to $1,000"
                },
                {
                    label: "$1,000 to $1,500"
                },
                {
                    label: "$1,500 to $2,000"
                },
                {
                    label: "$2,500 & Above"
                }
            ]
        },
        {
            label: "Type",
            type: "imageBox",
            data: [{
                    label: "Sofa",
                    img: "/furniturecart/images/filterTest/1.jpg"
                },
                {
                    label: "Loveseat",
                    img: "/furniturecart/images/filterTest/2.jpg"
                },
                {
                    label: "Settee",
                    img: "/furniturecart/images/filterTest/3.jpg"
                },
                {
                    label: "Sleeper",
                    img: "/furniturecart/images/filterTest/4.jpg"
                },
                {
                    label: "Sofa Chaise",
                    img: "/furniturecart/images/filterTest/5.jpg"
                },
                {
                    label: "Convertible",
                    img: "/furniturecart/images/filterTest/6.jpg"
                }
            ]
        },
        {
            label: "Design",
            type: "imageBox",
            data: [{
                    label: "Standard",
                    img: "/furniturecart/images/filterTest/7.jpg"
                },
                {
                    label: "Chesterfield Sofa",
                    img: "/furniturecart/images/filterTest/8.jpg"
                },
                {
                    label: "Reclining",
                    img: "/furniturecart/images/filterTest/9.jpg"
                },
                {
                    label: "Sofa Bed",
                    img: "/furniturecart/images/filterTest/10.jpg"
                },
                {
                    label: "Curved",
                    img: "/furniturecart/images/filterTest/2.jpg"
                },
                {
                    label: "Modular",
                    img: "/furniturecart/images/filterTest/3.jpg"
                }
            ]
        },
        {
            label: "Material",
            type: "imageBox",
            width: 350,
            data: [{
                    label: "first",
                    img: "/furniturecart/images/filterTest/2.jpg"
                },
                {
                    label: "second",
                    img: "/furniturecart/images/filterTest/1.jpg"
                },
                {
                    label: "third",
                    img: "/furniturecart/images/filterTest/4.jpg"
                },
                {
                    label: "four",
                    img: "/furniturecart/images/filterTest/6.jpg"
                },
                {
                    label: "fifth",
                    img: "/furniturecart/images/filterTest/7.jpg"
                },
                {
                    label: "sixth",
                    img: "/furniturecart/images/filterTest/10.jpg"
                },
                {
                    label: "man",
                    img: "/furniturecart/images/filterTest/3.jpg"
                },
                {
                    label: "sofa",
                    img: "/furniturecart/images/filterTest/1.jpg"
                },
                {
                    label: "cat",
                    img: "/furniturecart/images/filterTest/5.jpg"
                },
                {
                    label: "elephant",
                    img: "/furniturecart/images/filterTest/7.jpg"
                },
                {
                    label: "monkey",
                    img: "/furniturecart/images/filterTest/1.jpg"
                },
                {
                    label: "lion",
                    img: "/furniturecart/images/filterTest/10.jpg"
                }
            ]
        },
        {
            label: "Color",
            type: "checkbox",
            data: [{
                    label: "Gray"
                },
                {
                    label: "Blue"
                },
                {
                    label: "Brown"
                },
                {
                    label: "Beige"
                },
                {
                    label: "Green"
                },
                {
                    label: "Black"
                },
                {
                    label: "White"
                },
                {
                    label: "Red"
                },
                {
                    label: "Yellow"
                },
                {
                    label: "Purple"
                },
                {
                    label: "Pink"
                },
                {
                    label: "Orange"
                }
            ]
        }
    ]
});
window.FurFilterListI = new window.FurFilterList(".llFilter", {});

