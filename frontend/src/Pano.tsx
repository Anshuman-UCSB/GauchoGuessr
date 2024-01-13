import React from 'react';

interface PanoramicProps {
    width: string;
    height: string;
    src: string;
    title: string;
};

function Panoramic(PanoramicProps: PanoramicProps) {
    const link = "https://cdn.pannellum.org/2.5/pannellum.htm#panorama=" + PanoramicProps.src + "&title=" + PanoramicProps.title;
    return(
        //There is an autoLoad that I need to figure out how to use to load the image immediately
        <iframe width={PanoramicProps.width} height={PanoramicProps.height} allowFullScreen  src={link}></iframe>
    );
}

export default Panoramic;
