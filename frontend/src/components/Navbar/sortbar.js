import React, { useState } from "react";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
} from "../../pages/sortingAlgorithms";

const Sortbar = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");
  const [data, setData] = useState([64, 34, 25, 12, 22, 11, 90]); // Sample data

  const handleSort = () => {
    let sortedData;
    switch (selectedAlgorithm) {
      case "bubbleSort":
        sortedData = bubbleSort([...data]);
        break;
      case "selectionSort":
        sortedData = selectionSort([...data]);
        break;
      case "insertionSort":
        sortedData = insertionSort([...data]);
        break;
      case "mergeSort":
        sortedData = mergeSort([...data]);
        break;
      case "quickSort":
        sortedData = quickSort([...data]);
        break;
      case "heapSort":
        sortedData = heapSort([...data]);
        break;
      default:
        sortedData = data;
    }
    setData(sortedData);
  };

  return (
    <div>
      <select
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
      >
        <option value="bubbleSort">Bubble Sort</option>
        <option value="selectionSort">Selection Sort</option>
        <option value="insertionSort">Insertion Sort</option>
        <option value="mergeSort">Merge Sort</option>
        <option value="quickSort">Quick Sort</option>
        <option value="heapSort">Heap Sort</option>
      </select>
      <button onClick={handleSort}>Sort</button>
      <div>Sorted Data: {data.join(", ")}</div>
    </div>
  );
};

export default Sortbar;
