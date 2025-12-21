export default function Status({ arrayData, initialData, isSorted, lastSortedMethod, lastSortTime }) {
    
    function renderArrayPreview(data) {
        if (!data || data.length === 0) {
            return <p className="text-gray-500 italic text-center py-2 text-xs">Belum ada data</p>;
        }

        const awal = data.slice(0, 10);
        const akhir = data.slice(-10);

        return (
            <div className="bg-slate-900 p-3 rounded border font-mono text-xs text-teal-300 break-all overflow-hidden border-teal-900/50">
                <span className="font-bold">[{awal.join(", ")}</span>
                {data.length > 20 && (
                    <span className="text-gray-500 select-none">
                        {" "} ... {data.length - 20} items ... {" "}
                    </span>
                )}
                {data.length > 20 && (
                    <span className="font-bold">{akhir.join(", ")}]</span>
                )}
                {data.length <= 20 && <span className="font-bold">]</span>}
            </div>
        );
    }

    return (
        <div className="bg-slate-900 p-5 rounded-lg shadow border border-teal-300">
            <h3 className="font-bold text-white mb-3 border-b border-gray-700 pb-2">Status Eksekusi</h3>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                    <p className="text-gray-400 text-xs">Total Data</p>
                    <p className="font-bold text-lg text-white">{arrayData?.length.toLocaleString() || 0}</p>
                </div>
                <div>
                    <p className="text-gray-400 text-xs">Status</p>
                    {isSorted ? (
                        <span className="inline-block bg-green-900/30 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-800">
                            Sorted
                        </span>
                    ) : (
                        <span className="inline-block bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-xs font-bold border border-gray-700">
                            Unsorted
                        </span>
                    )}
                </div>
            </div>

            {isSorted && lastSortedMethod && (
                <div className="mb-4 bg-amber-900/20 border border-amber-700/50 p-3 rounded">
                    <p className="text-xs text-amber-500 font-semibold uppercase">Hasil ({lastSortedMethod})</p>
                    <p className="text-2xl font-bold text-amber-400">
                        {lastSortTime} <span className="text-sm font-normal text-amber-600">ms</span>
                    </p>
                </div>
            )}

            <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                    Data Awal (Unsorted):
                </p>
                {renderArrayPreview(initialData)}
            </div>

            {isSorted && (
                <div className="animate-pulse-once"> 
                    <p className="text-xs font-semibold text-green-400 mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Data Akhir (Sorted):
                    </p>
                    {renderArrayPreview(arrayData)}
                </div>
            )}
        </div>
    );
}