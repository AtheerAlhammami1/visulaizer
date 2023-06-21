<script></script>
<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark m-auto p-0"
    style="border-bottom: 1px solid rgb(99, 97, 97); border-radius: 12px"
  >
    <div class="collapse navbar-collapse" id="navbarNav">
      <h4 class="navbar-text m-0 text-light px-4">Visualizer</h4>
    </div>
    <a class="navbar-brand" href="#">
      <div class="box">
        <div class="inner">
          <span>Visualizer</span>
        </div>
        <div class="inner">
          <span>Visualizer</span>
        </div>
      </div>
    </a>
  </nav>
</template>
<style>
.box {
  display: flex;
}

.box .inner {
  width: 65px;
  height: 50px;
  line-height: 50px;
  font-size: 1em;
  font-family: sans-serif;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
}

.box .inner:first-child {
  background-color: #4d2fe58a;
  color: #09051b;
  transform-origin: right;
  transform: perspective(100px) rotateY(-15deg);
}

.box .inner:last-child {
  background-color: rgba(50, 180, 220, 0.564);
  color: antiquewhite;
  transform-origin: left;
  transform: perspective(100px) rotateY(15deg);
}

.box .inner span {
  position: absolute;
  animation: marquee 5s linear infinite;
}

.box .inner:first-child span {
  animation-delay: 2.5s;
  left: -100%;
}

@keyframes marquee {
  from {
    left: 100%;
  }

  to {
    left: -100%;
  }
}
</style>
