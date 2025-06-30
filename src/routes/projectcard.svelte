<script>
  export let href;
  export let title;
  export let tagline;
  export let src;

  src = `imgs/${src}/${src}.png`;
</script>

<a {href}>
  <article class="hidden">
    <img class="imgcard" {src} alt={title} />
    <h1>{title}</h1>
    <p>{tagline}</p>
  </article>
</a>
