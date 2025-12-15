import { useState } from "react";
import { selectionSortIterative, selectionSortRecursive, generateRandom } from "/src/SelectionSort";
import ControlPanel from "./ControlPanel";
import Status from "./Status";
import Chart from "./Chart";

export default function Programs() {

    const sizeOptions = [10, 50, 100, 500, 1000, 5000, 10000]
    return(
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Analisis Algoritma Selection Sort Iterative dan Recursive
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <ControlPanel sizeOptions={sizeOptions}></ControlPanel>
                    <Status></Status>
                </div>
            </div>
        </div>
    );
}