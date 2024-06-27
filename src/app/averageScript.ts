const Ao5Numbers = [1.83, 2.13, 5.09, 7.33, 4.75];

const best = Math.max(...Ao5Numbers);
const worst = Math.min(...Ao5Numbers);

const filteredNumbers = Ao5Numbers.filter(num => num !== best && num !== worst);

const average = filteredNumbers.reduce((sum, num) => sum + num, 0) / filteredNumbers.length;

console.log(`Filtered Numbers: ${filteredNumbers}`);
console.log(`Average: ${average.toFixed(2)}`);