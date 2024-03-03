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

const selectionSort = (arr, setArr, speedFactor, signal) => {
    const duration = 1000 / (speedFactor ? speedFactor : 1);
    const n = arr.length;

    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < n; i++) {
            let minNum = arr[i], minIdx = i;
            for (let j = i; j < n; j++) {
                try {
                    await wait(duration, signal);
                } catch (error) {
                    if (error.message === 'Aborted') {
                        return reject(error);
                    }
                    throw error;
                }

                if (arr[j] < minNum) {
                    minNum = arr[j];
                    minIdx = j;
                }
            }
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            setArr([...arr]);
        }

        resolve();
    });
}

export default selectionSort;