async function main() {
  // URL base del servidor local y la clave API
  const baseUrl = "http://localhost:1234/v1";

  // Configura los parámetros para la solicitud
  const requestBody = {
    model: "gemma-2-2b-it",  // Reemplaza con el identificador del modelo que estás utilizando en LM Studio
    messages: [
      { role: "user", content: "hola" }
    ],
    temperature: 0.7
  };

  try {
    // Realiza la solicitud HTTP POST al servidor local
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    // Analiza la respuesta en formato JSON
    const data = await response.json();

    // Muestra el mensaje completado en la consola
    console.log(data.choices[0].message?.content);
  } catch (error) {
    console.error("Error fetching completion:", error);
  }
}

// Ejecuta la función principal
main();
