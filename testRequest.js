import fetch from 'node-fetch';

async function testBackend() {
  const baseUrl = "http://localhost:4321/api/chat"; // Asegúrate de que el puerto y la ruta coincidan con tu configuración

  const requestBody = {
    question: "¿Dime un rol de la metodologia AUP-UCI?", // Pregunta para probar
  };

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Respuesta del Backend:", data.answer.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

testBackend().catch(console.error);
