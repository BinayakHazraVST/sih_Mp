import { mockContractorService } from '../../mockServices/mockContractorService';
// import apiClient from '../../services/apiClient';

export const contractorService = {
  getContractors: async () => {
    return await mockContractorService.getContractors();
    // return await apiClient.get('/contractors');
  },

  getContractorById: async (id) => {
    return await mockContractorService.getContractorById(id);
    // return await apiClient.get(`/contractors/${id}`);
  }
};
