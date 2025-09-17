import path from 'path';
import fs from 'fs';

export function getPath() {
  return path.join(process.cwd(), 'src', 'data', 'dummy-data.json');
}

export function getFileData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedback = req.body.feedback; 

    const feedbackData = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    const filePath = getPath();
    const data = getFileData(filePath);

    data.push(feedbackData);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: feedbackData });

  } else if (req.method === 'GET') {

    const filePath = getPath();
    const fileData = getFileData(filePath);

    res.status(200).json({ message: 'Success!', feedback: fileData });

  }
}
