const wait = async (duration, signal) => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            resolve();
        }, duration);

        signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new Error('Aborted'));
        });
    });
}

const merge = async (arr, setArr, low, mid, high, duration, signal) => {

    if (arr[mid] <= arr[mid + 1])
        return new Promise(resolve => { resolve(); })

    let low2 = mid + 1;
    while (low < mid + 1 && low2 < high + 1) {
        await wait(duration, signal);

        if (arr[low] <= arr[low2]) {
            low += 1;
            continue;
        }
        const temp = arr[low2];
        let idx = low2;
        while (idx !== low) {
            arr[idx] = arr[idx - 1];
            idx -= 1;
        }
        arr[low] = temp;
        setArr([...arr]);
        low += 1;
        mid += 1;
        low2 += 1;
    }

    return new Promise(resolve => {resolve()})
}

const mergeSort = async (arr, setArr, speedFactor, signal, low = undefined, high = undefined) => {
    
    if (low === undefined) {
        low = 0;
    }
    if (high === undefined) {
        high = arr.length - 1;
    }
    if (low === high) {
        return new Promise(resolve => {resolve()});
    }

    const mid = Math.floor((low + high) / 2);

    await mergeSort(arr, setArr, speedFactor, signal, low, mid);
    await mergeSort(arr, setArr, speedFactor, signal, mid + 1, high);

    const duration = 1000 / (speedFactor ? speedFactor : 1);
    await merge(arr, setArr, low, mid, high, duration, signal);

    return new Promise(resolve => { resolve() })
}

export default mergeSort;