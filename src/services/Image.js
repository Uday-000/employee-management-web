import MetricsAxios from "../config/MetricsAxios";

const post = (ItemId, formData) => {
  return MetricsAxios.post(`imageUpload/${ItemId}`, formData);
};

const Image = {
  post,
};

export default Image;