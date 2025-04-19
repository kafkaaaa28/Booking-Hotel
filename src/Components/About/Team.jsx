import react, { useState, useEffect } from 'react';
import wesley from './wesley.jpg';
import giri from './giri.jpg';
import tiara from './tiara.jpg';
import william from './william.jpg';
import Loading from './Loading';
const Team = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  const teams = [
    { nama: 'Wesley Jonathan Thomas', npm: '152024095', jpg: wesley },
    { nama: 'William Jonathan Bena', npm: '152024097', jpg: william },
    { nama: 'Giri Aryono Putro', npm: '152024091', jpg: giri },
    { nama: 'Tiara Destiarani', npm: ' 152024135', jpg: tiara },
  ];
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {teams.map((team, index) => (
          <div key={index} className="bg-white shadow-lg mt-[20px] mb-[20px] w-[300px] h-[400px] rounded-lg">
            <img className="w-[300px] h-[350px]" src={team.jpg} alt={team.nama} />
            <h1 className="text-center text-[16px]">{team.nama}</h1>
            <h1 className="text-center text-[16px]">{team.npm}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
