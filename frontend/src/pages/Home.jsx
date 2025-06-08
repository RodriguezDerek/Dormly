import React from 'react';
import HomeContent from '../components/HomeContent.jsx';
import HomeCard from '../components/HomeCard.jsx';

function Home() {
  return (
    <>
      <HomeContent />
      <div className='flex justify-center items-center pb-30 custom-bg-color'>
        <HomeCard />
      </div>
    </>
  );
} export default Home;