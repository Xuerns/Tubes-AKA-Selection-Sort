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

//  REKURSIF Ascending
const SelectionSortRecursiveAscRaw = (Arr, n, i = 0) => {
    if (i >= n - 1) return Arr;

    let minIndex = i;
    let j = i + 1;
    while (j < n) {
        if (Arr[j] < Arr[minIndex]) minIndex = j;
        j++;
    }
    if (minIndex != i) {
        let temp = Arr[i]; Arr[i] = Arr[minIndex]; Arr[minIndex] = temp;
    }
    return () => SelectionSortRecursiveAscRaw(Arr, n, i + 1);
}

//  REKURSIF Descending
const SelectionSortRecursiveDescRaw = (Arr, n, i = 0) => {
    if (i >= n - 1) return Arr;

    let minIndex = i;
    let j = i + 1;
    while (j < n) {
        if (Arr[j] > Arr[minIndex]) minIndex = j;
        j++;
    }
    if (minIndex != i) {
        let temp = Arr[i]; Arr[i] = Arr[minIndex]; Arr[minIndex] = temp;
    }
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