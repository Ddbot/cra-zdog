const renderShape = (el,index) => {
    let calculateCoords = index => {
      return [index % cols, parseInt(index / cols)]
    };

    switch(el){
      case 'b':
        return <TransparentBox className="transparentBox" key={index} { ...boxDimensions}  
        /* translate={{
          x: 100 - boxDimensions.x * calculateCoords[0],
          y:100 - boxDimensions.y * calculateCoords[1],
        }} */
        />
      case 't':
        return <Acone className="cone" key={index} { ...aconeDimensions(index) }  
        /* translate={{
          x: 100 - aconeDimensions(index).diameter * calculateCoords[0],
          y: 100 - aconeDimensions(index).diameter * calculateCoords[1],
        }} */
        />
      case 's':
        return <LCylinder className="cylindre" key={index} { ...lcylinderDimensions } 
        /* translate={{
          x: 100 - lcylinderDimensions.x * calculateCoords[0],
          y:100 - lcylinderDimensions.y * calculateCoords[1],
        }} 
        */
        />
      case 'c':
        return <Acone className="cone" key={index} { ...aconeDimensions } 
        /* translate={{
          x: 100 - aconeDimensions(index).x * calculateCoords[0],
          y: aconeDimensions(index).y * calculateCoords[1],
        }} */
        />
      default:
        break;
    }
}

const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());

export { renderShape, isEqual }