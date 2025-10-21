<template>
  <div class="room-card glass">
    <div class="thumbnail" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
    <div class="body">
      <h3>{{ room.name }}</h3>
      <p>{{ room.description || 'Comfortable room with essential amenities.' }}</p>
      <div class="meta">
        <div class="badge">{{ room.capacity }} pax</div>
        <div style="display:flex;gap:0.6rem;align-items:center">
          <div class="price">₱{{ room.price_per_night }}</div>
          <router-link :to="`/rooms/${room.id}`" class="bookClass"><button >Book</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { room: { type: Object, required: true } },
  computed:{
    imageUrl(){ return `https://picsum.photos/seed/room${this.room.id}/800/450` }
  }
}
</script>
