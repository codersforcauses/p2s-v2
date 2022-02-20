<template>
  <FeathersVuexGet 
    v-slot="{ item: school }"
    service="schools"
    :id="session.school"  
  >
    <div class="d-flex flex-column">
      <div class="text-body-1 text-sm-h6 text-center text-md-h5 primary--text">{{ school ? school.name : 'loading' }}</div>
      <div class="text-center">{{ session.type }} {{ session.location ? ` - ${session.location}` : ''}}</div>
    </div>
  </FeathersVuexGet>
</template>

<script>
export default {
  props: {
    session: Object
  }
}
</script>