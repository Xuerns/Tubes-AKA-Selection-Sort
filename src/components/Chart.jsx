import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Chart({ chartData, reserChart }) {

    return(
        <div className="p-5 rounded-lg shadow border border-gray-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Grafik Perkembangan Waktu</h3>
                <button className="text-sm text-red-500 hover:underline" onClick={reserChart}>Reset Grafik</button>
            </div>

            <div className="grow min-h-100">
                {chartData.lenght === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded bg-gray-50">
                    <p className="mb-2">Grafik Kosong</p>
                    <p className="text-sm">
                        Klik "Sort" Manual atau "Benchmark Full" untuk mengisi data
                    </p>
                </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}> 
                                <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                                <XAxis dataKey="n" type="number" domain={["dataMin", "dataMax"]} scale="linear" tickFormatter={(tick) => tick.toLocaleString()}></XAxis>
                                <YAxis label={{ value: "ms", angle: -90, position: "insideLeft"}}></YAxis>
                                <Tooltip formatter={(val) => `${val} ms`} labelFormatter={(label) => `Data: ${label}`}></Tooltip>
                                <Legend verticalAlign="top"></Legend>
                                <Line connectNulls type="monotone" dataKey="iteratif" stroke="#34eb46" name="Iteratif" strokeWidth={4} activeDot={{r: 6}}></Line>
                                <Line connectNulls type="monotone" dataKey="rekursif" stroke="#f21d0a" name="Rekursif" strokeWidth={4} activeDot={{r: 6}}></Line>
                            </LineChart>
                    </ResponsiveContainer>
                ) } 
            </div>
        </div>
    );
}