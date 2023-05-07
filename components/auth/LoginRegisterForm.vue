<template>
	<div class="form-container">
		<div class="w-48 py-4 text-center font-bold text-lg text-slate-900"><NuxtLink to="/">↶ Back To Home</NuxtLink></div>
  	<div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true">
			<div class="signup">
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="email" name="email" v-model="signupform.email" placeholder="Email" required>
					<input type="password" name="pswd" v-model="signupform.password" placeholder="Password" required>
					<p class="font-bold text-center text-violet-500">{{ error || '' }}</p>
					<button @click="$emit('signup')">Sign up</button>
			</div>

			<div class="login">
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" v-model="loginform.email" placeholder="Email" required>
					<input type="password" name="pswd" v-model="loginform.password" placeholder="Password" required>
					<p class="font-bold text-center text-violet-500">{{ error || '' }}</p>
					<button @click="$emit('login')">Login</button>
			</div>
		</div>
		<AppFooter />
	</div>
</template>

<script setup>
	const props = defineProps({
		signupform: {
			type: Object
		},
		loginform: {
			type: Object
		},
		error: {
			type: String
		}
	})

</script>


<style scoped>

.form-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: rgb(97,97,97);
	background: linear-gradient(90deg, rgba(97,97,97,1) 0%, rgba(67,173,237,1) 35%, rgba(227,231,122,1) 100%);
}
.main{
	width: 350px;
	height: 500px;
	overflow: hidden;
	background: #1e293b;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
	margin-left: auto;
	margin-right: auto;
}
#chk{
	display: none;
}
.signup{
	position: relative;
	width:100%;
	height: 100%;
}
label{
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 60px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
input{
	width: 60%;
	height: 20px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 20px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #1e293b;
	background: #fbda03;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: #fee569;
}
.login{
	height: 460px;
	background: #eee;
	border-radius: 60% / 10%;
	transform: translateY(-180px);
	transition: .8s ease-in-out;
}
.login label{
	color: #1e293b;
	transform: scale(.6);
}

#chk:checked ~ .login{
	transform: translateY(-500px);
}
#chk:checked ~ .login label{
	transform: scale(1);	
}
#chk:checked ~ .signup label{
	transform: scale(.6);
}

</style>