import React from 'react';
import Gallery from '@components/Landing/Gallery';

const Home: React.FC = () => {
    return (
        <div className="dark:bg-black bg-white">
            <h1>Home</h1>
            <Gallery />
        </div>
    );
}
export default Home;