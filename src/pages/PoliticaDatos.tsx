/**
 * PoliticaDatos - Página de política de privacidad y datos
 * 
 * Muestra la información sobre el tratamiento de datos personales
 */

import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"

export function PoliticaDatos() {
  const navigate = useNavigate()

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-2xl font-semibold text-gray-800">Política de Tratamiento de Datos</h1>
        <p className="text-gray-600 mt-2">
          Información sobre cómo protegemos y manejamos sus datos personales
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Introducción */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Compromiso con la Privacidad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              En <strong>Combarranquilla Centro de Entrenamiento Deportivo</strong>, nos comprometemos 
              a proteger la privacidad y seguridad de los datos personales de nuestros clientes, de conformidad 
              con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia sobre protección de datos personales.
            </p>
          </CardContent>
        </Card>

        {/* Datos que recopilamos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Datos que Recopilamos
            </CardTitle>
            <CardDescription>
              Información que recolectamos para prestar nuestros servicios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Datos de identificación:</strong> nombres, apellidos, tipo y número de documento, 
                  fecha de nacimiento, dirección, teléfono y correo electrónico.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Datos de salud:</strong> información médica relevante para la prestación de servicios 
                  de entrenamiento deportivo, incluyendo valoraciones físicas, antropometría, signos vitales y 
                  antecedentes médicos.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Datos de afiliación:</strong> información sobre su EPS y datos de contacto de emergencia.
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Finalidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Finalidad del Tratamiento
            </CardTitle>
            <CardDescription>
              Para qué utilizamos su información
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Prestar servicios de entrenamiento deportivo personalizados y seguros</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Realizar valoraciones físicas y seguimiento del progreso</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Comunicarnos con usted sobre citas, horarios y novedades</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Cumplir con obligaciones legales y regulatorias</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Mejorar continuamente nuestros servicios</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Derechos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-600" />
              Sus Derechos
            </CardTitle>
            <CardDescription>
              Como titular de datos personales, usted tiene derecho a:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Conocer, actualizar y rectificar sus datos personales</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Solicitar prueba de la autorización otorgada</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Ser informado sobre el uso que se ha dado a sus datos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Revocar la autorización y/o solicitar la supresión de datos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Acceder de forma gratuita a sus datos personales</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-green-600" />
              Medidas de Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Implementamos medidas técnicas, humanas y administrativas para proteger sus datos personales 
              y prevenir su daño, pérdida, alteración, destrucción o uso no autorizado.
            </p>
            <p className="text-gray-700">
              El acceso a la información personal está restringido únicamente al personal autorizado que 
              necesita conocer dicha información para prestar nuestros servicios.
            </p>
          </CardContent>
        </Card>

        {/* Contacto */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">
              ¿Preguntas sobre sus datos?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-700">
              Para ejercer sus derechos o resolver dudas sobre el tratamiento de sus datos personales, 
              puede contactarnos a través de:
            </p>
            <div className="space-y-1 text-gray-700">
              <p><strong>Correo electrónico:</strong> datospersonales@combarranquilla.com</p>
              <p><strong>Teléfono:</strong> (+57) 300 123 4567</p>
              <p><strong>Dirección:</strong> Barranquilla, Colombia</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer moderno y limpio */}
      <footer className="mt-auto pt-12 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Separador visual */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Combarranquilla</h3>
                <p className="text-xs text-gray-500">Centro de Entrenamiento Deportivo</p>
              </div>
            </div>

            {/* Enlaces de contacto */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600">
              <a 
                href="mailto:datospersonales@combarranquilla.com" 
                className="hover:text-green-600 transition-colors"
              >
                Contacto
              </a>
              <span className="hidden md:inline text-gray-300">|</span>
              <a 
                href="tel:+573001234567" 
                className="hover:text-green-600 transition-colors"
              >
                (+57) 300 123 4567
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2025 — Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
