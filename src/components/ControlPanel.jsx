export default function ControlPanel({ selectedSize, setSelectedSize, handleGenerate, handleSort, runAutoBenchMark, isSorting, sizeOptions }) {
    
    const handleInputChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 0;
        if (val > 50000) val = 50000; 
        setSelectedSize(val);
    };

    return(
        <div className="p-5 rounded-lg shadow border border-teal-300 bg-slate-900">
            <h3 className="font-bold text-white mb-4 border-b pb-2">Panel Kontrol</h3>
            
            <div className="mb-6">
                <label className="block text-xs font-bold text-white uppercase tracking-wide mb-2">Mode Manual</label>
                
                <div className="mb-4">
                    <label className="text-white block text-sm font-semibold mb-1">Jumlah Data (N):</label>
                    
                    <div className="flex gap-2 mb-2">
                        <input 
                            type="number"
                            min="1"
                            max="50000"
                            className="border p-2 rounded w-2/3 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-200 outline-none font-mono font-bold"
                            value={selectedSize}
                            onChange={handleInputChange}
                            disabled={isSorting}
                            placeholder="Ketik jumlah..."
                        />

                        <select 
                            className="border p-2 rounded w-1/3 bg-slate-700 text-white text-xs focus:ring-2 focus:ring-blue-200 outline-none cursor-pointer hover:bg-slate-600"
                            value={sizeOptions.includes(selectedSize) ? selectedSize : ""} 
                            onChange={(e) => setSelectedSize(Number(e.target.value))}
                            disabled={isSorting}
                        >
                            <option value="" disabled>Preset</option>
                            {sizeOptions.map((size) => (
                                <option key={size} value={size}>
                                    {size.toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button 
                        className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded text-sm font-bold hover:bg-blue-200 active:bg-blue-300 transition shadow-sm" 
                        onClick={() => handleGenerate()}
                        disabled={isSorting || selectedSize <= 0}
                    >
                        {isSorting ? "Generating..." : "🎲 Generate Random Data"}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                        <button 
                            className="bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-2 rounded text-xs md:text-sm font-bold shadow-sm transition" 
                            onClick={() => handleSort("iterative-asc")} disabled={isSorting || selectedSize <= 0} >
                            Iteratif Asc
                        </button>
                        <button 
                            className="bg-teal-400 hover:bg-teal-600 active:bg-teal-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-2 rounded text-xs md:text-sm font-bold shadow-sm transition" 
                            onClick={() => handleSort("iterative-desc")} disabled={isSorting || selectedSize <= 0}>
                            Iteratif Desc
                        </button>

                        <button 
                            className="bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-2 rounded text-xs md:text-sm font-bold shadow-sm transition" 
                            onClick={() => handleSort("recursive-asc")} disabled={isSorting || selectedSize <= 0}>
                            Rekursif Asc
                        </button>
                        <button 
                            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-2 rounded text-xs md:text-sm font-bold shadow-sm transition" 
                            onClick={() => handleSort("recursive-desc")} disabled={isSorting || selectedSize <= 0}>
                            Rekursif Desc
                        </button>
                </div>
            </div>

            <div className="border-t border-slate-700 pt-4 bg-slate-800/50 -mx-5 px-5 -mb-5 pb-5 rounded-b-lg">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-2">Mode Otomatis</label>
                    <p className="text-xs text-gray-400 mb-3">
                        Benchmark 4 Metode sekaligus pada ukuran preset standar.
                    </p>
                    <button 
                        className="w-full bg-slate-700 hover:bg-slate-600 active:bg-slate-800 disabled:bg-gray-400 text-white border border-teal-500/30 py-3 rounded font-bold shadow-md transition-all flex justify-center items-center gap-2 text-sm" 
                        onClick={runAutoBenchMark} 
                        disabled={isSorting}
                    >
                        {isSorting ? "Processing..." : "🚀 Jalankan Benchmark Full"}
                    </button>
            </div>
        </div>
    );
}