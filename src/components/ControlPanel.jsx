export default function ControlPanel({ sizeOptions }) {

    return(
        <div className="p-5 rounded-lg shadow border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Mode Manual</h3>
            <label className="block text-sm font-semibold mb-2">Pilih Jumlah Data (N):</label>
            <div className="flex gap-2 mb-4">
                <select className="border p-2 rounded w-full bg-gray-50">
                    {sizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size} items
                        </option>
                    ))}
                </select>
                <button className="bg-green-300 px-3 py-2 rounded text-sm active:bg-green-600">Generate</button>
            </div>

            <label className="block text-sm font-semibold mb-2">Jalankan:</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
                    <button className="bg-green-400 active:bg-green-600 disabled:bg-gray-400 text-white py-2 rounded text-sm font-bold">Sort Iteratif</button>
                    <button className="bg-green-400 active:bg-green-600 disabled:bg-gray-400 text-white py-2 rounded text-sm font-bold">Sort Rekursif</button>
                    <button className="col-span-2 bg-green-500 active:bg-green-700 disabled:bg-gray-500 text-white py-2 rounded font-bold">Sort Sekaligus</button>
            </div>

            <div className="border-t pt-4">
                    <h3 className="font-bold text-gray-700 mb-2">Mode Otomatis</h3>
                    <p className="text-sm text-gray-500 mb-3">Otomatis Menjalankan semua ukuran (10 s/d 10.000)</p>
                    <button className="w-full bg-gray-500 active:bg-gray-700 disabled:bg-gray-400 text-white py-3 rounded font-bold shadow-md translation-all">
                        Jalankan
                    </button>
            </div>
        </div>
    );
}