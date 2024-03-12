
import Image from "../services/Image";

export const Image_Form = 'Image_Form';

export const ImageAction = ({ ItemId, formData }) => async (dispatch) => {
  try {
    const response = await Image.post(ItemId, formData);
    dispatch({
      type: Image_Form,
      payload: response.data
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};