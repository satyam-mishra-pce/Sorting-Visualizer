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

const insertionSort = (arr, setArr, speedFactor, signal) => {
    const duration = 1000 / (speedFactor ? speedFactor : 1);
    const n = arr.length;

    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < n; i++) {
            for (let j = i; j >= 0; j--) {
                try {
                    await wait(duration, signal);
                } catch (error) {
                    if (error.message === 'Aborted') {
                        return reject(error);
                    }
                    throw error;
                }

                if (arr[j] < arr[j - 1]) {
                    [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
                    setArr([...arr]);
                } else {
                    break;
                }
            }
        }

        resolve();
    });
}

export default insertionSort;