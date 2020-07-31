<script>
  import { path } from 'routve'

  export let href
  export let label
</script>

<li class={$path == href ? "active" : ''}>
  <a href={href}>{label}</a>
</li>

<style type="text/css">
  li.active a {
    color: #909;
  }
</style>
