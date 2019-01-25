const numPerCol = 4;
const spacingX = 20;
const spacingY = 50;

const getNewPosition = (originX, originY, width, height, count) => {
  const unitX = width + spacingX;
  const unitY = height + spacingY;
  const col = count % numPerCol;
  const row = Math.floor(count / numPerCol);
  const x = originX + unitX * col;
  const y = originY + unitY * row;
  return { x, y };
}



export { getNewPosition };
