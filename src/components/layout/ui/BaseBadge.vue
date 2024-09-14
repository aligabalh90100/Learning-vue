<template>
  <span class="badge" :class="type">
    <slot></slot>
  </span>
</template>
<script>
export default {
  props: {
    // title: { type: String, required: true },
    type: { type: String, required: true },
  },
};
</script>
<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  text-transform: uppercase;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
