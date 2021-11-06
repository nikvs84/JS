console.log("Hello, World!");
class NumberDistributor {
    constructor(num) {
        this.result = new Array();
        this.numArr = Array.from(String(num), Number);
    }
    printVariants() {
        const length = this.numArr.length;
        for (let i = 0; i < this.numArr.length; i++) {
            const num = this.numArr[i];
            const alreadyUsed = new Set();
            console.log(`Process the number ${num}`);
            for (let j = 0; j < length; j++) {
                console.log(`Set ${num} to column ${j}.`);
                this.setInFirstEmptyCellOfTableColumn(num, length, j, alreadyUsed);
            }
        }
        console.log(this.result);
    }

    setInFirstEmptyCellOfTableColumn(num, rowSize, position, alreadyUsedForThisNum) {
        let i = 0;
        let complete = false;
        while(!complete) {
            if (!alreadyUsedForThisNum.has(i)) {
                complete = this.setIfPositionOfRowIsEmpty(num, this.getRow(i, rowSize), position);
                if (complete) {
                    alreadyUsedForThisNum.add(i);
                }
            }
            i++;
        }
    }

    setIfPositionOfRowIsEmpty(num, row, position) {
        if (!row[position]) {
            row[position] = num;
            return true;
        } else {
            return false;
        }
    }

    getRow(i, size) {
        for (let j = 0; j <= i; j++) {
            if (this.result.length < i + 1) {
                this.result.push(new Array(size));
            }
        }
        return this.result[i];
    }
};

class PermutationGenerator {
    constructor(digitArr, numberFilterPredicate) {
        this.digitArr = digitArr;
        this.digitsCount = digitArr.length;
        this.maxNumber = this.getMaxNumber(digitArr);
        this.digitToCountMap = this.getDigitToCountMap(this.digitArr);
        this.numberFilterPredicate = numberFilterPredicate;
    }

    getMaxNumber(digitArr) {
        const digitsCount = digitArr.length;
        return Number(digitArr.sort().reverse().join(''));
    }


    generatePrimals() {
        this.generate(this.isPrimal);
    }

    generate(predicate) {
        for (let i = 0; i <= this.maxNumber; i++) {
            if (this.isSuitable(i, !!predicate ? predicate : this.numberFilterPredicate)) {
                console.log(i)
            }
        }
    }

    isSuitable(i, predicate) {
        const arr = Array.from(String(i), Number);
        const map = this.getDigitToCountMap(arr);

        for (const [key, value] of map.entries()) {
            const frominInitial = this.digitToCountMap.get(key);
            if (!frominInitial || value > this.digitToCountMap.get(key)) {
                return false;
            }
        }
        
        return !!predicate ? predicate(i) : true;
    }

    isPrimal(num) {
        const sqrt = Math.sqrt(num);
        for (let i = 2; i < sqrt; i++) {
            if (num % i == 0) {
                return false;
            }
        }

        return true;
    }

    getDigitToCountMap(digitArr) {
        let map = new Map();
        for (let i = 0; i < digitArr.length; i++) {
            const element = digitArr[i];
            if (!map.has(element)) {
                map.set(element, 1);   
            } else {
                map.set(element, map.get(element) + 1);
            }
        }
        return map;
    }

}