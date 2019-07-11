const newsCtrl = require('../controllers/news');

exports.getNews = async (req, res) => {
  try {
    const result = await newsCtrl.getAll();

    res.json(result);
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.newNews = async (req, res) => {
  try {
    const result = await newsCtrl.add({ ...req.body });

    res.json(result);
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.updateNews = async (req, res) => {
  try {
    const result = await newsCtrl.edit(req.params.id, { ...req.body });
    res.json(result);
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await newsCtrl.delete(req.params.id);
    res.json({
      message: 'News deleted'
    });
  } catch (error) {
    res.errorHandler(error);
  }
};
