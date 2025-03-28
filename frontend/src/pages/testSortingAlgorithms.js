import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
} from "./sortingAlgorithms";

// Sample data for testing
const sampleData = [64, 34, 25, 12, 22, 11, 90];

// Testing each sorting algorithm
console.log("Bubble Sort:", bubbleSort([...sampleData]));
console.log("Selection Sort:", selectionSort([...sampleData]));
console.log("Insertion Sort:", insertionSort([...sampleData]));
console.log("Merge Sort:", mergeSort([...sampleData]));
console.log("Quick Sort:", quickSort([...sampleData]));
console.log("Heap Sort:", heapSort([...sampleData]));
