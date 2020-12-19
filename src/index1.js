import furFilter from './furFilter';
import furState from './store/store';

console.log(furState);
window.furPickerStates= furState;

new furFilter('.hello',{
    filters:['groupCheckbox'],
    modal: true
});