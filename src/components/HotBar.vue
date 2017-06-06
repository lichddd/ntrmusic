<template>
	<div class="hotbar">
    <div class="hotbarT" :style="{width:(len*100+'%')}"></div>
  </div>
</template>

<script>
	export default {
		name: 'hotbar',
		props: ['len'],
		components: {
		},
		data() {
			return {
			}
		},
		created: function() {



		},
		methods: {

			},

	}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hotbar
{
  position: relative;
  border-radius: 5px;
  height: 10px;
  overflow: hidden;
  background-color: #d9d9d9;
}
.hotbarT
{
  height: 100%;
  position: absolute;
  background-color: #4fc08d;
  border-radius: 5px;
}
</style>
