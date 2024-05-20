class Persona {
    constructor(nombre, apellido, dni, estado) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      this.estado = estado;
    }
  
    
  }
  class Medico extends Persona {
    constructor(nombre, apellido, dni, estado, domicilio, profesion, especialidad, matriculaProfesional, idREFEPS) {
      super(nombre, apellido, dni, estado);
      this.domicilio = domicilio;
      this.profesion = profesion;
      this.especialidad = especialidad;
      this.matriculaProfesional = matriculaProfesional;
      this.idREFEPS = idREFEPS;
    }
   }
  class Paciente extends Persona{
    constructor(nombre,apellido,dni,estado,fechaNacimiento,sexo,obraSocial,planObraSocial){
      super(nombre,apellido,dni,estado);
      this.fechaNacimiento=fechaNacimiento;
      this.sexo=sexo;
      this.obraSocial=obraSocial;
      this.planObraSocial=planObraSocial;
    }
  } 
  class MedicamentoPrescripcion{
    constructor(nombreGenerico,concentracion,forma,presentacion,familia,categoria,administracion){
        this.nombreGenerico=nombreGenerico;
        this.concentracion=concentracion;
        this.forma=forma;
        this.presentacion=presentacion;
        this.familia=familia;
        this.categoria=categoria;
        this.administracion=administracion;
    }
  }
  class PrestacionPrescripcion{
    constructor(practica,procedimiento,examen,lado,indicacion,justificacion,observacion){
        this.practica=practica;
        this.procedimiento=procedimiento;
        this.examen=examen;
        this.lado=lado,
        this.indicacion=indicacion;
        this.justificacion=justificacion;
        this.observacion=observacion;
    }
  }
  class Prescripcion{
    constructor(medico,paciente,diagnostico,fecha,vigencia,medicamentos,prestaciones){
        this.medico=medico;
        this.paciente=paciente;
        this.diagnostico=diagnostico;
        this.fecha=fecha;
        this.vigencia=vigencia;
        this.medicamentos=medicamentos;
        this.prestaciones=prestaciones;
    }
  }
  class Login{
    constructor(idLogin,idMedico,usuarioLogin,claveUsuario){
      this.idLogin=idLogin;
      this.idMedico=idMedico;
      this.usuarioLogin=usuarioLogin;
      this.claveUsuario=claveUsuario;
    }
  }
  export{Login};