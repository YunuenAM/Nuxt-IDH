<template>
	<div
		class="tooltip-container"
		@mouseenter="show = true"
		@mouseleave="show = false"
	>
		<span class="tooltip-icon">❓</span>
		<div
			v-if="show"
			class="tooltip-box"
		>
			<p>{{ message }}</p>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

// Props
defineProps({
	message: {
		type: String,
		required: true,
	},
});

const show = ref(false);
</script>

<style scoped>
.tooltip-container {
	position: relative;
	display: inline-block;
	cursor: pointer;
}

.tooltip-icon {
	color: #1e90ff;
	font-size: 1rem;
}

.tooltip-box {
	position: absolute;
	top: 120%;
	left: 50%;
	transform: translateX(-50%);
	background: linear-gradient(180deg, #0a254a, #112);
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 8px;
	font-size: 0.9rem;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	white-space: nowrap;
	z-index: 10;
	text-align: center;
}
</style>
