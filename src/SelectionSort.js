const enableBigInput = (fn) => (...args) => {
    let result = fn(...args);

    while (typeof result === 'function') {
        result = result();
    }
    return result;
}

export function selectionSortIterative(arr) {
    let n = arr.length;

    let result = [...arr];
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if ([result[minIndex] < result[minIndex]]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    return result;
}

function recursiveAlgoritm(arr, startIndex) {
    if (startIndex >= arr.length - 1) {
        return arr;
    }

    let minIndex = startIndex;
    for (let j = startIndex + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
    }
    if (minIndex !== startIndex) {
        [arr[startIndex], arr[minIndex]] = [arr[minIndex], arr[startIndex]];
    }
    return () => recursiveAlgoritm(arr, startIndex + 1);
}

function selectionSortRecursive(arr) {
    let result = [...arr];
    const startSort = enableBigInput(recursiveAlgoritm);
    return startSort(result, 0);
}

export function generateRandom(length) {
    return Array.from({length}, () => Math.floor(Math.random() * 10000));
}