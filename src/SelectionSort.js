const enableBigInput = (fn) => (...args) => {
    let result = fn(...args);
    while (typeof result === 'function') {
        result = result();
    }
    return result;
}

export function generateRandom(n) {
    const Arr = [];
    for (let i = 0; i < n; i++) {
        Arr.push(Math.floor(Math.random() * 10000) + 1);
    }
    return Arr;
}

// ITERATIF Ascending
function SelectionSortIteratifAsc(Arr, n) {
    let i = 0, j, minIndex, temp;
    while (i < n - 1) {
        minIndex = i;
        j = i + 1;
        while (j < n) {
            if (Arr[j] < Arr[minIndex]) minIndex = j;
            j++;
        }
        if (minIndex != i) {
            temp = Arr[i]; Arr[i] = Arr[minIndex]; Arr[minIndex] = temp;
        }
        i++;
    }
}

// ITERATIF Descending
function SelectionSortIteratifDesc(Arr, n) {
    let i = 0, j, minIndex, temp;
    while (i < n - 1) {
        minIndex = i;
        j = i + 1;
        while (j < n) {
            if (Arr[j] > Arr[minIndex]) minIndex = j;
            j++;
        }
        if (minIndex != i) {
            temp = Arr[i]; Arr[i] = Arr[minIndex]; Arr[minIndex] = temp;
        }
        i++;
    }
}

// [Info] ini Rekursif ada beberapa tambahan karena kalau input besar webnya crash
// jadi saya gunakan trampoline(EnableBigInput()) biar bisa input besar 
const findMinAscRaw = (Arr, n, j, currentMinIndex) => {
    if (j >= n) return currentMinIndex;

    let nextMinIndex = currentMinIndex;
    if (Arr[j] < Arr[currentMinIndex]) {
        nextMinIndex = j;
    }

    // REKURSIF: Pakai () => agar ditangkap trampoline
    return () => findMinAscRaw(Arr, n, j + 1, nextMinIndex);
}
const findMinAscSafe = enableBigInput(findMinAscRaw);

const findMinDescRaw = (Arr, n, j, currentMaxIndex) => {
    if (j >= n) return currentMaxIndex;

    let nextMaxIndex = currentMaxIndex;
    if (Arr[j] > Arr[currentMaxIndex]) { 
        nextMaxIndex = j;
    }

    return () => findMinDescRaw(Arr, n, j + 1, nextMaxIndex);
}
const findMinDescSafe = enableBigInput(findMinDescRaw);

//  REKURSIF Ascending
const SelectionSortRecursiveAscRaw = (Arr, n, i = 0) => {
    if (i >= n - 1) {
        return Arr;
    } else {
        const minIndex = findMinAscSafe(Arr, n, i + 1, i);
        if (minIndex != i) {
            let temp = Arr[i];
            Arr[i] = Arr[minIndex];
            Arr[minIndex] = temp;
        }
    }
    // Ini ada () => karena agar input n bisa > 5000
    return () => SelectionSortRecursiveAscRaw(Arr, n, i + 1);
}

//  REKURSIF Descending
const SelectionSortRecursiveDescRaw = (Arr, n, i = 0) => {
    if (i >= n - 1) {
        return Arr;
    } else {
        const maxIndex = findMinDescSafe(Arr, n, i+1, i);
        if (maxIndex != i) {
            let temp = Arr[i]; 
            Arr[i] = Arr[maxIndex]; 
            Arr[maxIndex] = temp;
        }
    }
    // Ini ada () => karena agar input n bisa > 5000
    return () => SelectionSortRecursiveDescRaw(Arr, n, i + 1);
}

export function selectionSortIterativeAsc(arr) {
    let A = [...arr];
    SelectionSortIteratifAsc(A, A.length);
    return A;
}

export function selectionSortIterativeDesc(arr) {
    let A = [...arr];
    SelectionSortIteratifDesc(A, A.length);
    return A;
}

export function selectionSortRecursiveAsc(arr) {
    let A = [...arr];
    const safeSort = enableBigInput(SelectionSortRecursiveAscRaw);
    safeSort(A, A.length, 0);
    return A;
}

export function selectionSortRecursiveDesc(arr) {
    let A = [...arr];
    const safeSort = enableBigInput(SelectionSortRecursiveDescRaw);
    safeSort(A, A.length, 0);
    return A;
}