import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  obtenerDatosInicialesInforme,
  obtenerLearningLogs,
  guardarLearningLogs,
  eliminarLearningLog,
} from "@/services/informeAprendizajeService";

type Semana = {
  id?: number;
  semana: string;
  fecha: string;
  puestoAprendizaje: string;
  actividadesRealizadas: string;
  actividadesAutonomas: string;
  observaciones: string;
};

export default function InformeAprendizajeScreen() {
  const [form, setForm] = useState({
    codigo: "DS-010206",
    version: "1.0",
    elaboracion: "06-06-2023",
    actualizacion: "06-06-2023",
    institucion:
      "INSTITUTO SUPERIOR TECNOLÓGICO DE TURISMO Y PATRIMONIO YAVIRAC",
    macroproceso: "MACROPROCESO 01 DOCENCIA",
    proceso:
      "PROCESO 02 PROCESO DE FORMACIÓN PRÁCTICA EN EL ENTORNO LABORAL REAL - FORMACIÓN DUAL",
    formato: "FORMATO 06 BITÁCORA DE APRENDIZAJE DE FASE PRÁCTICA",
    empresaFormadora: "",
    nivel: "",
    estudiante: "",
    cicloAcademico: "",
    cedula: "",
    fechaInicio: "",
    fechaFin: "",
    tutorAcademico: "",
    nucleoEstructurante: "DESARROLLO WEB FRONT END",
    tutorEmpresarial: "",
    carrera: "",
    objetivo: "",
    reflexion: "",
    observaciones: "",
  });

  const [semanas, setSemanas] = useState<Semana[]>([
    {
      semana: "1",
      fecha: "",
      puestoAprendizaje: "",
      actividadesRealizadas: "",
      actividadesAutonomas: "",
      observaciones: "",
    },
  ]);

  useEffect(() => {
    cargarFormulario();
  }, []);

  const cargarFormulario = async () => {
    try {
      const data = await obtenerDatosInicialesInforme();

      setForm((prev) => ({
        ...prev,
        empresaFormadora: data.empresaFormadora || "",
        estudiante: data.estudiante || "",
        cedula: data.cedula || "",
        tutorAcademico: data.tutorAcademico || "",
        tutorEmpresarial: data.tutorEmpresarial || "",
        carrera: data.carrera || "",
        cicloAcademico: data.cicloAcademico || "",
        objetivo: data.objetivo || "",
        fechaInicio: data.fechaInicio ? data.fechaInicio.substring(0, 10) : "",
        fechaFin: data.fechaFin ? data.fechaFin.substring(0, 10) : "",
      }));

      const logs = await obtenerLearningLogs();

      if (logs.length > 0) {
        setSemanas(logs);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudieron cargar los datos del formulario");
    }
  };

  const setValue = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const setSemanaValue = (
    index: number,
    field: keyof Semana,
    value: string
  ) => {
    const nuevasSemanas = [...semanas];
    nuevasSemanas[index][field] = value as never;
    setSemanas(nuevasSemanas);
  };

  const agregarSemana = () => {
    setSemanas([
      ...semanas,
      {
        semana: String(semanas.length + 1),
        fecha: "",
        puestoAprendizaje: "",
        actividadesRealizadas: "",
        actividadesAutonomas: "",
        observaciones: "",
      },
    ]);
  };

  const guardarFormulario = async () => {
    try {
      const data = {
        internshipId: 2,
        semanas,
      };

      const response = await guardarLearningLogs(data);

      Alert.alert("Correcto", response.message);
      await cargarFormulario();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo guardar el cronograma");
    }
  };

  const eliminarSemana = async (index: number) => {
    const semana = semanas[index];

    try {
      if (semana.id) {
        await eliminarLearningLog(semana.id);
      }

      const nuevasSemanas = semanas.filter((_, i) => i !== index);
      setSemanas(nuevasSemanas);

      Alert.alert("Correcto", "Semana eliminada correctamente");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo eliminar la semana");
    }
  };

  return (
    <ScrollView style={styles.container} horizontal>
      <ScrollView>
        <View style={styles.page}>
          <View style={styles.headerContainer}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>YAVIRAC</Text>
            </View>

            <View style={styles.headerCenter}>
              <Text style={styles.headerBlue}>{form.institucion}</Text>
              <Text style={styles.headerWhite}>{form.macroproceso}</Text>
              <Text style={styles.headerOrange}>{form.proceso}</Text>
              <Text style={styles.headerWhite}>{form.formato}</Text>
            </View>

            <View style={styles.versionBox}>
              <Text style={styles.versionText}>VERSIÓN: {form.version}</Text>
              <Text style={styles.versionText}>
                ELABORACIÓN: {form.elaboracion}
              </Text>
              <Text style={styles.versionText}>
                ACTUALIZACIÓN: {form.actualizacion}
              </Text>
              <Text style={styles.versionText}>CÓDIGO: {form.codigo}</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <Row
              label1="EMPRESA FORMADORA:"
              value1={form.empresaFormadora}
              onChange1={(t) => setValue("empresaFormadora", t)}
              label2="NIVEL:"
              value2={form.nivel}
              onChange2={(t) => setValue("nivel", t)}
            />

            <Row
              label1="ESTUDIANTE:"
              value1={form.estudiante}
              onChange1={(t) => setValue("estudiante", t)}
              label2="CICLO ACADÉMICO:"
              value2={form.cicloAcademico}
              onChange2={(t) => setValue("cicloAcademico", t)}
            />

            <Row
              label1="CÉDULA:"
              value1={form.cedula}
              onChange1={(t) => setValue("cedula", t)}
              label2="F. INICIO / F. FIN:"
              value2={`${form.fechaInicio} / ${form.fechaFin}`}
              onChange2={() => {}}
            />

            <Row
              label1="TUTOR(A) ACADÉMICO:"
              value1={form.tutorAcademico}
              onChange1={(t) => setValue("tutorAcademico", t)}
              label2="NÚCLEO ESTRUCTURANTE:"
              value2={form.nucleoEstructurante}
              onChange2={(t) => setValue("nucleoEstructurante", t)}
            />

            <Row
              label1="TUTOR(A) EMPRESARIAL:"
              value1={form.tutorEmpresarial}
              onChange1={(t) => setValue("tutorEmpresarial", t)}
              label2="CARRERA:"
              value2={form.carrera}
              onChange2={(t) => setValue("carrera", t)}
            />
          </View>

          <Section title="OBJETIVO DEL NÚCLEO ESTRUCTURANTE PARA LA FASE PRÁCTICA" />

          <TextInput
            style={styles.objectiveInput}
            multiline
            value={form.objetivo}
            onChangeText={(text) => setValue("objetivo", text)}
          />

          <Section title="INFORME DE APRENDIZAJE DE LA FASE PRÁCTICA" />

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, styles.colSemana]}>SEMANA</Text>
              <Text style={[styles.th, styles.colFecha]}>FECHA</Text>
              <Text style={[styles.th, styles.colPuesto]}>
                PUESTO DE APRENDIZAJE
              </Text>
              <Text style={[styles.th, styles.colActividad]}>
                ACTIVIDADES REALIZADAS
              </Text>
              <Text style={[styles.th, styles.colActividad]}>
                ACTIVIDADES AUTÓNOMAS
              </Text>
              <Text style={[styles.th, styles.colObservacion]}>
                OBSERVACIONES
              </Text>
              <Text style={[styles.th, styles.colAcciones]}>ACCIONES</Text>
            </View>

            {semanas.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <TextInput
                  style={[styles.tdInput, styles.colSemana]}
                  value={item.semana}
                  onChangeText={(text) =>
                    setSemanaValue(index, "semana", text)
                  }
                />

                <TextInput
                  style={[styles.tdInput, styles.colFecha]}
                  value={item.fecha}
                  onChangeText={(text) => setSemanaValue(index, "fecha", text)}
                  placeholder="aaaa-mm-dd"
                />

                <TextInput
                  style={[styles.tdInput, styles.colPuesto]}
                  value={item.puestoAprendizaje}
                  onChangeText={(text) =>
                    setSemanaValue(index, "puestoAprendizaje", text)
                  }
                />

                <TextInput
                  style={[styles.tdInput, styles.colActividad]}
                  value={item.actividadesRealizadas}
                  onChangeText={(text) =>
                    setSemanaValue(index, "actividadesRealizadas", text)
                  }
                  multiline
                />

                <TextInput
                  style={[styles.tdInput, styles.colActividad]}
                  value={item.actividadesAutonomas}
                  onChangeText={(text) =>
                    setSemanaValue(index, "actividadesAutonomas", text)
                  }
                  multiline
                />

                <TextInput
                  style={[styles.tdInput, styles.colObservacion]}
                  value={item.observaciones}
                  onChangeText={(text) =>
                    setSemanaValue(index, "observaciones", text)
                  }
                  multiline
                />

                <View style={[styles.actionCell, styles.colAcciones]}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => eliminarSemana(index)}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={agregarSemana}>
            <Text style={styles.buttonText}>+ Agregar semana</Text>
          </TouchableOpacity>

          <View style={styles.footerGrid}>
            <View style={styles.footerLabel}>
              <Text style={styles.footerLabelText}>
                Reflexión sobre el aprendizaje alcanzado de las actividades
                realizadas
              </Text>
            </View>

            <TextInput
              style={styles.footerInput}
              multiline
              value={form.reflexion}
              onChangeText={(text) => setValue("reflexion", text)}
            />

            <View style={styles.footerLabel}>
              <Text style={styles.footerLabelText}>
                Observaciones de la empresa formadora
              </Text>
            </View>

            <TextInput
              style={styles.footerInput}
              multiline
              value={form.observaciones}
              onChangeText={(text) => setValue("observaciones", text)}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={guardarFormulario}>
            <Text style={styles.buttonText}>Guardar formulario</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

function Row(props: {
  label1: string;
  value1: string;
  onChange1: (text: string) => void;
  label2: string;
  value2: string;
  onChange2: (text: string) => void;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.labelCell}>
        <Text style={styles.labelText}>{props.label1}</Text>
      </View>

      <TextInput
        style={styles.inputCell}
        value={props.value1}
        onChangeText={props.onChange1}
      />

      <View style={styles.labelCell}>
        <Text style={styles.labelText}>{props.label2}</Text>
      </View>

      <TextInput
        style={styles.inputCell}
        value={props.value2}
        onChangeText={props.onChange2}
      />
    </View>
  );
}

function Section({ title }: { title: string }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionTitleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  page: {
    width: 1700,
    padding: 10,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
  },
  logoBox: {
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  logoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f75bc",
  },
  headerCenter: {
    flex: 1,
  },
  headerBlue: {
    backgroundColor: "#2454ff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 11,
    paddingVertical: 3,
    borderBottomWidth: 1,
  },
  headerWhite: {
    backgroundColor: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
    paddingVertical: 3,
    borderBottomWidth: 1,
  },
  headerOrange: {
    backgroundColor: "#ff7a00",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
    paddingVertical: 3,
    borderBottomWidth: 1,
  },
  versionBox: {
    width: 180,
    borderLeftWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
  },
  versionText: {
    fontSize: 9,
    padding: 4,
    borderBottomWidth: 1,
  },
  infoGrid: {
    marginTop: 8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#000",
  },
  infoRow: {
    flexDirection: "row",
    minHeight: 32,
  },
  labelCell: {
    width: 170,
    backgroundColor: "#d9d9d9",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  inputCell: {
    width: 400,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 5,
    fontSize: 10,
  },
  sectionTitle: {
    marginTop: 8,
    backgroundColor: "#d9d9d9",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  sectionTitleText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  objectiveInput: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 50,
    textAlign: "center",
    fontSize: 11,
    padding: 8,
  },
  table: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#d9d9d9",
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 65,
  },
  th: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  tdInput: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    fontSize: 10,
    padding: 5,
    textAlignVertical: "top",
  },
  colSemana: {
    width: 80,
  },
  colFecha: {
    width: 160,
  },
  colPuesto: {
    width: 180,
  },
  colActividad: {
    width: 350,
  },
  colObservacion: {
    width: 220,
  },
  colAcciones: {
    width: 130,
  },
  actionCell: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  addButton: {
    backgroundColor: "#0f75bc",
    padding: 12,
    marginTop: 12,
    width: 180,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#b00020",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#1f7a1f",
    padding: 14,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 6,
    width: 220,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  footerGrid: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#000",
    marginTop: 10,
    minHeight: 110,
  },
  footerLabel: {
    width: 180,
    backgroundColor: "#d9d9d9",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    padding: 5,
  },
  footerLabelText: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerInput: {
    width: 420,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 8,
    fontSize: 10,
    textAlignVertical: "top",
  },
});