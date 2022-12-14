import * as React from 'react';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;


const pinStyleRed = {
  cursor: 'pointer',
  fill: '	#FF0000',
  // fill para los colores
  // Blue #0000FF, Black	#000000, Green 	#00FF00, Red 	#FF0000
  // Referencia de colores https://www.rapidtables.com/web/color/green-color.html
  stroke: 'none'
};

const pinStyleYellow = {
  cursor: 'pointer',
  fill: '	#FFFF00',
  // fill para los colores
  // Blue #0000FF, Black	#000000, Green 	#00FF00, Red 	#FF0000
  // Referencia de colores https://www.rapidtables.com/web/color/green-color.html
  stroke: 'none'
};
const pinStyleBlue = {
  cursor: 'pointer',
  fill: '	#0000FF',
  // fill para los colores
  // Blue #0000FF, Black	#000000, Green 	#00FF00, Red 	#FF0000
  // Referencia de colores https://www.rapidtables.com/web/color/green-color.html
  stroke: 'none'
};
const pinStyleBlack = {
  cursor: 'pointer',
  fill: '	#000000',
  // fill para los colores
  // Blue #0000FF, Black	#000000, Green 	#00FF00, Red 	#FF0000
  // Referencia de colores https://www.rapidtables.com/web/color/green-color.html
  stroke: 'none'
};
const pinStyleGreen = {
  cursor: 'pointer',
  fill: '	#00FF00',
  // fill para los colores
  // Blue #0000FF, Black	#000000, Green 	#00FF00, Red 	#FF0000
  // Referencia de colores https://www.rapidtables.com/web/color/green-color.html
  stroke: 'none'
};
function Pin({size = 30,status}) {
console.log(status)
  return (
    <>
    {status===10111?(
       <svg height={size} viewBox="0 0 30 30" style={pinStyleBlue}>
       <path d={ICON} />
     </svg>
    ):(
      status===11011?( <svg height={size} viewBox="0 0 30 30" style={pinStyleBlack}>
      <path d={ICON} />
    </svg>
   ):(
    status===11101?( <svg height={size} viewBox="0 0 30 30" style={pinStyleRed}>
      <path d={ICON} />
    </svg>):(
      status===11101?( <svg height={size} viewBox="0 0 30 30" style={pinStyleYellow}>
      <path d={ICON} />
    </svg>
    ):(
      status===11110?( <svg height={size} viewBox="0 0 30 30" style={pinStyleYellow}>
      <path d={ICON} />
    </svg>):(
      <svg height={size} viewBox="0 0 30 30" style={pinStyleGreen}>
      <path d={ICON} />
    </svg>
    ))
    
   )))}
    </>
    
  );
}

export default React.memo(Pin);