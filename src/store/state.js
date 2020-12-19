let stateObj = {
    selectedItems: localStorage.getItem('sdf') ? JSON.parse(localStorage.getItem('sdf')) : [],
    pd: localStorage.getItem('pdModal') ? JSON.parse(localStorage.getItem('pdModal')) : false,
    selectedProduct: localStorage.getItem('selectedProduct') ? JSON.parse(localStorage.getItem('selectedProduct')) : {},
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : []
};

export default stateObj;