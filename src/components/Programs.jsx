import { use, useState } from "react";
import { selectionSortIterative, selectionSortRecursive, generateRandom } from "/src/SelectionSort";
import ControlPanel from "./ControlPanel";
import Status from "./Status";
import Chart from "./Chart";

export default function Programs() {
    const [selectedSize, setSelectedSize] = useState(100)
    const [arrayData, setArrayData] = useState([])
    const [isSorted, setIsSorted] = useState(false)
    const [isSorting, setIsSorting] = useState(false)
    const [lastSortTime, setLastSortTime] = useState(0)
    const [lastSortMethod, setLastSortMethod] = useState("")
    const [chartData, setChartData] = useState([])

    const sizeOptions = [10, 50, 100, 500, 1000, 5000, 10000]

    function handleGenerate(sizeOverride = null) {
        const size = sizeOverride || Number(selectedSize)
        const newData = generateRandom(size)
        setArrayData(newData)
        setIsSorted(false)
        setLastSortTime(0)
        setLastSortMethod("")
        return newData
    }

    function handleSort(method) {
        if (arrayData.length === 0 && !isSorting) {
            return
        }
        setIsSorted(true)

        setTimeout(() => {
            const currentData = arrayData.length > 0 ? arrayData : handleGenerate()
            const inputArr = [...currentData]
            let sortedArr = []
            let startTime, endTime

            startTime = performance.now()

            if (method == "iterative") {
                sortedArr = selectionSortIterative(inputArr)
            } else {
                sortedArr = selectionSortRecursive(inputArr)
            }

            endTime = performance.now()
            const executionTime = parseFloat((endTime - startTime).toFixed(4))

            setArrayData(sortedArr)
            setIsSorted(true)
            setLastSortMethod(method === "iterative" ? "Iteratif" : "Rekursif")
            setLastSortTime(executionTime)
            setIsSorting(false)
            updateChartData(currentData.length, method, executionTime)
        }, 100);
    }

    function runAutoBenchmark() {
        setIsSorting(true)
        setChartData([])
        setTimeout(() => {
            const results = []
            sizeOptions.forEach((n) => {
                const randomData = generateRandom(n)

                const startIter = performance.now()
                selectionSortIterative([...randomData])
                const endIter = performance.now()

                const startRec = performance.now()
                selectionSortRecursive([...randomData])
                const endRec = performance.now()

                results.push({
                    n: n,
                    iteratif: parseFloat((endIter - startIter).toFixed(4)),
                    rekursif: parseFloat((endRec - startRec).toFixed(4))
                })
            })
            setChartData(results)
            setIsSorting(false)
            handleGenerate(sizeOptions[sizeOptions.length - 1])
        }, 500)
    }

    function updateChartData(n, method, time) {
        setChartData((prevdata) => {
            const existingIndex = prevdata.findIndex((item) => item.n === n)
            let newData;

            if (existingIndex >= 0) {
                const updatedTime = {...prevdata[existingIndex]}
                if (method === "iterative") {
                    updatedTime.iteratif = time
                }
                if (method === "recursive") {
                    updatedTime.rekursif = time
                }
                newData = [...prevdata]
                newData[existingIndex] = updatedTime
            } else {
                const newItem = {n: n}
                if (method === "iterative") {
                    newItem.iteratif = time
                }
                if (method === "recursive") {
                    newItem.rekursif = time
                }
                newData = [...prevdata, newItem]
            }
            return newData.sort((a, b) => a.n - b.n)
        })
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Analisis Algoritma Selection Sort Iterative dan Recursive
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <ControlPanel selectedSize={selectedSize} setSelectedSize={setSelectedSize} handleGenerate={handleGenerate} handleSort={handleSort} runAutoBenchMark={runAutoBenchmark} isSorting={isSorting} sizeOptions={sizeOptions}></ControlPanel>
                    <Status arrayData={arrayData} isSorted={isSorted} lastSortedMethod={lastSortMethod} lastSortTime={lastSortTime}></Status>
                </div>
                <div className="lg:col-span-2">
                    <Chart chartData={chartData} reserChart={() => setChartData([])}></Chart>
                </div>
            </div>
        </div>
    );
}