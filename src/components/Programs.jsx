import { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { selectionSortIterativeAsc, selectionSortIterativeDesc, selectionSortRecursiveAsc, selectionSortRecursiveDesc, generateRandom } from "/src/SelectionSort"; 
import ControlPanel from "./ControlPanel";
import Status from "./Status";
import Chart from "./Chart";
import AlgoritmaPanel from "./AlgoritmaPanel";
import Hero from "./Hero";

export default function Programs() {
    const [selectedSize, setSelectedSize] = useState(100);
    const [arrayData, setArrayData] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [lastSortTime, setLastSortTime] = useState(0);
    const [lastSortMethod, setLastSortMethod] = useState("");
    const [chartData, setChartData] = useState([]);
    const [initialData, setInitialData] = useState([])
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const measureExecution = (sortFn, data) => {
        const n = data.length;
        const iterations = n < 1000 ? 50 : 1; 

        let totalTime = 0;
        let lastResult = [];

        for (let i = 0; i < iterations; i++) {
            const tempArray = [...data]; 
            const start = performance.now();
            sortFn(tempArray); 
            const end = performance.now();
            
            totalTime += (end - start);
            
            if (i === iterations - 1) {
                lastResult = tempArray;
            }
        }

        return {
            time: parseFloat((totalTime / iterations).toFixed(4)), 
            result: lastResult
        };
    };

    const particlesOptions = useMemo(() => ({
        fullScreen: { enable: false, zIndex: 0 },
        background: { color: { value: "#000000" } },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
            },
            modes: {
                grab: { distance: 140, links: { opacity: 1 } },
                push: { quantity: 4 },
            },
        },
        particles: {
            color: { value: "#ffffff" },
            links: {
                color: "#00f3ff",
                distance: 200,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: { enable: true, area: 800 },
                value: 80,
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    }), []);

    const sizeOptions = [10, 50, 100, 500, 1000, 2000, 5000, 10000]; 

    function handleGenerate(sizeOverride = null) {
        const size = sizeOverride || Number(selectedSize);
        const newData = generateRandom(size);
        setArrayData(newData);
        setInitialData([...newData]);
        setIsSorted(false);
        setLastSortTime(0);
        setLastSortMethod("");
        return newData;
    }

    function handleSort(methodKey) {
        let currentData = arrayData;
        if (arrayData.length === 0) {
            currentData = handleGenerate();
        }

        if (isSorting) return;
        setIsSorting(true);

        setTimeout(() => {
            let metric;

            if (methodKey === "iterative-asc") {
                metric = measureExecution(selectionSortIterativeAsc, currentData);
            } else if (methodKey === "iterative-desc") {
                metric = measureExecution(selectionSortIterativeDesc, currentData);
            } else if (methodKey === "recursive-asc") {
                metric = measureExecution(selectionSortRecursiveAsc, currentData);
            } else if (methodKey === "recursive-desc") {
                metric = measureExecution(selectionSortRecursiveDesc, currentData);
            }

            setArrayData(metric.result);
            setIsSorted(true);

            const niceName = methodKey.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
            setLastSortMethod(niceName);
            setLastSortTime(metric.time);
            setIsSorting(false);

            updateChartData(currentData.length, methodKey, metric.time);
        }, 100);
    }

    function runAutoBenchmark() {
        setIsSorting(true);
        setChartData([]);

        setTimeout(() => {
            const results = [];
            
            sizeOptions.forEach((n) => {
                const randomData = generateRandom(n);

                const tIterAsc = measureExecution(selectionSortIterativeAsc, randomData).time;
                const tIterDesc = measureExecution(selectionSortIterativeDesc, randomData).time;
                const tRecAsc = measureExecution(selectionSortRecursiveAsc, randomData).time;
                const tRecDesc = measureExecution(selectionSortRecursiveDesc, randomData).time;

                results.push({
                    n: n,
                    iteratifAsc: tIterAsc,
                    iteratifDesc: tIterDesc,
                    rekursifAsc: tRecAsc,
                    rekursifDesc: tRecDesc,
                });
            });

            setChartData(results);
            setIsSorting(false);
            
            handleGenerate(sizeOptions[sizeOptions.length - 1]);
        }, 500);
    }

    function updateChartData(n, methodKey, time) {
        setChartData((prevdata) => {
            const existingIndex = prevdata.findIndex((item) => item.n === n);
            let newData;
            let chartKey = "";
            if (methodKey === "iterative-asc") chartKey = "iteratifAsc";
            if (methodKey === "iterative-desc") chartKey = "iteratifDesc";
            if (methodKey === "recursive-asc") chartKey = "rekursifAsc";
            if (methodKey === "recursive-desc") chartKey = "rekursifDesc";

            if (existingIndex >= 0) {
                const updatedItem = { ...prevdata[existingIndex] };
                updatedItem[chartKey] = time;
                newData = [...prevdata];
                newData[existingIndex] = updatedItem;
            } else {
                const newItem = { n: n };
                newItem[chartKey] = time;
                newData = [...prevdata, newItem];
            }
            return newData.sort((a, b) => a.n - b.n);
        });
    }

    return (
        <div className="min-h-screen bg-black py-8 px-4 relative">
            {init && (
                <Particles
                    id="tsparticles"
                    options={particlesOptions}
                    className="absolute inset-0 z-0"></Particles>
            )}

            <div className="relative z-10">
                <Hero />
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                <ControlPanel
                                    selectedSize={selectedSize}
                                    setSelectedSize={setSelectedSize}
                                    handleGenerate={handleGenerate}
                                    handleSort={handleSort}
                                    runAutoBenchMark={runAutoBenchmark}
                                    isSorting={isSorting}
                                    sizeOptions={sizeOptions}
                                />
                                <Status
                                    arrayData={arrayData}
                                    initialData={initialData}
                                    isSorted={isSorted}
                                    lastSortedMethod={lastSortMethod}
                                    lastSortTime={lastSortTime}
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <Chart
                                chartData={chartData}
                                resetChart={() => setChartData([])}
                            />
                        </div>
                    </div>

                    <AlgoritmaPanel className="" />
                </div>
            </div>
        </div>
    );
}