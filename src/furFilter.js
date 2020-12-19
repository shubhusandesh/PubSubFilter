import furPicker from './furPicker';
import { pubsub } from './lib/pubsub';

const furFilter= function(el, settings){
    const that = $(el);
    let filters= [];
    function init(){
        let target, id;
        target= that;
        id = target.attr('id');
        if(!id){
            id = uuidv4();
            target.attr('id',id);
        }
        renderUI(id, target, settings);
        if(settings.modal){
            renderModal(id, target, settings);
        }
        renderFilters(id, target, settings);
    }

    function renderModal(id, target, settings){
        target.find('.fur-filter_Lists').append(`
        <div style="width: 200px;">
        <button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#exampleModalCenter">Sort & Filter</button>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document" style="margin: 0;
            margin-left: auto;">
                <div class="modal-content" style="height:100vh;">
                    <div class="modal-header d-flex justify-content-start">
                        <button type="button" class="close ml-0 " data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="exampleModalLongTitle">Sort & Filter</h5>
                    </div>
                    <div class="modal-body">
                    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary w-100" data-dismiss="modal">Show All Results</button>
                    </div>
                </div>
            </div>
       <div>
        `)
    }

    function renderFilters(id, target, settings){
        let container = target.find('.fur-filter_Lists')
        $(settings.filters).each((fKey , fType) =>{
            if(fType == 'checkbox'){
           
                container.prepend(`
                    <div id="fur-${fType}_filter_${id}" class="fur-${fType}_filter"></div>
                `)
                filters[fType] = new furPicker('#fur-'+fType+'_filter_'+id,{
                    type: 'checkbox',
                    width: 150,
                    label: 'Size',
                    data:[{label:'first'},
                        {label:'second'},
                        {label:'third'}]
                })
            }

            if(fType == 'groupCheckbox'){
                container.prepend(`
                    <div id="fur-${fType}_filter_${id}" class="fur-${fType}_filter"></div>
                `)
                filters[fType] = new furPicker('#fur-'+fType+'_filter_'+id,
                {
                    label: 'Size',
                    group: true,
                    width: 350,
                    data:[
                        {
                            label: 'Price',
                            type: 'minmaxBox',
                            data:[ 
                                    {label:'Min', measurement:'$'},
                                    {label:'Max', measurement:'$'}
                                ]
                        },
                       {
                        label: 'material',
                        type: 'checkbox',
                        data:[ 
                                {label:'first'},
                                {label:'second'},
                                {label:'third'}
                            ]
                       },
                       {
                        label: 'material',
                        type: 'imageBox',
                        data:[ 
                                {label:'first'},
                                {label:'second'},
                                {label:'third'}
                            ]
                       },
                       {
                        label: 'material',
                        type: 'imageBox',
                        data:[ 
                                {label:'first'},
                                {label:'second'},
                                {label:'third'}
                            ]
                       },
                       {
                        label: 'material',
                        type: 'checkbox',
                        data:[ 
                                {label:'first'},
                                {label:'second'},
                                {label:'third'}
                            ]
                       }
                    ]
                })
            }

            if(fType == 'imageBox'){
                container.prepend(`
                    <div id="fur-${fType}_filter_${id}" class="fur-${fType}_filter"></div>
                `)
                filters[fType] = new furPicker('#fur-'+fType+'_filter_'+id,{
                    type: 'imageBox',
                    label: 'Type',
                    width: 350,
                    data:[{label:'Sofa', img:'images/no-image.png'},
                        {label:'Loveseat', img:'images/no-image.png'},
                        {label:'Sleeper', img:'images/no-image.png'},
                        {label:'Settee', img:'images/no-image.png'},
                        {label:'Sofa Chaise', img:'furniturecart/images/pro3/2.jpg'},
                        {label:'Convertible', img:'furniturecart/images/pro3/1.jpg'},
                        {label:'Convertible2', img:'furniturecart/images/pro3/1.jpg'},
                        {label:'Convertible3', img:'furniturecart/images/pro3/1.jpg'},
                        {label:'Convertible4', img:'furniturecart/images/pro3/1.jpg'},
                        {label:'Sofa Chaise1', img:'furniturecart/images/pro3/35.jpg'},
                        {label:'Sofa Chaise2', img:'furniturecart/images/pro3/35.jpg'},
                        {label:'Sofa Chaise3', img:'furniturecart/images/pro3/35.jpg'},
                        {label:'Sofa Chaise4', img:'furniturecart/images/pro3/35.jpg'},
                    ]
                })
            }

            
        });

    }


    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function renderUI(id, target ,settings){
        target.contents().each(function(i, node) {
            node = $(node);
            if (!node.is('.')) {
                node.remove();
            }
        });
        target.append(`
        <div class="container">
            <div class="row m-fur_filter-bar">
                <div class="col-md-12">
                    <div class=" fur-filter_Lists d-flex" id="fur-filter_Lists_${id}">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="fur-filter_bar">
                   
                        <span class=" fur-filter_bar-i"><a href="">Clear All</a></span>
                    </div>
                </div>
            </div>
        </div>
            `
        );
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return init();
}
export default furFilter;