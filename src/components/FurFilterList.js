
import Component from '../lib/component.js';
import store from '../store/index.js';

export default class FurPickerList extends Component {
    
    // Pass our store instance and the HTML element up to the parent Component
    constructor(el,settings) {
        super({
            store,
            element : $(el).first(),
            settings
        });
        this.store = store;
        this.settings = settings;
        this.element = $(el).first();
        this.numberMode= true;
        this.numberModeMax = 2;
        this.renderUI();
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        self.element.find('.fur-filter_bar').empty()
        self.renderFilters(self.settings);
    }

    renderUI(){
        let self = this;
        self.element.prepend('<div class="fur-filter_bar mt-3"></div>');
        self.render();
    }

    renderFilters(settings){
        let self= this;
        let temp = ''
        let items= self.store.state.selectedItems;
        if(self.store.state.selectedItems.length){
            if(self.numberMode && items.length > self.numberModeMax){
                for(let i = 0 ;  i < self.numberModeMax; i++){
                    temp+='<span class=" fur-filter_bar-i"><a href="javascript:;" rel="clearFilter" data-type="'+items[i].type+'" data-val="'+items[i].value+'">'+self.capitalizeFirstLetter(items[i].type)+' : '+self.getMeasurement(items[i])+self.capitalizeFirstLetter(items[i].value)+'</a></span>';
                }
                temp+='<span class=" fur-filter_bar-i noCross"><a href="javascript:;" rel="expandList" >+'+(items.length - self.numberModeMax)+'</a></span>';
            }
            else{
                $(items).each(function(key, list){
                    temp+='<span class=" fur-filter_bar-i"><a href="javascript:;" rel="clearFilter" data-type="'+list.type+'" data-val="'+list.value+'">'+self.capitalizeFirstLetter(list.type)+' : '+self.getMeasurement(list)+self.capitalizeFirstLetter(list.value)+'</a></span>';
                });
                if(items.length > self.numberModeMax){
                     temp+='<span class=" fur-filter_bar-i noCross"><a href="javascript:;"  rel="disburseList">Show Less</a></span>';
                }
            }
            temp+='<span class=" fur-filter_bar-i"><a href="javascript:;" rel="clearFilters">Clear All</a></span>';
        }

        self.element.find('.fur-filter_bar').append(temp);

        self.element.find('[rel="clearFilters"]').off('click').on('click',function(e){
            e.stopPropagation();
           return store.commit('ClearFilterItems');
        })
        self.element.find('[rel="clearFilter"]').off('click').on('click',function(e){
            e.stopPropagation();
            let data = {type: $(this).attr('data-type'),value : $(this).attr('data-val')};
            return store.dispatch('clearItem',data);
            
        })  
        self.element.find('[rel="expandList"]').off('click').on('click',function(e){
            e.stopPropagation();
           self.numberMode = false;
           self.render();
        })
        self.element.find('[rel="disburseList"]').off('click').on('click',function(e){
            e.stopPropagation();
           self.numberMode = true;
           self.render();
        })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    containsArr(arr,obj){
        return arr.filter(item=>item.type==obj.type &&item.value == obj.value ? true : false).length
    }
    
    getMeasurement(list)
    {
        return (typeof list.measurement != undefined && list.measurement) ? list.measurement+' ' : ' ';
    }
};