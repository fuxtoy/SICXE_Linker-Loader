export function getNameWithoutSpace(originalname) {
  const list = originalname.split(" ");
  return list[0];
}
