const fetchData = (callback) => {
  console.log("Fetching data...");

  setTimeout(() => {
    const mockData = [
      { id: 1, name: "Kaviya", age: 19 },
      { id: 2, name: "Niranjan", age: 30 },
      { id: 3, name: "Visalachi", age: 22 },
    ];

    console.log("Data fetched!");
    callback(mockData);
  }, 2000); // Simulating 2-second delay
};

export default fetchData;
