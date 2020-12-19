import { pubsub } from './lib/pubsub.js';

const furFilter= function(el, settings){
		let that = $(el);
		function init(){
			let furpicker=[];
			let target, id;

			target= that;
			id = target.attr('id');

			if(!id){
				id = uuidv4();
				target.attr('id',id);
			}

			settings = $.extend({
				label: 'select something',
				container: id,
				width: 150
			}, settings);
			
			renderUI(id, target,settings);

			if(settings.group){
				$(settings.data).each((dKey, dData)=>{
					dData = $.extend({
						group: true,
					}, dData)
					renderChildren(id , dData);
				})
			}else{
				renderChildren(id , settings);
			}
			

			$(document).off('change','[rel="furFilterClick"]').on('change','[rel="furFilterClick"]',function(e){
				let type = $(this).data('type');
				let val = $(this).data('val');
				let state = {
					[type] :  val
				};
				furPickerStates.setState(state);
			})

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
			target.prepend(`
			<div class="m-fur_multiselect" id="${id}_furpicker" style="width:${ settings.width}px;">
				<div class="selectBox">
					<select>
					<option>${typeof settings.label!== undefined? settings.label :'Select an Item' }</option>
					</select>
					<div class="overSelect"></div>
				</div>
				<div id="furcheckboxes_${id}" class="fur-checkboxes">
				</div>
			</div>
				`
			);
		}

		function renderChildren(id,data){
			let checkboxC= $('#'+id).find('#furcheckboxes_'+id);
			if(data.type=='checkbox'){
				renderCheckboxList(checkboxC,data)
			}
			if(data.type=='imageBox'){
				renderImageBoxList(checkboxC,data)
			}
			if(data.type=='minmaxBox'){
				renderMinMaxInput(checkboxC,data)
			}
		}

		function renderMinMaxInput(container,settings)
		{
			let temp = ''
			const filterTypes = ['minmaxBox','checkbox','imageBox'];
			if(filterTypes.includes(settings.type)){
				
				temp+='<div class="fur-box_type '+settings.type+'"><h6 class="fur-box_title">'+settings.label+'</h6><div class="fur-box_items">'
				
				$(settings.data).each(function(key, list){
					temp+=`
					<div class="fur-box_item">
						<label class="fur-minmaxBox_container">
							<span class="fur-minmaxBox-label">${capitalizeFirstLetter(list.label)}</span>
							<span class="fur-minmaxBox-m">${capitalizeFirstLetter(list.measurement)}</span>
							<input type="text" name="min" class="fur-minmaxBox-i" rel="furFilterClick" data-type="${settings.type}"  data-val="${list.label}" />
						</label>
					</div>
					`;
				})
				temp+='</div/></div>';
			}
			container.append(temp)
		}


		function renderCheckboxList(container,settings){
			let temp = ''
			const filterTypes = ['minmaxBox','checkbox','imageBox'];
			if(filterTypes.includes(settings.type)){
				temp+='<div class="fur-box_type '+settings.type+'"><h6 class="fur-box_title">'+settings.label+'</h6><div class="fur-box_items">'
				$(settings.data).each(function(key, list){
					temp+=`
						<div class="fur-box_item d-flex">
							<label class="fur-checkbox_container">
								<input type="checkbox" name="radio" data-type="${settings.type}"  data-val="${list.label}" rel="furFilterClick">
								<span class="fur-checkbox_checkmark"></span>
								<span class="fur-checkbox-label">${capitalizeFirstLetter(list.label)}</span>
							</label>
						</div>
					`;
				});
				temp+='</div/></div>';
			}

			container.append(temp)
		}

		function renderImageBoxList(container,settings){
			let temp = ''

			const filterTypes = ['minmaxBox','checkbox','imageBox'];
			if(filterTypes.includes(settings.type)){
				temp+='<div class="fur-box_type '+settings.type+'"><h6 class="fur-box_title">'+settings.label+'</h6><div class="fur-box_items">'
				$(settings.data).each(function(key, list){
					temp+=`
					<div class="fur-box_item d-flex">
						<label class="fur-imagebox_container">
							<input type="checkbox" name="radio" rel="furFilterClick" data-type="${settings.type}"  data-val="${list.label}">
							<img class="fur-box_item-img" src="${typeof list.img!==undefined? list.img : '/media/no-image.png'}" alt="" style="height :40px; width:100%;">
							<span class="fur-checkbox-label">${capitalizeFirstLetter(list.label)}</span>
						</label>
					</div>
					`;
				})
				temp+='</div/></div>';
			}
			container.append(temp)

		}

		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		return init();

}

export default furFilter;