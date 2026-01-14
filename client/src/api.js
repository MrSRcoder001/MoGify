const API_URL = 'http://localhost:5000/api';

export const uploadVideo = async (formData) => {
  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload video');
  }

  return response.json();
};

export const getAnalytics = async (videoId) => {
  const response = await fetch(`${API_URL}/analytics/${videoId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch analytics');
  }

  return response.json();
};

export const getAllVideos = async () => {
  const response = await fetch(`${API_URL}/videos`);

  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  return response.json();
};
