import react from 'react';
import Learn from './Learnmore';
import { useState, useEffect } from 'react';
const Services = () => {
  const [screen, setScreen] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setScreen(window.innerWidth < 768);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="h-[120vh] md:h-[70vh]  lg:h-[90vh] bg-[#3F030A] flex flex-col md:flex-row  w-full justify-center items-center">
      {screen ? (
        <>
          <div className="mt-[70px] md:ml-[50px] md:mr-[50px] md:mt-0">
            <img src="https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/home-2.png" className="w-[350px] md:w-[450px] lg:w-[450px]" />
          </div>
          <div className="mt-[45px] w-[350px] lg:w-[500px] md:ml-[50px] md:w-[400px] md:mr-[50px]">
            <p className="text-white font-bold mt-[50px] md:text-[30px]">SERVICES</p>
            <p className="text-white mt-[20px] text-[20px] mb-[50px] md:text-[24px]">
              The rooms are arranged on the first, second and third floors. On the top floor, there is also a charming terrace or solarium available for the use of guests, from where you can enjoy the view.
            </p>
            <Learn />
          </div>
        </>
      ) : (
        <>
          <div className="mt-[45px] w-[350px] lg:w-[500px] md:ml-[50px] md:w-[400px] md:mr-[50px]">
            <p className="text-white font-bold mt-[50px] md:text-[30px]">SERVICES</p>
            <p className="text-white mt-[20px] text-[20px] mb-[50px] md:text-[24px]">
              The rooms are arranged on the first, second and third floors. On the top floor, there is also a charming terrace or solarium available for the use of guests, from where you can enjoy the view.
            </p>
            <Learn />
          </div>
          <div className="mt-[70px] md:ml-[50px] md:mr-[50px] md:mt-0">
            <img src="https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/home-2.png" className="w-[350px] md:w-[450px] lg:w-[450px]" />
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
