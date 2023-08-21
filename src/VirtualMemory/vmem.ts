import { table } from "table";

const numberToHex = (addr: number) => {
    return "0x" + addr.toString(16).padStart(4, "0");
}

const hexToNumber = (hex: string) => {
    console.log(hex, parseInt(hex));
    return parseInt(hex);
}

export class VirtualMemory {
    private memory: (number | undefined | null)[];
    private wordSize: number;

    constructor(size: number = 1000, wordSize: number = 8) {
        this.memory = new Array(Math.floor(size / wordSize));
        this.wordSize = wordSize;
    }

    put(location: string, value: number | undefined | null) {
        const position: number = hexToNumber(location) / this.wordSize;

        if (position % 1 !== 0) {
            throw new Error(`${location} is not valid`);
        }

        if (position > this.memory.length) throw new Error("Out of addressable memory range");
        if (value && (value < 0 || value > 2 ** this.wordSize)) throw new Error("Values must be between 0 and " + (2 ** this.wordSize));

        console.log("put", location, position, value);
        this.memory[hexToNumber(location) / this.wordSize] = value;
    }

    retrieve(location: string) {
        console.log("retrieve", hexToNumber(location));
        return this.memory[hexToNumber(location) / this.wordSize];
    }

    show(long: boolean = false) {
        const tableData = [];

        if (long) {
            for (let i = 0; i < this.memory.length; ++i) {
                tableData.push([i.toString(), numberToHex(i * this.wordSize), this.memory[i]]);
            }
        } else {
            const halfway = Math.floor(this.memory.length / 2);

            for (let i = 0; i < halfway; ++i) {
                tableData.push([i.toString(), numberToHex(i * this.wordSize), this.memory[i],
                    "", i + halfway, numberToHex((i + halfway) * this.wordSize), this.memory[i + halfway]]);
            }
        }

        console.log(table(tableData));
    }

    size() {
        return this.memory.length;
    }
}

