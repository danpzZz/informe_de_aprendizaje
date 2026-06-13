import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class InformesService {
  constructor(private readonly dataSource: DataSource) {}

  async getDatosIniciales(internshipId: number) {
    const result = await this.dataSource.query(
      `
      SELECT
        i.id AS "internshipId",
        c.name AS "empresaFormadora",
        CONCAT(estudiante.names, ' ', estudiante.lastnames) AS "estudiante",
        estudiante.cedula AS "cedula",
        CONCAT(docente.names, ' ', docente.lastnames) AS "tutorAcademico",
        CONCAT(tutor.names, ' ', tutor.lastnames) AS "tutorEmpresarial",
        ca.name AS "carrera",
        ap.name AS "cicloAcademico",
        i.internship_objective AS "objetivo",
        i.start_date AS "fechaInicio",
        i.end_date AS "fechaFin",
        i.status AS "estado"
      FROM internships i
      LEFT JOIN users estudiante ON estudiante.id = i.student_id
      LEFT JOIN users docente ON docente.id = i.teacher_id
      LEFT JOIN users tutor ON tutor.id = i.tutor_id
      LEFT JOIN companies c ON c.id = i.company_id
      LEFT JOIN careers ca ON ca.id = i.career_id
      LEFT JOIN academic_periods ap ON ap.id = i.academic_period_id
      WHERE i.id = $1
      LIMIT 1;
      `,
      [internshipId],
    );

    if (!result.length) {
      return {
        message: 'No se encontró información para esta práctica.',
      };
    }

    return result[0];
  }

  async getLearningLogs(internshipId: number) {
    const result = await this.dataSource.query(
      `
      SELECT
        id,
        week AS "semana",
        date AS "fecha",
        department AS "puestoAprendizaje",
        activities AS "actividadesRealizadas",
        learned AS "actividadesAutonomas",
        observations AS "observaciones"
      FROM learning_logs
      WHERE internship_id = $1
      ORDER BY week ASC;
      `,
      [internshipId],
    );

    return result.map((item) => ({
      id: item.id,
      semana: String(item.semana ?? ''),
      fecha: item.fecha ? item.fecha.toISOString().substring(0, 10) : '',
      puestoAprendizaje: item.puestoAprendizaje ?? '',
      actividadesRealizadas: item.actividadesRealizadas ?? '',
      actividadesAutonomas: item.actividadesAutonomas ?? '',
      observaciones: item.observaciones ?? '',
    }));
  }

  async guardarLearningLogs(body: any) {
    const { internshipId, semanas } = body;

    if (!internshipId) {
      return {
        success: false,
        message: 'No se recibió el ID de la práctica.',
      };
    }

    if (!Array.isArray(semanas) || semanas.length === 0) {
      return {
        success: false,
        message: 'No se recibieron semanas para guardar.',
      };
    }

    for (const item of semanas) {
      if (item.id) {
        await this.dataSource.query(
          `
          UPDATE learning_logs
          SET
            week = $1,
            date = $2,
            department = $3,
            activities = $4,
            learned = $5,
            observations = $6,
            updated_at = NOW()
          WHERE id = $7;
          `,
          [
            Number(item.semana),
            item.fecha || null,
            item.puestoAprendizaje || '',
            item.actividadesRealizadas || '',
            item.actividadesAutonomas || '',
            item.observaciones || '',
            Number(item.id),
          ],
        );
      } else {
        await this.dataSource.query(
          `
          INSERT INTO learning_logs (
            internship_id,
            week,
            date,
            department,
            activities,
            learned,
            observations,
            created_at,
            updated_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW());
          `,
          [
            Number(internshipId),
            Number(item.semana),
            item.fecha || null,
            item.puestoAprendizaje || '',
            item.actividadesRealizadas || '',
            item.actividadesAutonomas || '',
            item.observaciones || '',
          ],
        );
      }
    }

    return {
      success: true,
      message: 'Cronograma guardado correctamente.',
    };
  }

  async eliminarLearningLog(id: number) {
    await this.dataSource.query(
      `
      DELETE FROM learning_logs
      WHERE id = $1;
      `,
      [id],
    );

    return {
      success: true,
      message: 'Semana eliminada correctamente.',
    };
  }
}