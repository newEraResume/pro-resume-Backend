
const defaultController = async (req, res) => {
  try {
    res.json({ message:"Hello" , test:"new" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { defaultController };
