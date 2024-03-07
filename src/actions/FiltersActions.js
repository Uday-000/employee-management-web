
import Filters from '../services/Filters';
export const FILTER_FORM='FILTER_FORM';

export const FiltersActions = ({search,selectedDepartment}) =>async(dispatch) =>{
 try{
    const response=await Filters.get(search,selectedDepartment);
    dispatch({
        type:FILTER_FORM,
        payload:response.data
    })
    return Promise.resolve(response.data)
}catch(error){
    return Promise.reject(error)

}
}