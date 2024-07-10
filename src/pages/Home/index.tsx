import React from 'react';
import Gallery from '@components/Landing/Gallery';
import Menus from '@components/Landing/Menus';

const Home: React.FC = () => {
    return (
        <div className="dark:bg-black bg-white">
            <h1>Home</h1>
            <Menus />
            <Gallery />
            
        </div>
    );
}
export default Home;