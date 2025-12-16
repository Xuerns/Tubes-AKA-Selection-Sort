export default function Status({ arrayData, isSorted, lastSortedMethod, lastSortTime}) {
    function renderArrayPreview() {
        if (!arrayData || arrayData.length === 0) {
            return <p className="text-gray-500 italic">Data Kosong</p>
        }

        const awal = arrayData.slice(0, 10)
        const akhir = arrayData.slice(-10)

        return(
            <div className="p-3 rounded font-mono text-xs md:text-sm break-all">
                <span className="font-bold">{awal.join(", ")}</span>
                {arrayData.length > 20 && (
                    <span className="text-gray-400">
                        {" "} ... {arrayData.length - 20} item ... {" "}
                    </span>
                )} 
                {arrayData.length > 20 && (
                    <span className="font-bold">{akhir.join(", ")}</span>
                )}
            </div>
        )
    }

    return(
        <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2">Status Data Terakhir:</h3>
            <div className="space-y-1 text-sm">
                <p>
                    Total Data: <strong>{arrayData.length}</strong>
                </p>
                <p>
                    Kondisi: {" "}
                    {isSorted ? (
                        <span className="text-green-400 font-bold">Sudah di Sorting</span>
                    ) : (
                        <span className="text-red-500 font-bold">Belum di Sorting</span>
                    ) }
                    {isSorted && (
                        <p className="mt-2 p-2 border rounded text-amber-600">
                            Waktu Eksekusi: <strong>{lastSortTime}</strong>
                        </p>
                    )}
                    <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-500 mb-1">Preview: </p>
                        {renderArrayPreview()}
                    </div>
                </p>
            </div>
        </div>
    );
}