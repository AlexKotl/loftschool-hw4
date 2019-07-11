const New = require('../models/new');

exports.getAll = () => new Promise(async (resolve, reject) => {
  try {
    const result = await New.find();
    resolve(result);
  } catch (error) {
    reject(error);
  }
});

exports.delete = (id) => new Promise(async (resolve, reject) => {
  try {
    await New.findByIdAndRemove(id);

    resolve(true);
  } catch (error) {
    reject(error);
  }
});

exports.add = ({ text, theme }) => new Promise(async (resolve, reject) => {
  try {

    const newNews = new New({
      text,
      theme,
      date: ''
    });

    const result = await newNews.save();

    resolve(result);
  } catch (error) {
    reject(error);
  }
});

exports.edit = (id, { text, theme }) => new Promise(async (resolve, reject) => {
  try {

    const news = await New.findById(id);

    if (!news) {
      reject(new Error('No such news found'));
    }

    news.set({
      text,
      theme
    });
    const result = await news.save();

    resolve(result);
  } catch (error) {
    reject(error);
  }
});
