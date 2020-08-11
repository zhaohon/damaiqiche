<template>
  <div class="Loading">
    <div id="app">
      <div class="text-wrapper">
        <div class="text part1">
          <div>
            <span class="letter">
              <div class="character">
                  <img src="../assets/logo.png" alt="">
              </div>
              <span></span>
            </span>
          </div>
        </div>
        <div class="how-to">
          <span>正在加载中，请您耐心等待...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: [],
  methods: {},
};
</script>


<style scoped>
#app {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: rgba(249, 249, 249, 0.9);
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
	bottom: 0;
	z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
}

.text-wrapper {
	padding: 0 1rem;
	max-width: 50rem;
	width: 100%;
    text-align: center;
    margin-top: -10%;
}

.text {
	font-size: 8em;
	text-transform: uppercase;
	letter-spacing: -14px;
}

.text .letter {
	position: relative;
	display: inline-block;
	-webkit-transition: all .4s;
	transition: all .4s;
}

.text .letter .character {
	-webkit-transition: color .4s;
	transition: color .4s;
	cursor: pointer;
}

.text .letter span {
	position: absolute;
	bottom: .8rem;
	/* left: .4rem; */
	display: block;
	width: 100%;
	height: 15px;
}

.text .letter span::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 0;
	height: 0;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	border-radius: 50%;
	background: rgba(0, 0, 0, 0.25);
}


.text.part1 .letter:nth-child(1).poofed {
	-webkit-transform-origin: 50% 50%;
	transform-origin: 50% 50%;
	-webkit-animation: poofing1 1.4s ease-in-out infinite alternate;
	animation: poofing1 1.4s ease-in-out infinite alternate;
}


@keyframes poofing1 {
	0% {
		-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
		transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);
	}
	50% {
		-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
		transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);
	}
	56% {
		-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);
		transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);
	}
	100% {
		-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);
		transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);
	}
}

.text.part1 .letter:nth-child(1) .character {
	animation: wave 1.2s linear infinite;
	animation-delay: 0.33333s;
}

.text.part1 .letter:nth-child(1) span::before {
	animation: shadow 1.2s linear infinite;
	animation-delay: 0.3s;
}



@keyframes wave {
	0% {
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}
	50% {
		-webkit-transform: translateY(-10px);
		transform: translateY(-10px);
	}
	100% {
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}
}



@keyframes shadow {
	0% {
		width: 0;
		height: 0;
	}
	50% {
		width: 100%;
		height: 100%;
	}
	100% {
		width: 0;
		height: 0;
	}
}

.how-to {
	margin: 2rem 0 2rem 1rem;
	font-family: "Opens Sans", sans-serif;
	font-weight: 300;
	font-size: .85em;
	letter-spacing: 4px;
	color: rgba(0, 0, 0, 0.8);
}
</style>
