export function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = [
        { id: 1, name: "Kaviya" },
        { id: 2, name: "Visalachi" },
        { id: 3, name: "Niranjan" },
      ];

      const success = true; // Simulate success or failure

      if (success) {
        resolve(mockData);
      } else {
        reject("Error: Failed to fetch data.");
      }
    }, 2000);
  });
}
