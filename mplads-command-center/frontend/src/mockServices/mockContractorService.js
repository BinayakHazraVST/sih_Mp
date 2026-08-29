import { MOCK_CONTRACTORS } from '../mock/contractors';

export const mockContractorService = {
  getContractors: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_CONTRACTORS;
  },

  getContractorById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const contractor = MOCK_CONTRACTORS.find(c => c.id === id);
    if (!contractor) throw new Error(`Contractor with ID ${id} not found.`);
    return contractor;
  }
};
