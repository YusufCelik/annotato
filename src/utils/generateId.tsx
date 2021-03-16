const generateId = () => {
  return Date.now().toString() + Math.floor(Math.random() * 100);
};

export default generateId;
