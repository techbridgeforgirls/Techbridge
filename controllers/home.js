import express from 'express';
import path from 'path';

export default function(app) {
  app.use(express.static(path.resolve(__dirname, '../public')));
}