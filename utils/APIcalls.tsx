import api from "./axiosInstance";
import { ApartmentType } from "./types";

export const getApartments = async () => {
  return await api.get("/nawy/apartments/");
};

export const getApartmentDetails = async (apartmentId: number) => {
  return await api.get(`/nawy/apartments/${apartmentId}`);
};

export const addApartment = async (apartmentData: ApartmentType) => {
  return await api.post(`/nawy/apartments/add`, { ...apartmentData });
};
