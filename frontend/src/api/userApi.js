const BASE_URL = 'http://localhost:8000/api';

export const signUpForEvent = async (eventId, userId) => {
  try {
    console.log("User ID: ", userId);
    console.log("Event ID: ", eventId);

    const response = await fetch(`${BASE_URL}/users/sign-up-for-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, eventId }),  // Correctly stringify the body
    });

    // Parse the response JSON
    const data = await response.json();

    // Check for any non-OK response
    if (!response.ok) {
      // Handle server error messages
      console.error("Server error message:", data?.message || 'Unknown error');
      throw new Error(data?.message || 'Error signing up for event');
    }

    return data;  // Return the successful data
  } catch (error) {
    console.error('Error signing up for event:', error.message);
    throw error;  // Re-throw the error if further handling is needed
  }
};

export const rsvpOutFromEvent = async (eventId, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/rsvp-out-for-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, eventId }),  // Correctly stringify the body
    });

    // Parse the response JSON
    const data = await response.json();

    // Check for any non-OK response
    if (!response.ok) {
      // Handle server error messages
      console.error("Server error message:", data?.message || 'Unknown error');
      throw new Error(data?.message || 'Error RSVPing out from event');
    }

    return data;  // Return the successful data
  } catch (error) {
    console.error('Error RSVPing out from event:', error.message);
    throw error;  // Re-throw the error if further handling is needed
  }
};


export const userSignUp = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/user-sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

export const userSignIn = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/user-sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
  }
};