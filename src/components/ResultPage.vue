<!-- ResultPage.vue -->
<template>
  <div class="result-page"> 
    <h2 class="result-title">投票结果</h2>
    <div class="result-container">
       <!-- 遍历 votedResults 对象，每种投票类型创建一个结果展示区域 -->
      <div v-for="(result, voteType) in votedResults" :key="voteType" class="result-section">
        <h3 class="campaign-name">{{ getCampaignName(voteType) }} Result</h3>
        <table class="result-table">
          <thead>
            <tr>
              <th>Option Name</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(option, index) in result.options" :key="index">
              <td>{{ option.name }}</td>
              <td>{{ option.votes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      votedResults: {
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
      }
    };
  },
  methods: {
    getCampaignName(voteType) {
      switch (voteType) {
        case 'project':
          return 'Project Vote';
        case 'people':
          return 'People Vote';
        case 'product':
          return 'Product Vote';
        default:
          return '';
      }
    },
    updateVotedResults(apiresults) {
      for (const voteType in this.votedResults) {
        if (apiresults[voteType]) {
          this.votedResults[voteType].options = apiresults[voteType].options;
        }
      }
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/result')
      .then(response => {
        this.updateVotedResults(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>




<style scoped>
.result-page {
  text-align: center;
}

.result-title {
  margin-bottom: 30px;
}

.result-container {
  display: flex;
  justify-content: space-around;
}

.result-section {
  width: 30%;
}

.campaign-name {
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.campaign-name::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background-color: #ccc;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f0f0f0;
}

td {
  border-bottom: 1px solid #ddd;
}

th:first-child,
td:first-child {
  text-align: left;
  padding-right: 20px;
}
</style>