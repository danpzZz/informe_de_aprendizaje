import { apiFetch } from "./api";
import { InformeAprendizaje } from "@/interfaces/informeAprendizaje.interface";

export const crearInformeAprendizaje = async (data: InformeAprendizaje) => {
  return apiFetch("/informes", {
    method: "POST",
    body: JSON.stringify(data),
  });
};