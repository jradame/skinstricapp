const API_URL = 'https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne';

export const skinstricAPI = {
  async analyzeSkin(data) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error calling skinstric API:', error);
      throw error;
    }
  }
};
