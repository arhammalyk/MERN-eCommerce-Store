export const apiHelper = async (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_LOCAL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in apiHelper:", error);
    throw error;
  }
};
