import React from 'react';

interface PanoramicProps {
    width: string;
    height: string;
    src: string;
    title: string;
};

function Panoramic(PanoramicProps: PanoramicProps) {
    const link = "https://cdn.pannellum.org/2.5/pannellum.htm#panorama=" + PanoramicProps.src + "&title=" + PanoramicProps.title +"&autoLoad=true";
    return(
        <iframe width={PanoramicProps.width} height={PanoramicProps.height} allowFullScreen  src={link} title={PanoramicProps.title}></iframe>
    );
}

export default Panoramic;
