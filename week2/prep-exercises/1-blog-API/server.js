const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = 3000;

app.get('/', function (req, res) {
  res.send('Welcome to the Blog');
});

//1.create a new Blog post
app.post('/blogs', (req, res) => {
    const { title, content } = req.body; // Extract title and content from the request body

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const filePath = path.join(__dirname, `${title}.txt`);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create the blog post' });
    }
    res.status(201).send('Blog post created');
  })
})

//2.Read a blog post
app.get('/blogs/:title', (req, res) => {
    const { title } = req.params;
    const filePath = path.join(__dirname, `${title}.txt`);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      res.send(content);
    } else {
      res.status(404).send('Blog post not found');
    }
});

//3.Update a blog post
app.put('/blogs/:title', (req, res) => {
  const { title } = req.params;
  const { content } = req.body;
  const filePath = path.join(__dirname, `${title}.txt`);

  if (!content) {
    return res.status(400).json({ error: 'Content is required to update' });
  }

  if (fs.existsSync(filePath)) {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update the blog post' });
      }
      res.send('Blog post updated');
    });
  } else {
    res.status(404).send('Blog post not found');
  }
});

//4.Delete a blog post
app.delete('/blogs/:title', (req, res) => {
  const { title } = req.params;
  const filePath = path.join(__dirname, `${title}.txt`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.send('Blog post deleted');
  } else {
    res.status(404).send('Blog post not found');
  }
});

//5.Read all blog posts
app.get('/blogs', (req, res) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read blog posts' });
    }

    const blogTitles = files
      .filter((file) => file.endsWith('.txt'))
      .map((file) => file.replace('.txt', ''));

    res.json(blogTitles);

  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});