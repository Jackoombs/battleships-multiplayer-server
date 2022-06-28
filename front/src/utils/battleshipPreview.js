const battleshipPreview = (tileIndex, length, orientation) => {
  const halfLength = Math.round((length - 1) / 2)
  const initArray = []

  if (orientation) {
    const previewTile = tileIndex.toString().padStart(2, '0')
    const initArrayTileHor = tileIndex-halfLength

    for (let i=0; i<length; i++) initArray.push(initArrayTileHor + i)
    const paddedArray = initArray.map(n => n.toString().padStart(2, '0'))

    paddedArray.forEach((element, index) => {
      if (element > 99) {
        paddedArray.splice(index, 1)
        paddedArray.unshift(paddedArray[0] - 1)
        return
      }
      if (element[0] > previewTile[0]) {
        paddedArray.splice(index, 1)
        paddedArray.unshift(paddedArray[0] - 1)
      }
      if (element[0] < previewTile[0]) {
        paddedArray[index] = 'deleted'
        paddedArray.push(+paddedArray[paddedArray.length-1] + 1)
      }
    });

    return paddedArray.filter(a => a !== 'deleted').map(Number)
  }

  if (!orientation) { 
    const initArrayTileVer = tileIndex-halfLength*10

    for (let i=0; i<length; i++) initArray.push(initArrayTileVer + i*10)
    
    initArray.forEach((element, index) => {
      if (element < 0) {
        initArray.push(initArray[initArray.length-1] + 10)
        initArray[index] = 'deleted'
      }
      if (element > 99) {
        initArray.splice(index, 1)
        initArray.unshift(initArray[0] - 10)
      }
    });
    return initArray.sort((a, b) => a - b).filter(a => a !== 'deleted')
  }
}

export default battleshipPreview