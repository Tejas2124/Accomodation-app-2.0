const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  const generateRandomDecimal = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(4);
  };
  
  const generateRandomHotel = () => {
    const majorCities = [
      // Major cities from different states in India
      { city: "Mumbai", state: "Maharashtra" },
      { city: "Delhi", state: "Delhi" },
      { city: "Bangalore", state: "Karnataka" },
      { city: "Chennai", state: "Tamil Nadu" },
      // ... Include other major cities
    ];
  
    const randomCity = majorCities[generateRandomNumber(0, majorCities.length - 1)];
  
    return {
      hotelName: `Hotel ${randomCity.city} ${generateRandomNumber(1, 100)}`,
      address: `${generateRandomNumber(100, 999)} ${randomCity.city} Street, ${randomCity.state}`,
      pricePerDay: generateRandomNumber(100, 500),
      latitude: parseFloat(generateRandomDecimal(12, 28)),
      longitude: parseFloat(generateRandomDecimal(70, 78)),
      maxCapacity: generateRandomNumber(2, 6)
    };
  };
  
  const generateDummyHotels = () => {
    const hotels = [];
    const numberOfHotels = 1000;
  
    for (let i = 0; i < numberOfHotels; i++) {
      hotels.push(generateRandomHotel());
    }
  
    return hotels;
  };
  
  const dummyHotelData = generateDummyHotels();
  module.exports=dummyHotelData
  