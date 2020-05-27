<template>
 <b-col>
 	<div class="header">
 		<h2>My Dashboard Projects</h2>
 		<hr>
 	</div>
 	<ProjectList/>
 </b-col>
</template>

<script>
import ProjectList from './projects/Index';

export default {
  name: "Dashboard",
  components:{
  	ProjectList
  }
};
</script>

<style scoped>
	.header
	{
		padding-bottom:20px;
		padding-top:20px;
	}
</style>
