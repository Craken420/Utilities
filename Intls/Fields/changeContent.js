/*** Sub-modulos ***/

/* Operadores de cadena */
const regEx  = require('../../../Utilerias/RegEx/jsonRgx')
const { remplazarContenido } = require('../../../Utilerias/OperarCadenas/remplazarContenido')

/* Operadores de rutas */
const { extraerContenidoRecodificado } = require('../../../Utilerias/Codificacion/contenidoRecodificado')
const pcrArchivos = require('../../../Utilerias/OperadoresArchivos/procesadorArchivos')

/* Validaciones */
const { determinarStringOArreglo } = require('../../../Utilerias/Validaciones/esStringOArreglo')

function remplazarCampoCmp (condicionCampo, contenidoArchivo,
    nomCampo, nomCmp, nuevoContenidoCampo) {

    if (new RegExp(`\\[${regEx.Preparar.prepararRegEx(nomCmp)}\\]`,`gi`).test(contenidoArchivo)) {

        let cmpSelecionado = regEx.Extraer.extraerCmp(contenidoArchivo, nomCmp).join('')

        pcrArchivos.agregarArchivo('Reporte.txt',
        `------------------------------------------------------------------\n`
        + `***  Deteccion ***\n Componente: \"${nomCmp}\"\n`)

        if (regEx.Crear.campoSinDigito(nomCampo).test(cmpSelecionado)) {

            let campoContenido = regEx.Extraer.extraerCampoContenido(cmpSelecionado, nomCampo).join('')

            pcrArchivos.agregarArchivo('Reporte.txt',
              `    --------------------------------\n`
            + `       Campo: \"${nomCampo}\"\n`
            + `       Extraccion: \"${campoContenido}\"\n`)

            if (condicionCampo.test(campoContenido)) {

                let nuevoCampo = campoContenido.replace(/(?<=^.*?=).*/gm, '') + nuevoContenidoCampo

                pcrArchivos.agregarArchivo('Reporte.txt',
                  `       --------------------------------\n`
                + `            Campo editado: \"${nuevoCampo}\"\n`)

                return regEx.Borrar.clsIniCorcheteLineaVacia(
                    remplazarContenido(
                        contenidoArchivo,
                        cmpSelecionado,
                        remplazarContenido(
                            cmpSelecionado,
                            campoContenido,
                            nuevoCampo
                        )
                    )
                )

            } else {

                pcrArchivos.agregarArchivo('Reporte.txt',
                `------------------------------------------------------------------\n`
                + `***  Omicion  ***\n`
                + `------------------------------------------------------------------\n`
                + `Campo sin cumplir la condicion: \"${condicionCampo}\"\n`
                + `En el Componente: \"${nomCmp}\"\n`)

                return false
            }
        } else {

            pcrArchivos.agregarArchivo('Reporte.txt',
                `------------------------------------------------------------------\n`
                + `***  Omicion  ***\n`
                + `No existe el campo: \"${nomCampo}\"\n`
                + `------------------------------------------------------------------\n`)

            return false
        }

    } else {

        pcrArchivos.agregarArchivo('Reporte.txt',
        `------------------------------------------------------------------\n`
        + `***  Omicion  ***\n`
        + `No existe el componente: ${nomCmp}\n`
        + `------------------------------------------------------------------\n`)

        return false
    }
}

const operarCambio = (archivo, condicionCampo, nomCampo, nomCmp, nuevoContenidoCampo) => {

    return remplazarCampoCmp(
            new RegExp(`${condicionCampo}$`,`gim`),
            extraerContenidoRecodificado(archivo) + '\n[',
            nomCampo,
            nomCmp,
            nuevoContenidoCampo
        )
}

/***
 * 
 * operarCambioEspecial(
 *               archivo,
 *               true,
 *               ['Normal', 'adios'],
 *    'VentanaTipoMarco',
 *    'Forma',
 *    'Sencillo'
 *)
 * 
 ***/
const operarCambioEspecial = (archivo, condicionForzosa, condicionCampo,
    nomCampo, nomCmp, nuevoContenidoCampo) => {

    if (condicionCampo != '') {

        if (determinarStringOArreglo(condicionCampo) == 'string') {
            if (condicionForzosa == true) {

                return remplazarCampoCmp(
                    new RegExp(`${condicionCampo}$`,`gim`),
                    extraerContenidoRecodificado(archivo) + '\n[',
                    nomCampo,
                    nomCmp,
                    nuevoContenidoCampo
                )

            } else if (condicionForzosa == false) {

               return remplazarCampoCmp(
                    new RegExp(`${condicionCampo}`,`gi`),
                    extraerContenidoRecodificado(archivo) + '\n[',
                    nomCampo,
                    nomCmp,
                    nuevoContenidoCampo
                )

            } else {

                console.log('Ingresa \"true\" si necesitas una condicion en el texto, \"false\" si no')
                return false
            }

        } else if (determinarStringOArreglo(condicionCampo) == 'arreglo') {

            pcrArchivos.agregarArchivo('Reporte.txt',
              `\n-------------------------------------\n`
            + `Determinacion Tipo: Condicion - ${determinarStringOArreglo(condicionCampo)}\n`
            + `-----------------------------\n`)

            if (condicionForzosa == true) {

                let cadenaRegEx = condicionCampo.map(x => {return `(?:${x})`})

                let condicionUnida = cadenaRegEx.join('([^]*|)')

                pcrArchivos.agregarArchivo('Reporte.txt',
                + `condicionCampo: Forzosa\n`
                + `-------------------------\n`
                + `condicionCampo: \"${condicionCampo}\"\n`
                + `condicionUnida: \"${condicionUnida}\n`)

                return remplazarCampoCmp(
                    new RegExp(`${condicionUnida}$`,`gim`),
                    extraerContenidoRecodificado(archivo) + '\n[',
                    nomCampo,
                    nomCmp,
                    nuevoContenidoCampo
                )

            } else if (condicionForzosa == false) {
                let cadenaRegEx = condicionCampo.map(x => {return `(?:${x})`})

                let condicionUnida = cadenaRegEx.join('|')
               
                pcrArchivos.agregarArchivo('Reporte.txt',
                  `\n-------------------------------------\n`
                + `condicionCampo Opcional\n`
                + `------------\n`
                + `condicionCampo: \"${condicionCampo}\"\n`
                + `condicionUnida: \"${condicionUnida}\"\n`)

                return remplazarCampoCmp(
                    new RegExp(`${condicionUnida}`,`gi`),
                    extraerContenidoRecodificado(archivo) + '\n[',
                    nomCampo,
                    nomCmp,
                    nuevoContenidoCampo
                )

            } else {

                console.log('Ingresa \"true\" si necesitas una condicion en el texto, \"false\" si no')
                return false
            }
        } else {

            console.log('Objeto desconocido')
            return false
        }
    } else {
        return remplazarCampoCmp(
            condicionCampo,
            extraerContenidoRecodificado(archivo) + '\n[',
            nomCampo,
            nomCmp,
            nuevoContenidoCampo
        )
    }
}

module.exports.operarCambio = operarCambio
module.exports.operarCambioEspecial = operarCambioEspecial