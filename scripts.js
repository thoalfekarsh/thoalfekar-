document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('#say-hello') || document.querySelector('button');
  if (!btn) return;
  btn.addEventListener('click', () => {
    alert('Hello from JS!');
    console.log('Say Hello clicked');
  });
});
