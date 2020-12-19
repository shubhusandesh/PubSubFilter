export default {
    addItem(state, payload) {
        // state.selectedItems[payload.type].push(payload.value)
        if (!this.containsArr(state.selectedItems, payload)) {
            state.selectedItems.push(payload);
            localStorage.setItem('sdf', JSON.stringify(state.selectedItems));
        }
        return state;
    },
    clearItem(state, payload) {
        if (this.containsArr(state.selectedItems, payload)) {
            state.selectedItems = this.getRemainingArr(state.selectedItems, payload);
            localStorage.setItem('sdf', JSON.stringify(state.selectedItems));
        }
        return state;
    },
    ClearFilterItems(state) {
        state.selectedItems = [];
        localStorage.setItem('sdf', JSON.stringify(state.selectedItems));
        return state;
    },
    OpenProductDetail(state, payload) {
        state.pd = true;
        state.selectedProduct = payload;
        localStorage.setItem('pdModal', JSON.stringify(state.pd));
        return state;
    },
    closeProductDetail(state) {
        state.pd = false;
        localStorage.setItem('pdModal', JSON.stringify(state.pd));
        return state;
    },
    updateQty(state, payload) {
        if (state.selectedProduct && payload && payload != '') {
            state.selectedProduct.qty = payload;
            localStorage.setItem('selectedProduct', JSON.stringify(state.selectedProduct));
        }
        return state;
    },
    changeInput(state, payload) {
        if (this.containsItem(state.selectedItems, payload.type)) {
            state.selectedItems = this.getRemainingItem(state.selectedItems, payload.type);
        }
        if (payload.value || payload.value != '') {
            state.selectedItems.push(payload);
        }
        localStorage.setItem('sdf', JSON.stringify(state.selectedItems));
        return state;
    },
    selectSize(state, payload) {
        if (state.selectedProduct && payload && payload != '') {
            state.selectedProduct.size = payload;
            localStorage.setItem('selectedProduct', JSON.stringify(state.selectedProduct));
        }
        return state;
    },
    selectColor(state, payload) {
        if (state.selectedProduct && payload && payload != '') {
            state.selectedProduct.color = payload;
            localStorage.setItem('selectedProduct', JSON.stringify(state.selectedProduct));
        }
        return state;
    },

    addSelectedToCart(state) {
        if (state.selectedProduct) {
            let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
            state.selectedProduct.id = cart.length + 1;
            cart.unshift(state.selectedProduct);
            Cookies.set('cart', JSON.stringify(cart));
            localStorage.setItem('selectedProduct', JSON.stringify(state.selectedProduct));
        }
        return state;
    },
    deletedFromCart(state, payload) {

        let cart = JSON.parse(Cookies.get('cart'));
        cart = this.getRemainingItemFromCart(cart, payload);
        state.cart = cart;
        Cookies.set('cart', JSON.stringify(cart));
        localStorage.setItem('selectedProduct', JSON.stringify(state.selectedProduct));
        return state;
    },
    //helpers
    containsArr(arr, obj) {
        return arr.filter(item => item.type == obj.type && item.value == obj.value ? true : false).length
    },
    getRemainingArr(arr, obj) {
        return arr.filter(item => !(item.type == obj.type && item.value == obj.value));
    },
    getRemainingItemFromCart(cart, id) {

        return cart.filter(item => !(item.id == id));
    },
    containsItem(arr, item) {
        return arr.filter(arrItem => arrItem.type == item).length
    },
    getItem(arr, item) {
        return arr.filter(arrItem => (arrItem.type == item));
    },
    getRemainingItem(arr, item) {
        return arr.filter(arrItem => (arrItem.type !== item));
    }

};