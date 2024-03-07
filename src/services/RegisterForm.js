import { registerActions } from "../actions/registerActions"
import MetricsAxios from "../config/MetricsAxios"

const post=(request)=>{
    return MetricsAxios.post(`register/userName=${request.username}&password=${request.password}&email=${request.email}&departmentName=${request.departmentName}`)
}
const RegisterForm={
    post,
}
export default RegisterForm