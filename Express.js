const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// 模拟数据库
const db = {
  project: {
    options: [
      { id: 1, name: 'Project 1', votes: 0 },
      { id: 2, name: 'Project 2', votes: 0 },
      { id: 3, name: 'Project 3', votes: 0 }
    ]
  },
  people: {
    options: [
      { id: 1, name: 'Alice', votes: 0 },
      { id: 2, name: 'Bob', votes: 0 },
      { id: 3, name: 'Charlie', votes: 0 }
    ]
  },
  product: {
    options: [
      { id: 1, name: 'Apple', votes: 0 },
      { id: 2, name: 'Banana', votes: 0 },
      { id: 3, name: 'Orange', votes: 0 }
    ]
  }
};

// 获取选项列表
app.get('/api/options/:voteType', (req, res) => {
  const voteType = req.params.voteType;
  const options = db[voteType].options;
  res.json(options);
  console.log(options);
});

// 提交投票
app.post('/api/vote/:voteType', (req, res) => {
  const voteType = req.params.voteType;
  const selectedOption = parseInt(req.body.selectedOption);
  const option = db[voteType].options.find(opt => opt.id === selectedOption);
  if (option) {
    option.votes++;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// 获取投票结果
app.get('/api/result', (req, res) => {
  res.json(db);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});