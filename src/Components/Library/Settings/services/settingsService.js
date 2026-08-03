import api from "../../../../Components/Common/axiosConfig";

/**
 * GET ALL
 */
export const getAll = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

/**
 * GET BY ID
 */
export const getById = async (endpoint, id) => {
  const response = await api.get(`${endpoint}/${id}`);
  return response.data;
};

/**
 * CREATE
 */
export const create = async (endpoint, name) => {
  const response = await api.post(endpoint, {
    name: name.trim(),
  });

  return response.data;
};

/**
 * UPDATE
 */
export const update = async (endpoint, id, name) => {
  const response = await api.put(`${endpoint}/${id}`, {
    name: name.trim(),
  });

  return response.data;
};

/**
 * DELETE
 */
export const remove = async (endpoint, id) => {
  await api.delete(`${endpoint}/${id}`);
};

/**
 * CREATE RESOURCE (multi-field)
 */
export const createResource = async (data) => {
  const response = await api.post("/resources", data);
  return response.data;
};

/**
 * UPDATE RESOURCE (multi-field)
 */
export const updateResource = async (id, data) => {
  const response = await api.put(`/resources/${id}`, data);
  return response.data;
};