class Walker {
    constructor(str) {
        this.string = str;
    }

    walk(callback) {
        const {string} = this;

        if (typeof callback === 'function') {
            for (let i = 0; i < string.length; i++) {
                const descriptor = {
                    prevIndex: i - 1,
                    index: i,
                    nextIndex: i + 1,
                    isFirst: !!string[i - 1],
                    isLast: !!string[i + 1],
                    prev: string[i - 1],
                    current: string[i],
                    next: string[i + 1],
                };

                if (callback(descriptor) === false) {
                    break;
                }
            }
        }

        return string;
    }
}

export default function(str) {
    return new Walker(str);
}