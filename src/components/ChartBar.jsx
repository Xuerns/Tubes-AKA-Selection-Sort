import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function ChartBar({ chartData, selectedSize }) {
    const currentData = chartData.find((item) => item.n === selectedSize);

    const preparedData = [
        { name: "Iteratif Asc", time: currentData?.iteratifAsc || 0, color: "#22c55e" }, // Green
        { name: "Iteratif Desc", time: currentData?.iteratifDesc || 0, color: "#00f5ff" }, // Cyan
        { name: "Rekursif Asc", time: currentData?.rekursifAsc || 0, color: "#ef4444" }, // Red
        { name: "Rekursif Desc", time: currentData?.rekursifDesc || 0, color: "#f97316" }, // Orange
    ];

    const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-sm">
                <p className="font-bold text-white mb-1 border-b border-slate-700 pb-1">
                    {label}
                </p>
                <p className="text-gray-300">
                    Waktu : <span className="text-teal-300 font-mono font-bold">{payload[0].value} ms</span>
                </p>
            </div>
        );
    }
    return null;
};

    return (
        <div className="p-5 rounded-lg shadow border border-teal-300 h-full flex flex-col bg-slate-900">
            <div className="mb-4">
                <h3 className="font-bold text-white">Perbandingan Waktu (N = {selectedSize.toLocaleString()})</h3>
                <p className="text-xs text-gray-400">Komparasi kecepatan antar metode pada jumlah data yang sama.</p>
            </div>

            <div className="grow min-h-75 w-full">
                {!currentData ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-700 rounded bg-slate-800/50">
                        <p className="text-gray-300 mb-2 font-semibold">Data Kosong untuk N = {selectedSize}</p>
                        <p className="text-gray-500 text-xs text-center px-4">
                            Jalankan benchmark atau sorting manual pada ukuran ini untuk melihat grafik.
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={preparedData} margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" horizontal={true} vertical={true} />
                            <XAxis 
                                dataKey="name" 
                                stroke="#ffffff" 
                               
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                            />
                            <YAxis 
                                label={{ value: "Waktu (ms)", angle: -90, position: "insideLeft", fill: '#ffffff'}} 
                                width={100} 
                                tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 'bold' }}
                                stroke="#ffffff"
                                 tickFormatter={(val) => `${val}ms`}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: '#1f2937', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }}
                                formatter={(val) => [`${val} ms`, "Waktu"]}
                            />
                            <Bar dataKey="time" radius={[4, 4, 0, 0]} barSize={30} >
                                {preparedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}