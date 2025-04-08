import react from 'react';
const About = () => {
  return (
    <div className="h-[120vh] md:h-[70vh] bg-[#3F030A] flex flex-col md:flex-row  w-full justify-center items-center">
      <div className="mt-[70px] md:ml-[50px] lg:mr-[200px] md:mr-[50px] md:mt-0 lg:mt-[90px] ">
        <img src="https://themes.getmotopress.com/albatross/wp-content/uploads/sites/37/2020/11/home-1.png" className="w-[350px] md:w-[400px] lg:w-[450px]" />
      </div>
      <div className="mt-[45px] w-[350px] lg:w-[500px] md:-[400px] md:mr-[50px] lg:mt-[90px] ">
        <p className="text-white text-[24px] md:text-[40px] md:mb-[50px] lg:text-[30px] ">Is the right choice for all — who are searching the best place for relax</p>
        <p className="text-white font-bold mt-[50px] md:text-[30px]">ABOUT US</p>
        <p className="text-white mt-[20px] text-[20px] mb-[50px] md:text-[24px]">The Hotel Spice is the right choice for visitors who are searching for a combination of charm and a convenient position from where to explore surroundings.</p>
      </div>
    </div>
  );
};

export default About;
