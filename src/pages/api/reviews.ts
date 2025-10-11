import fs from 'fs';
import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

const reviewsFile = path.join(process.cwd(), 'public/assets/reviews.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { rating, author, message } = req.body;
    const newReview = {
      id: Date.now().toString(),
      rating,
      author,
      message,
      date: new Date().toISOString(),
    };
    let reviews = [];
    try {
      reviews = JSON.parse(fs.readFileSync(reviewsFile, 'utf-8'));
    } catch {
      reviews = [];
    }
    reviews.push(newReview);
    fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));
    res.status(201).json(newReview);
  } else if (req.method === 'GET') {
    try {
      const reviews = JSON.parse(fs.readFileSync(reviewsFile, 'utf-8'));
      res.status(200).json(reviews);
    } catch {
      res.status(200).json([]);
    }
  } else {
    res.status(405).end();
  }
}
