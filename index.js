import express from 'express';
import bodyParser from 'body-parser';
import { tiktokDL } from './src/tiktokDL.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/url', async (req, res) => {
    let { videoUrl } = req.body;
    
    try {
        // get url video
        let { nowm, wm, music } = await tiktokDL(videoUrl);
        res.send(JSON.stringify({ nowm, wm, music }));
    } catch (error) {
        console.error('Error:', error.message);
        // Handle the error, e.g., send an error response to the client
        res.status(500).send(JSON.stringify({ error: 'An error occurred while fetching TikTok data' }));
    }
});

app.listen(port, () => {
    console.log(`Server activated - http://localhost:${port}`);
    console.log(`${process.env.RAILWAY_STATIC_URL}`);
    console.log(`Server activated - port: ${port}`);
});
