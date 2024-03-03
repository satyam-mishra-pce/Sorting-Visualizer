const readFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(resolve => {
        reader.addEventListener("load", () => {
            resolve(reader.result);
        })
    });
}

export default readFile;