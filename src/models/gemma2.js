import { config } from "../config/config.js";

const llm = async ({ messages, temperature = 0.7 }) => {
  try {
    const response = await fetch(`${config.apiURL}${config.chatEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature,
        max_tokens: 400 
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    
    // Log the entire response for debugging
    console.log("Full response:", JSON.stringify(data, null, 2));

    // Handle different possible response structures
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content || "No response from the model.";
    } else if (data.message && data.message.content) {
      return data.message.content;
    } else if (data.text) {
      return data.text;
    } else {
      console.error("Unexpected response structure:", data);
      return "No response from the model.";
    }
  } catch (error) {
    console.error("Error calling the model:", error);
    return "An error occurred while generating the response.";
  }
};

export default llm;
