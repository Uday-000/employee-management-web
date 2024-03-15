import RegisterForm from "../services/RegisterForm";
export const REGISTER_FORM = "REGISTER_FORM";

export const registerActions = (request) => async (dispatch) => {
  try {
    const response = await RegisterForm.post(request);
    dispatch({
      type: REGISTER_FORM,
      payload: response,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};
