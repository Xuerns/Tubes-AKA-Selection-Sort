export default function ControlPanel({ selectedSize, setSelectedSize, handleGenerate, handleSort, runAutoBenchMark, isSorting ,sizeOptions }) {
    
    return(
        <div className="p-5 rounded-lg shadow border border-teal-300 bg-slate-900">
            <h3 className="font-bold text-white mb-4 border-b pb-2">Panel Kontrol</h3>
            
            <div className="mb-6">
                <label className="block text-xs font-bold text-white uppercase tracking-wide mb-2">Mode Manual</label>
                <div className="mb-3">
                    <label className="text-white block text-sm font-semibold mb-1">Jumlah Data (N):</label>
                    <div className="flex gap-2">
                        <select 
                            className="border p-2 rounded w-full bg-gray-50 focus:ring-2 focus:ring-blue-200 outline-none" 
                            value={selectedSize} 
                            onChange={(e) => setSelectedSize(Number(e.target.value))}
                            disabled={isSorting}
                        >
                            {sizeOptions.map((size) => (
                                <option key={size} value={size}>
                                    {size.toLocaleString()} items
                                </option>
                            ))}
                        </select>
                        <button 
                            className="bg-blue-100 text-blue-700 px-4 py-2 rounded text-sm font-semibold hover:bg-blue-200 active:bg-blue-300 transition" 
                            onClick={() => handleGenerate()}
                            disabled={isSorting}
                        >
                            Generate
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                        <button 
                            className="bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 text-white py-2 rounded text-xs md:text-sm font-bold shadow-sm" 
                            onClick={() => handleSort("iterative-asc")} disabled={isSorting} >
                            Iteratif Asc
                        </button>
                        <button 
                            className="bg-teal-300 hover:bg-teal-700 active:bg-teal-800 disabled:bg-gray-300 text-white py-2 rounded text-xs md:text-sm font-bold shadow-sm" 
                            onClick={() => handleSort("iterative-desc")} disabled={isSorting}>
                            Iteratif Desc
                        </button>

                        <button 
                            className="bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-gray-300 text-white py-2 rounded text-xs md:text-sm font-bold shadow-sm" 
                            onClick={() => handleSort("recursive-asc")} disabled={isSorting}>
                            Rekursif Asc
                        </button>
                        <button 
                            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-gray-300 text-white py-2 rounded text-xs md:text-sm font-bold shadow-sm" 
                            onClick={() => handleSort("recursive-desc")} disabled={isSorting}>
                            Rekursif Desc
                        </button>
                </div>
            </div>

            <div className="border-t pt-4 bg-slate-900 -mx-5 px-5 -mb-5 pb-5 rounded-b-lg">
                    <label className="block text-xs font-bold text-white uppercase tracking-wide mb-2">Mode Otomatis</label>
                    <p className="text-xs text-white mb-3">
                        Benchmark 4 Metode sekaligus (Iteratif Asc/Desc & Rekursif Asc/Desc).
                    </p>
                    <button 
                        className="w-full bg-slate-700 hover:bg-slate-800 active:bg-slate-900 disabled:bg-gray-400 text-white py-3 rounded font-bold shadow-md transition-all flex justify-center items-center gap-2" 
                        onClick={runAutoBenchMark} 
                        disabled={isSorting}
                    >
                        {isSorting ? "Processing..." : "🚀 Jalankan Benchmark Full"}
                    </button>
            </div>
        </div>
    );
}