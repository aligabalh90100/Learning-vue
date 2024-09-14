<template>
  <base-dialog :show="!!error" title="An error occurred" @close="clearError"
    ><p>{{ error }}</p></base-dialog
  >
  <section>
    <base-card>
      <header>
        <h2>Request Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="!isLoading && hasRequests">
        <request-item
          v-for="request in receivedRequests"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any request yet!</h3>
    </base-card>
  </section>
</template>
<script>
import BaseSpinner from '../../components/layout/ui/BaseSpinner.vue';
import RequestItem from '../../components/request/RequestItem.vue';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RequestItem,
    BaseSpinner,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/allRequests'];
    },
    hasRequests() {
      return this.receivedRequests.length;
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequest');
      } catch (e) {
        // console.log(e);
        this.error =
          e.message || 'Failed to load requests. Please try again later.';
      }
      this.isLoading = false;
    },
    clearError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
