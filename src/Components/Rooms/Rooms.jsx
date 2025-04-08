import React from 'react';
import { Carousel } from 'flowbite-react';
import { FaUser } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { SlSizeFullscreen } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const RoomsAndSuites = ({ handlerooms }) => {
  const Navigate = useNavigate();
  const handleClick = (room) => {
    Navigate('/BookingRoom', {
      state: {
        name: room.name,
        Price: room.Price,
        imageUrl: room.imageUrl,
        imageUrl2: room.imageUrl2,
        user: room.user,
        facility: room.facility,
        size: room.size,
        description: room.description,
        amenities: room.amenities,
      },
    });
    handlerooms();
  };
  const rooms = [
    {
      name: 'Classic Double Room',
      Price: '150',
      imageUrl: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/standard-single-room-920x650.jpg',
      imageUrl2: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/comfort-triple-room-920x650.jpg',
      user: '2',
      facility: 'beach',
      size: '30 M',
      description: 'let yourself fully relax in our luxurious favorable accommodations with lots of facilities and high-level service. We do our best to make you always content, smiling and satisfied.',
      amenities: 'Bathroom essentials, Bedroom comforts, Free parking, Hair dryer, Heating, Terrace, Wi-Fi',
    },
    {
      name: 'Comfort Triple Room',
      Price: '250',
      imageUrl: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/comfort-triple-room-920x650.jpg',
      imageUrl2: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/comfort-triple-room2-920x650.jpg',
      user: '3',
      facility: 'beach',
      size: '40 M',
      description: 'let yourself fully relax in our luxurious favorable accommodations with lots of facilities and high-level service. We do our best to make you always content, smiling and satisfied.',
      amenities: ' Bathroom essentials, Bedroom comforts, Free parking, Hair dryer, Heating, Terrace, Wi-Fi',
    },
    {
      name: 'Standard Single Room',
      Price: '100',
      imageUrl: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/standard-single-room2-1536x1095.jpg',
      imageUrl2: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/standard-single-room-920x650.jpg',
      user: '1',
      facility: 'Swiming Pool',
      size: '25 M',
      description: 'standard Single room is available with either double or single beds. Designed in an open-concept living area, it comes with oversized windows and lots of in-room facilities.',
      amenities: 'Bathroom essentials, Bedroom comforts, Free parking, Hair dryer, Heating, Terrace, Wi-Fi',
    },
    {
      name: 'Superior Double Room',
      Price: '200',
      imageUrl: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/superior-double-room2-1536x1094.jpg',
      imageUrl2: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/superior-double-room-920x650.jpg',
      user: '2',
      facility: 'Seaside',
      size: '40 M',
      description: 'Your perfect choice for staying in a big and rush city, where you can come and fully relax after an eventful-rich day. The highest comfort and the perfectly equipped apartments awaits you',
      amenities: 'Bathroom essentials, Bedroom comforts, Free parking, Hair dryer, Heating, Terrace, Wi-Fi',
    },
    {
      name: 'Mountain View Suite',
      Price: '250',
      imageUrl: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/classic-double-room-920x650.jpg',
      imageUrl2: 'https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/standard-single-room-920x650.jpg',
      user: '4',
      facility: 'beach',
      size: '35 M',
      description: 'let yourself fully relax in our luxurious favorable accommodations with lots of facilities and high-level service. We do our best to make you always content, smiling and satisfied.',
      amenities: ' Bathroom essentials, Bedroom comforts, Free parking, Hair dryer, Heating, Terrace, Wi-Fi',
    },
  ];

  return (
    <div className="text-center py-12 px-4 bg-[#FAF7F2]  ">
      <h2 className="text-3xl font-semibold mb-8">Rooms & Suites</h2>
      <div className="flex space-x-8 overflow-x-auto  h-[70vh]  py-4 scroll-smooth">
        {rooms.map((room, index) => (
          <div key={index} className="flex-shrink-0 w-[350px] h-[300px] p-4">
            <Carousel slideInterval={5000}>
              <img src={room.imageUrl} alt={room.name} className="w-full mb-4" />
              <img src={room.imageUrl2} alt={room.name} className="w-full mb-4" />
            </Carousel>
            <button onClick={() => handleClick(room)}>
              <h3 className="text-xl font-medium mb-2 hover:text-[#3F030A]">{room.name}</h3>
            </button>
            <p className="text-gray-600">${room.Price} / Night</p>
            <div className="flex justify-evenly mt-5">
              <div className="flex gap-3">
                <FaUser />
                <p className="text-[#3F030A] text-[12px]">{room.user}</p>
              </div>
              <div className="flex gap-3">
                <FaEye />
                <p className="text-[#3F030A] text-[12px]">{room.facility}</p>
              </div>
              <div className="flex gap-3">
                <SlSizeFullscreen />
                <p className="text-[#3F030A] text-[12px]">{room.size}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsAndSuites;
