const getSlicedImages = (fileType, fileBase64, rows, columns) => {
    const image = document.createElement("img");
    image.src = fileBase64;

    return new Promise((resolve) => {
        const ret = []
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        setTimeout(() => {
            const fullHeight = image.naturalHeight, fullWidth = image.naturalWidth;
            const width = fullWidth / columns, height = fullHeight / rows;
            canvas.width = width;
            canvas.height = height;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    ctx.drawImage(
                        image,
                        j * width,
                        i * height,
                        width,
                        height,
                        0,
                        0,
                        width,
                        height
                    );
                    ret.push(canvas.toDataURL(fileType));
                    ctx.clearRect(0, 0, width, height);
                }
            }
            resolve(ret);
        });
    });
}

export default getSlicedImages;