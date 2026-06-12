const API_URL = "http://localhost:3000";

export const obtenerDatosInicialesInforme = async () => {
  const response = await fetch(`${API_URL}/informes/datos-iniciales/2`);

  if (!response.ok) {
    throw new Error("Error al obtener los datos del informe");
  }

  return response.json();
};

export const obtenerLearningLogs = async () => {
  const response = await fetch(`${API_URL}/informes/learning-logs/2`);

  if (!response.ok) {
    throw new Error("Error al obtener las semanas");
  }

  return response.json();
};

export const guardarLearningLogs = async (data: any) => {
  const response = await fetch(`${API_URL}/informes/learning-logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al guardar el cronograma");
  }

  return response.json();
};

export const eliminarLearningLog = async (id: number) => {
  const response = await fetch(`${API_URL}/informes/learning-logs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la semana");
  }

  return response.json();
};