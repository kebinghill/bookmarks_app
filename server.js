const express = require('express');
const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const db = new Sequelize('postgres://localhost/bookmarks');

const Bookmark = db.define('Bookmark', {
  name: {
    type: STRING,
  },
  url: {
    type: STRING,
    validate: {
      isUrl: true,
    },
  },
  category: {
    type: STRING,
  },
});

const syncAndSeed = async () => {
  await db.sync({ force: true });
};

const init = async () => {
  try {
    await db.authenticate();
    await syncAndSeed();
  } catch (error) {
    console.log(error);
  }
};
