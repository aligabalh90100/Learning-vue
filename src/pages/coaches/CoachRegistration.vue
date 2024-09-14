<template>
  <section>
    <base-card>
      <h2>Register as a Coach now</h2>
      <coach-from @save-data="saveData"></coach-from>
    </base-card>
  </section>
</template>
<script>
import CoachFrom from '../../components/coach/CoachFrom.vue';
export default {
  components: {
    CoachFrom,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      // this.$router.push('/');
      // like push but the different you can back to they page you come from
      this.$router.replace('/');
    },
  },
};
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
