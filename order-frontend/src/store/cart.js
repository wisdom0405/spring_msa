function initState() {
    return {
        productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [], // 없으면 빈배열 꺼내옴
        totalQuantity: localStorage.getItem('totalQuantity') || 0 // 없으면 0으로 세팅
    }
}

const practice = {
    state: initState,
    mutations: {
        addCart(state, product) {
            const existProduct = state.productsInCart.find(p => p.id == product.id);
            if(existProduct){
                existProduct.quantity +=product.quantity;
            }else{
                state.productsInCart.push(product);
                
            }
            state.totalQuantity = parseInt(state.totalQuantity) + product.quantity; // parseInt안해주면 문자열로 이어져서 들어감
            // 로컬 스토리지에 데이터 직렬화하여 삽입
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
            localStorage.setItem('totalQuantity', state.totalQuantity);
        },
        clearCart(state){
            state.productsInCart = [];
            state.totalQuantity = 0;
            localStorage.removeItem('productsInCart');
            localStorage.removeItem('totalQuantity');
        }
    },
    actions: {
        addCart(context, product){
            context.commit('addCart', product);
        },
        clearCart(context){
            context.commit('clearCart');
        }
    },
    getters: {
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    },
}

export default practice