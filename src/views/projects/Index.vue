<template>
  <b-container fluid>
  	<b-row>
  		<b-col md="4" sm="12" v-for="index in 4" :key="index">
  			<b-card
		    title="Card Title"
		    img-src="https://picsum.photos/600/300/?image=25"
		    img-alt="Image"
		    img-top
		    tag="article"
		    style="max-width: 20rem;"
		    class="mb-2"
		  	>
		    <b-card-text>
		      Some quick example text to build on the card title and make up the bulk of the card's content.
		    </b-card-text>

		    <b-button href="#" variant="primary">Go somewhere</b-button>
		  </b-card>
  		</b-col>
  	</b-row>
  </b-container>
</template>

<script>
	import ProjectServices from '@/api-services/project_services.js';

	export default
	{
		name:'ProjectList',
		data:()=>
		{
			return{
				projects:[],
				form:{
					name:null,
					description:null,
					date_start:null,
					creator_id:null,
					date_end:null
				}
			}
		},
		methods:{
			async getProjects()
			{
				await ProjectServices.index(1).then((response)=>{
					console.log(response);
				}).catch((error)=>{	
					console.log(error);
				});
			}
		},
		mounted:function(){
			this.getProjects();
		}
	}
</script>
