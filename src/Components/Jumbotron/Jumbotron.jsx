import { Link } from 'react-router-dom';
const Jumbotron = () => {
  return (
    <div>
      <section className="h-screen bg-center bg-no-repeat bg-[url('https://wallpaperaccess.com/full/2690784.jpg')] bg-gray-400 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 lg:px-48">welcome To</p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">My Hotels</h1>
          <button
            type="button"
            onClick={() => {
              const element = document.getElementById('rooms');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg w-[200px] text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Jumbotron;
