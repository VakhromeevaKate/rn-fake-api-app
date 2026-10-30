// api for /samples
import apiClient from "./client";
export interface Sample {
  id: number;
  [key: string]: any; 
}
export const getSamples = async () => {
  return apiClient.get<Sample[]>("/samples");
};
export const getSampleById = async (id: number) => {
  return apiClient.get<Sample>(`/samples/${id}`);
};
