import { useState } from "react";

const ChevronIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export default function AlgoritmaPanel() {
    const [isOpen, setIsOpen] = useState(false);

    const iterativeCode = `procedure SelectionSort_Iterative(Input/Output Arr : Array, Input n : Integer)
Kamus:
    i, j, minIndex, temp : Integer
Algoritma:
    i <- 0
    while i < n - 1 do
        minIndex <- i
        j <- i + 1
        
        while j < n do
            if Arr[j] < Arr[minIndex] then
                minIndex <- j
            endif
            j <- j + 1
        endwhile
        
        if minIndex != i then
            Arr[i] <- Arr[minIndex]
            Arr[minIndex] <- temp
        endif
        
        i <- i + 1
    endwhile
endprocedure`;

    const recursiveCode = `[Fungsi mencari index minimum]
function FindMinIndex(Input A : Array, Input n, j, currentMin : Integer) -> Integer
Kamus:
    nextMin : Integer
Algoritma:
    if j >= n then
        return currentMin
    endif

    nextMin <- currentMin
    if A[j] < A[currentMin] then
        nextMin <- j
    endif

    return FindMinIndex(A, n, j + 1, nextMin)
endfunction

[Fungsi Utama]
function SelectionSort_Recursive(Input A : Array, Input n, Input i : Integer) -> Array
Kamus:
    minIndex, temp : Integer
Algoritma:
    if i >= n - 1 then
        return A
    endif

    minIndex <- FindMinIndex(A, n, i + 1, i)

    if minIndex != i then
        temp <- A[i]
        A[i] <- A[minIndex]
        A[minIndex] <- temp
    endif

    return SelectionSort_Recursive(A, n, i + 1)
endfunction`;
    return (
        <div className="mb-8 border-b pb-8">

            <div className="bg-slate-900 p-6 rounded-lg shadow-sm border border-teal-300 my-8 ">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                        <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            📘 Apa itu Selection Sort?
                        </h2>
                        <p className="text-white text-sm leading-relaxed mb-4 text-justify">
                            Algoritma pengurutan sederhana yang bekerja dengan cara membagi array menjadi dua bagian:
                            <strong> bagian terurut</strong> dan <strong>bagian belum terurut</strong>.
                            Pada setiap langkah, algoritma mencari elemen <strong>terkecil</strong> (untuk Ascending) dari bagian yang belum terurut,
                            lalu menukarnya (swap) dengan elemen pertama dari bagian tersebut.
                        </p>
                        <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded border border-blue-200">
                            <strong>Konsep Algoritma:</strong> "Cari nilai minimum/maksimum, lalu tukar ke posisi depan."
                        </div>
                    </div>

                    <div className="md:w-1/3">
                        <h3 className="text-sm font-bold text-white mb-3 border-b pb-1">Analisis Kompleksitas (Big-O)</h3>
                        <div className="grid grid-cols-2 gap-3 text-center h-[80%]">
                            <div className="col-span-2 bg-gray-50 p-2 rounded border flex items-center justify-center flex-col">
                                <p className="text-xs text-gray-500 uppercase font-semibold">Waktu (Time)</p>
                                <p className="text-xl font-bold text-gray-800">O(n²)</p>
                                <p className="text-[10px] text-gray-400">Semua Kasus (Best/Avg/Worst)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-900">

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 transition-colors text-left"
                >
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-200">Implementasi Pseudocode</h2>
                        <span className="text-[8px] lg:text-xs bg-teal-900 text-teal-300 px-2 py-0.5 rounded-full border border-teal-700">
                            Klik untuk lihat
                        </span>
                    </div>
                    <ChevronIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-gray-700">

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-center bg-cyan-900/50 border border-cyan-700 text-cyan-500 px-3 py-1 rounded">Iteratif</label>
                                    <span className="text-xs text-gray-400 font-mono">Looping</span>
                                </div>
                                <pre className="rounded px-4 py-3 w-full border bg-black border-gray-700 text-cyan-500 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap shadow-inner">
                                    <code className="lg:text-[11px]">{iterativeCode}</code>
                                </pre>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-center bg-blue-900/50 border border-blue-700 text-blue-300 px-3 py-1 rounded">Rekursif</label>
                                    <span className="text-xs text-gray-400 font-mono">Pure Recursive (2 Fungsi)</span>
                                </div>
                                <pre className="rounded px-4 py-3 w-full border bg-black border-gray-700 text-blue-300 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap shadow-inner">
                                    <code className="lg:text-[11px]">{recursiveCode}</code>
                                </pre>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}