import { mockFeedbackService } from '../../mockServices/mockFeedbackService';
// import apiClient from '../../services/apiClient';

export const feedbackService = {
  getFeedback: async (mpId) => {
    return await mockFeedbackService.getFeedback(mpId);
    // return await apiClient.get('/feedback', { params: { mpId } });
  }
};
