<template>
  <base-dialog title="An error occurred!" :show="!!error" @close="clearError">
    <!-- this go to the default slot -->
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)"
          >Refresh</base-button
        >
        <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
          >Login to register as a coach</base-button
        >
        <base-button
          link
          to="/register"
          v-if="isLoggedIn && !isCoach && !isLoading"
          >Register as Coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :areas="coach.areas"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
        ></coach-item>
      </ul>
      <h3 v-else>No Coaches Found</h3>
    </base-card>
  </section>
</template>
<script>
import CoachItem from '../../components/coach/CoachItem.vue';
import CoachFilter from '../../components/coach/CoachFilter.vue';
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      filters: { frontend: true, backend: true, career: true },
      error: null,
    };
  },
  computed: {
    filteredCoaches() {
      const allCoaches = this.$store.getters['coaches/coaches'];
      return allCoaches.filter((coach) => {
        if (this.filters.frontend && coach.areas.includes('frontend')) {
          return true;
        } else if (this.filters.backend && coach.areas.includes('backend')) {
          return true;
        } else if (this.filters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.filters = updatedFilters;
    },
    clearError() {
      this.error = null;
    },
    async loadCoaches(update = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceUpdate: update,
        });
      } catch (e) {
        this.error = e.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
