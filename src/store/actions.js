export default {
    addItem(context, payload) {
        context.commit('addItem', payload);
    },
    clearItem(context, payload) {
        context.commit('clearItem', payload);
    },
    changeInput(context,payload){
    	context.commit('changeInput',payload)
    }
};