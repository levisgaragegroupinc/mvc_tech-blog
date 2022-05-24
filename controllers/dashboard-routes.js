// these routes will render a specific handle bars page
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");
