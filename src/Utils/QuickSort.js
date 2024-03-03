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

const quickSort = async (arr, setArr, speedFactor, signal, low = undefined, high = undefined) => {
    if (low === undefined) {
        low = 0;
    }
    if (high === undefined) {
        high = arr.length - 1;
    }
    if (low >= high) {
        return new Promise(resolve => {resolve()});
    }

    let pivot = low;
    const duration = 1000 / (speedFactor ? speedFactor : 1);

    for(let i = low; i < high + 1; i++) {
        if (arr[i] < arr[pivot]) {
            await wait(duration, signal);
            [arr[pivot + 1], arr[i]] = [arr[i], arr[pivot + 1]];
            [arr[pivot], arr[pivot + 1]] = [arr[pivot + 1], arr[pivot]];
            pivot += 1;
            setArr([...arr]);
        }
    }

    await quickSort(arr, setArr, speedFactor, signal, low, pivot - 1);
    await quickSort(arr, setArr, speedFactor, signal, pivot + 1, high);

    return new Promise(resolve => { resolve() })
}

export default quickSort