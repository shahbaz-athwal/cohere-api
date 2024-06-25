import express, { Request, Response } from 'express';
import { CohereClient } from 'cohere-ai';
import 'dotenv/config'

const cohere = new CohereClient({
    token: process.env.COHERE_API
})

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate', async (req: Request, res: Response) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).send({ error: 'Description is required' });
  }

  try {
    const response = await cohere.generate({
      model: 'command-r-plus',
      prompt: `Generate a creative and unique name for a project based on the following description: ${description}`,
      maxTokens: 300,
      temperature: 0.8,
      k: 0,
      p: 0.75,
      stopSequences: [],
      returnLikelihoods: 'NONE'
    });

    const generatedName = response.generations[0].text;
    res.send({ projectName: generatedName });
  } catch (error) {
    console.error('Error generating project name:', error);
    res.status(500).send({ error: 'Failed to generate project name' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
