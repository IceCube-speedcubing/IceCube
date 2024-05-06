import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body
      const dataFilePath = path.join(process.cwd(), 'data', 'alg-data.json')
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
      res.status(200).json({ message: 'Data saved successfully' })
    } catch (error) {
      console.error('Error saving data to file:', error)
      res.status(500).json({ message: 'Failed to save data to file' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
