<!-- VotePage.vue -->
<template>
  <div class="vote-page">
    <div v-if="selectedVoteType"> <!-- 选了类型才能投 selectedCampaignName-->
      <h2>请为你喜欢的{{ voteTypeMap[selectedVoteType] }}投票</h2>
      <div class="vote-form">
        <select v-model="selectedOption" :disabled="hasVoted[selectedVoteType]" class="vote-select">
          <option value="" disabled>请选择</option>
         <option v-for="option in options" :key="option.id" :value="option.id">
            {{ option.name }} 
          </option> 
        </select>
        <button @click="submitVote" :disabled="hasVoted[selectedVoteType]" class="vote-button">Vote</button>
      </div>
      <p v-if="hasVoted[selectedVoteType]">您已为 {{ voteTypeMap[selectedVoteType] }} 投票,选项为:{{ selectedOptionName[selectedVoteType] }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedVoteType: '', // 当前选择的投票类型
      selectedVoteID: '', // 当前选择的投票类型的ID
      selectedOption: '', // 用户选定的投票选项
      selectedOptionName: { // 存储每种投票类型的选项名称
        project: '',
        people: '',
        product: ''
      },
      hasVoted: { // 标记用户是否已经投票
        project: false,
        people: false,
        product: false
      },
      voteTypeMap: {  // 投票类型的映射表，用于界面显示
        project: 'Project',
        people: 'People',
        product: 'Product'
      },
      voteIDMap: {  // 投票类型的映射表，ID
        project: 1,
        people: 2,
        product: 3
      },
      options: []
      //{ id: 1, name: 'Project 1', votes: 0 },
      //{ id: 2, name: 'Project 2', votes: 0 },
      //{ id: 3, name: 'Project 3', votes: 0 }
    };
  },
  computed: {
    votedResult() { // 从根实例中获取已投票的结果
      return this.$root.votedResult[this.selectedVoteType];
    }
  },
  watch: {
    '$route.params.type': {
      immediate: true,
      handler(newType) {
        this.selectedVoteType = newType;
        this.fetchOptions();
        this.loadVotedResult();
      }
    }
  },
  methods: {
    fetchOptions() {  // 从后端API获取选项
      axios.get(`http://localhost:3000/api/options/${this.selectedVoteType}`)
        .then(response => {
          this.options = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadVotedResult() { // 加载用户的投票结果
      if (this.votedResult) {
        //  已经投了
        this.hasVoted[this.selectedVoteType] = true;
        this.selectedOption = this.votedResult.selectedOption;
        this.selectedOptionName[this.selectedVoteType] = this.votedResult.selectedOptionName;
      } else {
        // 没投
        this.hasVoted[this.selectedVoteType] = false;
        this.selectedOption = '';
        this.selectedOptionName[this.selectedVoteType] = '';
      }
    },
    submitVote() {
      if (!this.selectedOption) {
        alert("请选择一个选项");
        return;
      }
      axios.post(`http://localhost:3000/api/vote/${this.selectedVoteType}`, { selectedOption: this.selectedOption })
        .then(() => { //成功投票后
          this.hasVoted[this.selectedVoteType] = true;  //  表明用户已经在该类别投票，用于禁用再次投票。
          this.selectedOptionName[this.selectedVoteType] = this.options.find(option => option.id === this.selectedOption).name;
          this.selectedVoteID = this.voteIDMap[this.selectedVoteType];
          const result = {
            voteType: this.selectedVoteType,  // 类型 e.g. prduct
            selectedVoteID: this.selectedVoteID,  // ID e.g. 3
            selectedOption: this.selectedOption,  //  选项ID e.g. 1
            selectedOptionName: this.selectedOptionName[this.selectedVoteType]  //选项Name  e.g. Apple  
          };
          console.log(result);
          this.$emit('vote-submitted', result);
        })
        .catch(error => {
          console.error(error);
        });

    }
  }
};
</script>





<style scoped>
.vote-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.vote-select {
  margin-bottom: 10px;
  width: 200px;
  padding: 8px;
  font-size: 16px;
}

.vote-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.vote-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

select:disabled {
  background-color: #f0f0f0;
}
</style>