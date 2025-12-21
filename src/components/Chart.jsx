import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Chart({ chartData, resetChart }) {
    return(
        <div className="p-5 rounded-lg shadow border border-teal-300 h-full flex flex-col bg-slate-900">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white">Grafik Perkembangan Waktu</h3>
                <button className="text-sm text-red-500 hover:underline" onClick={resetChart}>Reset Grafik</button>
            </div>

            <div className="grow min-h-100 w-full"> 
                
                {chartData.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-700 rounded bg-slate-800/50 p-10 min-h-100">
                        <p className="text-gray-300 mb-2 font-semibold">Grafik Masih Kosong</p>
                        <p className="text-gray-400 text-sm text-center">Klik "Benchmark Full" untuk melihat perbandingan.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}> 
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                            <XAxis 
                                dataKey="n" 
                                type="number" 
                                domain={["dataMin", "dataMax"]} 
                                scale="linear" 
                                tickFormatter={(tick) => tick.toLocaleString()}
                                label={{ value: 'Jumlah Data (N)', position: 'insideBottomRight', offset: -5, fill: '#ffffff' }}
                                tick={{ fill: '#ffffff' }}
                            />
                            <YAxis 
                                label={{ value: "Waktu (ms)", angle: -90, position: "insideLeft", fill: '#ffffff'}} 
                                tick={{ fill: '#ffffff' }}
                            />
                            
                            <Tooltip 
                                formatter={(val) => `${val} ms`} 
                                labelFormatter={(label) => `Data: ${label} items`}
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }} 
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingTop: '10px' }}/>
                            
                            <Line connectNulls type="monotone" dataKey="iteratifAsc" stroke="#22c55e" name="Iteratif Asc" strokeWidth={3} dot={{r:3}} activeDot={{r: 6}} />
                            <Line connectNulls type="monotone" dataKey="iteratifDesc" stroke="#00f5ff" name="Iteratif Desc" strokeWidth={3} dot={{r:3}} activeDot={{r: 6}} />
                            <Line connectNulls type="monotone" dataKey="rekursifAsc" stroke="#ef4444" name="Rekursif Asc" strokeWidth={3} dot={{r:3}} activeDot={{r: 6}} />
                            <Line connectNulls type="monotone" dataKey="rekursifDesc" stroke="#f97316" name="Rekursif Desc" strokeWidth={3} dot={{r:3}} activeDot={{r: 6}} />
                        </LineChart>
                    </ResponsiveContainer>
                )} 
            </div>
        </div>
    );
}