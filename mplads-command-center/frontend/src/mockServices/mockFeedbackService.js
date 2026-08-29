import { MOCK_FEEDBACK } from '../mock/feedback';

export const mockFeedbackService = {
  getFeedback: async (mpId = "MP001") => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_FEEDBACK[mpId] || MOCK_FEEDBACK["MP001"];
  }
};
