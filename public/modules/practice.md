## Instalación de Red de Protección Contra Incendios (PCI)

<div style="text-align:center; margin: 32px 0;">
  <a href="https://1drv.ms/b/c/6a093b703caad82e/ERxm-wpnwrdMnlFsyEX5dxABYMfu5JvhoWa9xX2o1cptEw?e=AyyvgZ" target="_blank" style="display:inline-block; padding:16px 32px; background:#0078d4; color:white; font-size:18px; border-radius:6px; text-decoration:none; font-weight:bold; box-shadow:0 2px 8px #0002; margin-bottom: 8px;">
    ⬇️ Descargar en PDF
  </a>
  <a href="https://1drv.ms/u/c/6a093b703caad82e/ER35YbWwBN1MmbILvUgsY7wBiO83tcqzgf9cNVNv1xRS1w?e=pz02iD" target="_blank" style="display:inline-block; padding:16px 32px; background:#0078d4; color:white; font-size:18px; border-radius:6px; text-decoration:none; font-weight:bold; box-shadow:0 2px 8px #0002; margin-bottom: 8px;">
    ⬇️ Descargar material de la práctica
  </a>
</div>

### Objetivo

Modelar una red de **Protección Contra Incendios Húmeda (PCI)** en Revit, integrando todos los pasos necesarios para su correcta documentación dentro del proyecto BIM.

---

### Preparar el archivo

- Abrir el archivo `HLT-SAV-PRI-ZZZ-M3D-ARQ` y guardarlo con la versión de Revit con la que se va a trabajar.
- Abrir el archivo `HLT-SAV-PRI-ZZZ-M3D-MEP`, convertirlo en fichero central y guardarlo con la versión de Revit correspondiente.  
  **Nota:** Una vez guardado el archivo central, cerrarlo y abrirlo como local.
- Revisar que el modelo de arquitectura esté correctamente vinculado.

---

### Configuración inicial del subproyecto

- Crear un nuevo subproyecto llamado `50.50 PCI`.
- Crear vista de techo para el nivel N4.
- Renombrar la vista de trabajo con la nomenclatura del proyecto. Por ejemplo:
  - `WIP-SAV-SOS-N4-PCI` (vista de trabajo)
  - `IMP-SOS-N4-PCI` (vista de impresión)
- Asignarla correctamente al Navegador de proyectos mediante los parámetros:
  - `PXL-AgrupacioNivell1`
  - `PXL-AgrupacioNivell2`
- Asignar la disciplina correcta.

---

### Crear familia de rociadores

- Crear una familia de modelo genérico métrico.
- Cambiar la categoría a **Rociadores**.
- Crear una forma sencilla (por ejemplo, un cilindro) y asignar un conector de tubería.
- Asignar la categoría a **Protección contra incendios húmeda**.

---

### Cargar y colocar la familia en el proyecto

- Cargar la familia en el proyecto.
- Distribuir los rociadores por la planta.
- Crear la red de tuberías física para conectarlos entre ellos.

---

### Presentación

- Duplicar la vista de trabajo y nombrarla con una nomenclatura coherente.
- Asignarla correctamente al Navegador de proyectos mediante los parámetros:
  - `PXL-AgrupacioNivell1`
  - `PXL-AgrupacioNivell2`
- Modificar la visibilidad a vuestro criterio y guardar los cambios en una plantilla de vista.
- Crear una tabla de planificación que muestre los metros lineales de tubería de la red de PCI.
- Crear un plano de tamaño A1.
- Colocar la vista y la tabla de planificación en el plano.

---

### Envío

Enviar únicamente el fichero MEP resultante a:

📧 `xavier.atero@pixel51.net`

En caso de no poder adjuntar el archivo por tamaño, usar cualquier sistema de envío de archivos (WeTransfer, Dropbox…) y enviar el enlace correspondiente.
