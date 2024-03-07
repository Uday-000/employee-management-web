
import MetricsAxios from "../config/MetricsAxios";

const get=(search,selectedDepartment)=>{
    console.log(selectedDepartment);
    console.log(search.name)
    return MetricsAxios.get(`findUsers?serachTerm=${search.name}&departmentName=${selectedDepartment}`)
}
const Filters={
    get,
}
export default Filters;