const BASE_URL = "http://localhost:5000";

// Get all lessons
export async function fetchLessons() {
  const res = await fetch(`${BASE_URL}/lessons`);
  if (!res.ok) throw new Error("Failed to fetch lessons");
  return await res.json();
}

// Create order
export async function createOrder(order) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order), // send order data
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // returns { message, order }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}


// Cancel order
export async function cancelOrder(orderId) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to cancel order");
  return await res.json();
}

// Update lesson spaces
export async function updateLessonSpaces(lessonId, newSpaces) {
  const res = await fetch(`${BASE_URL}/lessons/${lessonId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ spaces: newSpaces }),
  });
  if (!res.ok) throw new Error("Failed to update lesson spaces");
  return await res.json();
}

