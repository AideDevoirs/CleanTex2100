import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../lib/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { rating, author, message } = req.body;
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ rating, author, message }])
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data); // <-- return ajouté
  }
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('date', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data); // <-- return ajouté
  }
  return res.status(405).end(); // <-- return ajouté
}
