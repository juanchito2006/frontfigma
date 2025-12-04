import { useState } from "react";
import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

// Total de clientes en el sistema: 50
// Distribución: 30 mujeres, 20 hombres
// Nuevos clientes este mes (Oct): 8 (50 - 42)
// Total valoraciones este mes: 60 (35 mujeres + 25 hombres)

const leaderboardData = [
  {
    nombre: "Juan Orozco",
    edad: 28,
    valoraciones: 12,
  },
  {
    nombre: "Ana Pérez",
    edad: 28,
    valoraciones: 10,
  },
  {
    nombre: "Luis García",
    edad: 28,
    valoraciones: 8,
  },
  {
    nombre: "María Rodríguez",
    edad: 28,
    valoraciones: 7,
  },
  {
    nombre: "Carlos Arango",
    edad: 28,
    valoraciones: 6,
  },
  {
    nombre: "Lucía Hernández",
    edad: 28,
    valoraciones: 5,
  },
  {
    nombre: "Pedro Sánchez",
    edad: 28,
    valoraciones: 4,
  },
];

const clientesRecientesData = [
  { mes: "Ene", clientes: 5 },
  { mes: "Feb", clientes: 8 },
  { mes: "Mar", clientes: 12 },
  { mes: "Abr", clientes: 15 },
  { mes: "May", clientes: 18 },
  { mes: "Jun", clientes: 22 },
  { mes: "Jul", clientes: 28 },
  { mes: "Ago", clientes: 35 },
  { mes: "Sep", clientes: 42 },
  { mes: "Oct", clientes: 50 },
];

// Datos adicionales de estadísticas
// Total valoraciones este mes: 60 (35 mujeres + 25 hombres)
const valoracionesEsteMes = [
  { name: 'Mujeres', value: 35, fill: '#EF4444' },
  { name: 'Hombres', value: 25, fill: '#3B82F6' }
];

const pesoPromedioData = [
  { mes: 'Ene', Mujeres: 58.2, Hombres: 72.5 },
  { mes: 'Feb', Mujeres: 58.8, Hombres: 73.1 },
  { mes: 'Mar', Mujeres: 59.1, Hombres: 73.8 },
  { mes: 'Abr', Mujeres: 59.5, Hombres: 74.2 },
  { mes: 'May', Mujeres: 60.0, Hombres: 74.8 },
  { mes: 'Jun', Mujeres: 60.3, Hombres: 75.1 }
];

// Mock de usuarios para el modal de estadísticas
// Total: 50 clientes (30 mujeres, 20 hombres)
const mockUsuariosDB = Array.from({ length: 50 }, (_, i) => ({
  sexo: i < 30 ? 'Femenino' : 'Masculino'
}));

const usuariosPorGenero = [
  {
    name: 'Mujeres',
    value: mockUsuariosDB.filter(u => u.sexo === 'Femenino').length,
    fill: '#EF4444'
  },
  {
    name: 'Hombres',
    value: mockUsuariosDB.filter(u => u.sexo === 'Masculino').length,
    fill: '#3B82F6'
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-gray-600">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DashboardContent() {
  const [showUserStatsModal, setShowUserStatsModal] = useState(false);
  const [showValoracionesModal, setShowValoracionesModal] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Middle Section - Charts and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Nuevos Usuarios */}
        <Card className="flex flex-col items-center justify-center">
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-10 w-10 text-green-600" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              8
            </div>
            <div className="text-sm text-gray-600 text-center">
              Nuevos Clientes Este Mes
            </div>
          </CardContent>
        </Card>

        {/* Total de Clientes - clickeable */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowUserStatsModal(true)}>
          <CardHeader>
            <CardTitle className="text-lg">Total de Clientes</CardTitle>
            <CardDescription>Distribución por género</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={220} height={220}>
                <PieChart>
                  <Pie
                    data={usuariosPorGenero}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {usuariosPorGenero.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <div className="text-3xl font-bold text-gray-800">{mockUsuariosDB.length}</div>
              <div className="text-sm text-gray-600">Haz clic para ver detalles</div>
            </div>
          </CardContent>
        </Card>

        {/* Valoraciones Este Mes - clickeable */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowValoracionesModal(true)}>
          <CardHeader>
            <CardTitle className="text-lg">Valoraciones Este Mes</CardTitle>
            <CardDescription>Valoraciones realizadas por género</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={220} height={220}>
                <PieChart>
                  <Pie
                    data={valoracionesEsteMes}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {valoracionesEsteMes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Mujeres: {valoracionesEsteMes[0].value}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Hombres: {valoracionesEsteMes[1].value}</span>
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="text-sm text-gray-600">Haz clic para ver detalles</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Charts de Evolución */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Crecimiento de Clientes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Crecimiento de Clientes</CardTitle>
            <CardDescription>Evolución mensual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={clientesRecientesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="mes"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  label={{
                    value: "Número de clientes",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#6B7280", fontSize: 12 },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="clientes"
                  name="Clientes acumulados"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peso Promedio por Género */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Peso Promedio por Género</CardTitle>
            <CardDescription>Evolución del peso promedio en los últimos meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={pesoPromedioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip formatter={(value, name) => [`${value} kg`, name]} />
                <Legend />
                <Line type="monotone" dataKey="Mujeres" stroke="#EF4444" strokeWidth={3} name="Mujeres" />
                <Line type="monotone" dataKey="Hombres" stroke="#3B82F6" strokeWidth={3} name="Hombres" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Modal de estadísticas de usuarios */}
      <Dialog open={showUserStatsModal} onOpenChange={setShowUserStatsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Detalles de Clientes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900">Hombres</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {mockUsuariosDB.filter(u => u.sexo === 'Masculino').length}
                </p>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <h3 className="font-semibold text-pink-900">Mujeres</h3>
                <p className="text-2xl font-bold text-pink-600">
                  {mockUsuariosDB.filter(u => u.sexo === 'Femenino').length}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Proporción por Género</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-sm text-blue-600">Hombres</div>
                  <div className="text-lg font-bold text-blue-700">
                    {((mockUsuariosDB.filter(u => u.sexo === 'Masculino').length / mockUsuariosDB.length) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="text-center p-3 bg-pink-50 rounded">
                  <div className="text-sm text-pink-600">Mujeres</div>
                  <div className="text-lg font-bold text-pink-700">
                    {((mockUsuariosDB.filter(u => u.sexo === 'Femenino').length / mockUsuariosDB.length) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de estadísticas de valoraciones */}
      <Dialog open={showValoracionesModal} onOpenChange={setShowValoracionesModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">Detalles de Valoraciones Este Mes</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Gráfico de dona más grande */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={300} height={300}>
                <PieChart>
                  <Pie
                    data={valoracionesEsteMes}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {valoracionesEsteMes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Estadísticas detalladas */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-gray-600 mb-2">Total de Valoraciones</h3>
                <p className="text-4xl font-bold text-green-600">
                  {valoracionesEsteMes.reduce((acc, curr) => acc + curr.value, 0)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <h3 className="font-semibold text-pink-900">Mujeres</h3>
                  <p className="text-3xl font-bold text-pink-600">
                    {valoracionesEsteMes[0].value}
                  </p>
                  <p className="text-sm text-pink-700 mt-2">
                    {((valoracionesEsteMes[0].value / valoracionesEsteMes.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Hombres</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {valoracionesEsteMes[1].value}
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    {((valoracionesEsteMes[1].value / valoracionesEsteMes.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Promedio Diario</h4>
                <p className="text-2xl font-bold text-green-700">
                  {(valoracionesEsteMes.reduce((acc, curr) => acc + curr.value, 0) / 30).toFixed(1)} valoraciones/día
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}