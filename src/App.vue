<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <h1>Blockchain Voting System</h1>
    </header>
    <main>
      <div class="button-group">
        <!-- <button @click="toggleVoteButtons" :disabled="hasVotedAny">Choose Vote</button> -->
        <button @click="toggleVoteButtons">Choose Vote</button>
        <button @click="showResultPage">View Result</button>
      </div>
      <div v-if="showVoteButtons" class="vote-buttons">
        <!-- <button @click="showVoteForm('project')" :disabled="hasVoted['project']">Project Vote</button> 
        <button @click="showVoteForm('people')" :disabled="hasVoted['people']">People Vote</button>
        <button @click="showVoteForm('product')" :disabled="hasVoted['people']">Product Vote</button> -->
        <button @click="showVoteForm('project')">Project Vote</button>
        <button @click="showVoteForm('people')">People Vote</button>
        <button @click="showVoteForm('product')">Product Vote</button>
      </div>
      <div class="vote-form-container">
        <router-view v-if="isVoteFormVisible" @vote-submitted="onVoteSubmitted"></router-view>
        <result-page v-if="isResultPageVisible"></result-page>
      </div>
    </main>
  </div>
</template>

<script>
import ResultPage from './components/ResultPage.vue';

export default {
  components: {
    ResultPage
  },
  data() {
    return {
      showVoteButtons: false, // 投票类型 显示
      isVoteFormVisible: false, //  结果表单 显示
      isResultPageVisible: false, // 结果页面 显示
      hasVoted: {
        project: false,
        people: false,
        product: false
      },
      votedResult: {
        project: null,
        people: null,
        product: null
      }
    };
  },
  computed: {
    hasVotedAny() {
      return this.hasVoted.project || this.hasVoted.people || this.hasVoted.product;
    }
  },
  methods: {
    toggleVoteButtons() {
      //this.showVoteButtons = true;
      this.showVoteButtons = !this.showVoteButtons;
      this.isVoteFormVisible = false;
      this.isResultPageVisible = false;
    },
    showVoteForm(voteType) {  // 显示特定投票类型的表单
      this.$router.push({ name: 'vote', params: { type: voteType } });  // 'project'....
      this.isVoteFormVisible = true;
      this.isResultPageVisible = false;
    },
    showResultPage() {  // 显示结果页面
      this.isResultPageVisible = true;
      this.isVoteFormVisible = false;
    },
    onVoteSubmitted(result) { // 处理投票提交
      this.hasVoted[result.voteType] = true;
      this.votedResult[result.voteType] = result;
    }
  }
};
</script>






<style>
header {
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
}

h1 {
  margin: 0;
}

.button-group {
  margin-top: 20px;
  text-align: center;
}

.vote-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.vote-buttons button {
  margin: 0 10px;
}

.vote-form-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>