import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

type Semana = {
  semana: string;
  fecha: string;
  puestoAprendizaje: string;
  actividadesRealizadas: string;
  actividadesAutonomas: string;
};

export default function InformeAprendizajeScreen() {
  const [form, setForm] = useState({
    codigo: "DS-010206",
    version: "1.0",
    elaboracion: "06-06-2023",
    actualizacion: "06-06-2023",

    institucion: "INSTITUTO SUPERIOR TECNOLÓGICO DE TURISMO Y PATRIMONIO YAVIRAC",
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
    nucleoEstructurante: "",
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
    },
  ]);

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
    nuevasSemanas[index][field] = value;
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
      },
    ]);
  };

  const guardarFormulario = () => {
    if (!form.empresaFormadora || !form.estudiante || !form.cedula) {
      Alert.alert(
        "Campos obligatorios",
        "Debe ingresar empresa formadora, estudiante y cédula."
      );
      return;
    }

    const data = {
      ...form,
      semanas,
    };

    console.log("Formulario:", data);
    Alert.alert("Correcto", "Formulario registrado correctamente.");
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
              <View style={styles.versionRow}>
                <Text style={styles.versionLabel}>VERSIÓN</Text>
                <Text style={styles.versionValue}>{form.version}</Text>
              </View>
              <View style={styles.versionRow}>
                <Text style={styles.versionLabel}>ELABORACIÓN</Text>
                <Text style={styles.versionValue}>{form.elaboracion}</Text>
              </View>
              <View style={styles.versionRow}>
                <Text style={styles.versionLabel}>ACTUALIZACIÓN</Text>
                <Text style={styles.versionValue}>{form.actualizacion}</Text>
              </View>
              <View style={styles.versionRow}>
                <Text style={styles.versionLabel}>CÓDIGO</Text>
                <Text style={styles.versionValue}>{form.codigo}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <Label text="EMPRESA FORMADORA:" />
              <Input
                value={form.empresaFormadora}
                onChangeText={(text) => setValue("empresaFormadora", text)}
              />
              <Label text="NIVEL:" />
              <Input
                value={form.nivel}
                onChangeText={(text) => setValue("nivel", text)}
              />
            </View>

            <View style={styles.infoRow}>
              <Label text="ESTUDIANTE:" />
              <Input
                value={form.estudiante}
                onChangeText={(text) => setValue("estudiante", text)}
              />
              <Label text="CICLO ACADÉMICO:" />
              <Input
                value={form.cicloAcademico}
                onChangeText={(text) => setValue("cicloAcademico", text)}
              />
            </View>

            <View style={styles.infoRow}>
              <Label text="CÉDULA:" />
              <Input
                value={form.cedula}
                onChangeText={(text) => setValue("cedula", text)}
              />
              <Label text="F. INICIO FASE PRÁCTICA" />
              <Input
                value={form.fechaInicio}
                onChangeText={(text) => setValue("fechaInicio", text)}
              />
              <Label text="F. FIN FASE PRÁCTICA" />
              <Input
                value={form.fechaFin}
                onChangeText={(text) => setValue("fechaFin", text)}
              />
            </View>

            <View style={styles.infoRow}>
              <Label text="TUTOR(A) ACADÉMICO" />
              <Input
                value={form.tutorAcademico}
                onChangeText={(text) => setValue("tutorAcademico", text)}
              />
              <Label text="NÚCLEO ESTRUCTURANTE:" />
              <Input
                value={form.nucleoEstructurante}
                onChangeText={(text) => setValue("nucleoEstructurante", text)}
              />
            </View>

            <View style={styles.infoRow}>
              <Label text="TUTOR(A) EMPRESARIAL" />
              <Input
                value={form.tutorEmpresarial}
                onChangeText={(text) => setValue("tutorEmpresarial", text)}
              />
              <Label text="CARRERA" />
              <Input
                value={form.carrera}
                onChangeText={(text) => setValue("carrera", text)}
              />
            </View>
          </View>

          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>
              OBJETIVO DEL NÚCLEO ESTRUCTURANTE PARA LA FASE PRÁCTICA
            </Text>
          </View>

          <TextInput
            style={styles.objectiveInput}
            multiline
            value={form.objetivo}
            onChangeText={(text) => setValue("objetivo", text)}
            placeholder="Ingrese el objetivo de la fase práctica"
          />

          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>
              INFORME DE APRENDIZAJE DE LA FASE PRÁCTICA
            </Text>
          </View>

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
                  onChangeText={(text) =>
                    setSemanaValue(index, "fecha", text)
                  }
                  placeholder="dd/mm/aaaa"
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
                realizadas en la empresa formadora
              </Text>
            </View>
            <TextInput
              style={styles.footerInput}
              multiline
              value={form.reflexion}
              onChangeText={(text) => setValue("reflexion", text)}
              placeholder="Ingrese la reflexión del aprendizaje alcanzado"
            />
            <View style={styles.footerLabel}>
              <Text style={styles.footerLabelText}>
                Observaciones de la empresa formadora sobre el desempeño del
                estudiante:
              </Text>
            </View>
            <TextInput
              style={styles.footerInput}
              multiline
              value={form.observaciones}
              onChangeText={(text) => setValue("observaciones", text)}
              placeholder="Ingrese observaciones"
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

function Label({ text }: { text: string }) {
  return (
    <View style={styles.labelCell}>
      <Text style={styles.labelText}>{text}</Text>
    </View>
  );
}

function Input({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <TextInput
      style={styles.inputCell}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  page: {
    width: 1200,
    padding: 10,
    backgroundColor: "#ffffff",
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
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 11,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  headerWhite: {
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  headerOrange: {
    backgroundColor: "#ff7a00",
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  versionBox: {
    width: 140,
    borderLeftWidth: 1,
    borderColor: "#000",
  },
  versionRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 21,
  },
  versionLabel: {
    width: 75,
    fontSize: 8,
    fontWeight: "bold",
    padding: 3,
    borderRightWidth: 1,
    borderColor: "#000",
  },
  versionValue: {
    flex: 1,
    fontSize: 8,
    textAlign: "center",
    padding: 3,
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
    width: 150,
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
    width: 260,
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
    width: 380,
  },
  addButton: {
    backgroundColor: "#0f75bc",
    padding: 12,
    marginTop: 12,
    width: 180,
    borderRadius: 6,
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
    width: 330,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 8,
    fontSize: 10,
    textAlignVertical: "top",
  },
});